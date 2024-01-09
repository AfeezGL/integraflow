import { create } from "zustand";

export type StudioState = {
    studioModeIsActive: boolean;
    editTheme: boolean;
};

export type StudioActions = {
    enableStudioMode: () => void;
    disableStudioMode: () => void;
};

const initialState: StudioState = {
    studioModeIsActive: false,
    editTheme: false,
};

export const useStudioStore = create<StudioState & StudioActions>()((set) => ({
    ...initialState,

    enableStudioMode: () =>
        set({
            studioModeIsActive: true,
        }),

    disableStudioMode: () => set({ studioModeIsActive: false }),
}));
