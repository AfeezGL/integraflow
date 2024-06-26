import { State } from "../../types";
import { getUserAttributes, parsedSurveys, uuidv4 } from "../../utils";
import { Context } from "../context";
import { Survey } from "./../../types/index";
import { Store, del as idbDel, get as idbGet, set as idbSet } from "./idb-keyval";

let store: Store;
if (typeof indexedDB !== "undefined") {
    store = new Store("integraflow", "default");
}

const getCacheKeys = (key: string) => ({
    STATE_CACHE_KEY: `${key}Cache`,
    STATE_CACHE_KEY_UPDATED: `${key}CacheUpdated`
});

const MAX_CACHE_AGE_MS = 1 * 60 * 60 * 1000;

export function get<T>(key: IDBValidKey): Promise<T> {
    if (!store) {
        return Promise.resolve({} as T);
    }

    return idbGet(key, store);
}

export async function set<T extends any>(key: IDBValidKey, value: T): Promise<T> {
    if (store) {
        await idbSet(key, value, store);
    }

    return value;
}

export function del(key: IDBValidKey): Promise<void> {
    if (!store) {
        return Promise.resolve();
    }

    return idbDel(key, store);
}

export async function getState(ctx: Context): Promise<State> {
    const cacheKeys = getCacheKeys("state");
    let state: State = (await get<State>(cacheKeys.STATE_CACHE_KEY)) ?? {};

    const lastLoadTime = (await get<number>(cacheKeys.STATE_CACHE_KEY_UPDATED)) ?? 0;
    let updatedRemoteState = false;

    if (Date.now() - lastLoadTime > MAX_CACHE_AGE_MS) {
        console.info("State never synced/stale, syncing now...");

        const installId = state.installId ?? uuidv4();
        try {
            let surveys: Survey[];

            if (ctx.syncPolicy === "polling") {
                const activeSurveys = await ctx.client.activeSurveys({
                    first: 100
                });
                surveys = parsedSurveys(activeSurveys);
            } else {
                surveys = ctx.surveys ?? [];
            }

            state = {
                surveys,
                installId,
                user: state.user ?? { id: installId, ...getUserAttributes() },
                seenSurveyIds: state.seenSurveyIds ?? new Set(),
                lastPresentationTimes: state.lastPresentationTimes ?? new Map(),
                surveyAnswers: state.surveyAnswers ?? {}
            };

            updatedRemoteState = true;
        } catch (e) {
            console.warn(e);
            // Noop (fallback to local)
        }
    }

    if (updatedRemoteState) {
        await set(cacheKeys.STATE_CACHE_KEY, state);
        await set(cacheKeys.STATE_CACHE_KEY_UPDATED, Date.now());
    }

    return state;
}

export async function persistState(ctx: Context, state: State): Promise<void> {
    const cacheKeys = getCacheKeys("state");
    await set(cacheKeys.STATE_CACHE_KEY, state);
    await set(cacheKeys.STATE_CACHE_KEY_UPDATED, Date.now());

    ctx.setState(state);
}

export async function resetState(ctx: Context, resetInstallId: boolean): Promise<void> {
    const state = await getState(ctx);

    state.user = undefined;
    state.seenSurveyIds = undefined;
    state.surveyAnswers = undefined;
    state.lastPresentationTimes = undefined;

    if (resetInstallId) {
        state.installId = undefined;
    }

    const cacheKeys = getCacheKeys("state");
    await set(cacheKeys.STATE_CACHE_KEY, state);
    await set(cacheKeys.STATE_CACHE_KEY_UPDATED, Date.now());
}
