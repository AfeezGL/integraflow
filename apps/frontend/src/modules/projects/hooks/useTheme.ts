import {
    ProjectTheme,
    ThemesQuery,
    useProjectThemeCreateMutation,
    useProjectThemeUpdateMutation,
    useThemesQuery,
} from "@/generated/graphql";
import { useSurvey } from "@/modules/surveys/hooks/useSurvey";
import useUserState from "@/modules/users/hooks/useUserState";
import useWorkspace from "@/modules/workspace/hooks/useWorkspace";
import { PROJECT_THEME } from "../graphql/fragments/projectFragments";

export type ColorScheme = {
    answer: string;
    button: string;
    progress: string;
    question: string;
    background: string;
};

export const useThemes = () => {
    const { user } = useUserState();
    const { workspace } = useWorkspace();
    const [createThemeMutation] = useProjectThemeCreateMutation();
    const [updateThemeMutation] = useProjectThemeUpdateMutation();
    const { updateSurvey } = useSurvey();

    const {
        data: themes,
        loading,
        error,
    } = useThemesQuery({
        variables: { first: 20 },
        notifyOnNetworkStatusChange: true,
        context: {
            headers: {
                Project: workspace?.project.id,
            },
        },
    });

    const transformThemes = (themes: ThemesQuery) => {
        const data = { ...(themes?.themes ?? {}) };

        return data?.edges?.map(({ node }) => {
            let colorScheme = {};
            if (node.colorScheme) {
                try {
                    colorScheme = JSON.parse(node.colorScheme) as ColorScheme;
                } catch (error) {
                    colorScheme = {};
                }
            }

            node.colorScheme = colorScheme;

            return node;
        });
    };

    const createTheme = async (theme: Partial<ProjectTheme>) => {
        await createThemeMutation({
            variables: {
                input: {
                    name: theme.name ?? "",
                    colorScheme: JSON.stringify(theme.colorScheme ?? {}),
                },
            },
            notifyOnNetworkStatusChange: true,
            context: {
                headers: {
                    Project: workspace?.project.id,
                },
            },
            onCompleted: (data) => {
                const themeData = {
                    name: data.projectThemeCreate?.projectTheme?.name ?? "",
                    colorScheme:
                        data.projectThemeCreate?.projectTheme?.colorScheme ??
                        "",
                };

                data.projectThemeCreate?.projectTheme?.id;
                updateSurvey(
                    { themeId: data.projectThemeCreate?.projectTheme?.id },
                    themeData,
                );
            },
            optimisticResponse: {
                __typename: "Mutation",
                projectThemeCreate: {
                    __typename: "ProjectThemeCreate",
                    projectTheme: {
                        __typename: "ProjectTheme",
                        id: "temp-id",
                        name: theme.name ?? "",
                        colorScheme: JSON.stringify(theme.colorScheme ?? {}),
                    },
                },
            },
            // caching the mutation based on the available themes
            update: (cache, { data }) => {
                if (!data?.projectThemeCreate?.projectTheme) return;

                cache.modify({
                    fields: {
                        themes(existingThemeRefs) {
                            const newThemeRef = cache.writeFragment({
                                data: data?.projectThemeCreate?.projectTheme,
                                fragment: PROJECT_THEME,
                            });
                            return {
                                ...existingThemeRefs,
                                edges: [
                                    ...existingThemeRefs.edges,
                                    {
                                        __typename: "ProjectTheme",
                                        node: newThemeRef,
                                    },
                                ],
                            };
                        },
                    },
                });
            },
        });

        if (error)
            return {
                error,
            };
    };

    const updateTheme = async (theme: Partial<ProjectTheme>) => {
        if (!theme.id) return;

        await updateThemeMutation({
            variables: {
                id: theme.id,
                input: {
                    name: theme.name ?? "",
                    colorScheme: JSON.stringify(theme.colorScheme ?? {}),
                },
            },
            notifyOnNetworkStatusChange: true,
            context: {
                headers: {
                    Project: workspace?.project.id,
                },
            },
            optimisticResponse: {
                __typename: "Mutation",
                projectThemeUpdate: {
                    __typename: "ProjectThemeUpdate",
                    projectTheme: {
                        __typename: "ProjectTheme",
                        id: theme.id,
                        name: theme.name ?? "",
                        colorScheme: JSON.stringify(theme.colorScheme ?? {}),
                        settings: [],
                        project: {
                            id: workspace?.project.id ?? "",
                            name: workspace?.project.name ?? "",
                            slug: workspace?.project.slug ?? "",
                            hasCompletedOnboardingFor: [],
                            timezone: workspace?.project.timezone ?? "",
                            organization: {
                                id: workspace?.project.organization.id ?? "",
                                slug:
                                    workspace?.project.organization.slug ?? "",
                                name:
                                    workspace?.project.organization.name ?? "",
                                memberCount:
                                    workspace?.project.organization
                                        .memberCount ?? 0,
                            },
                        },
                        createdAt:
                            workspace?.project.createdAt ??
                            new Date().toISOString(),
                        creator: workspace?.project.creator ?? user,
                        updatedAt: new Date().toISOString(),
                    },
                    projectErrors: [],
                },
            },
        });
    };

    return {
        error,
        loading,
        createTheme,
        updateTheme,
        themes: transformThemes(JSON.parse(JSON.stringify(themes ?? {}))),
    };
};