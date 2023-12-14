import {
    ProjectTheme,
    SurveyQuestionTypeEnum,
    SurveyStatusEnum,
    SurveyTypeEnum,
    SurveyUpdateInput,
    useGetSurveyLazyQuery,
    useSurveyCreateMutation,
    useSurveyQuestionCreateMutation,
    useSurveyUpdateMutation,
} from "@/generated/graphql";
import useUserState from "@/modules/users/hooks/useUserState";
import { ROUTES } from "@/routes";
import { generateRandomString } from "@/utils";
import { createSelectors } from "@/utils/selectors";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useScrollToBottom } from "react-scroll-to-bottom";
import { SURVEY_QUESTION } from "../graphql/fragments/surveyFragment";
import { useSurveyStore } from "../states/survey";

export const useSurvey = () => {
    const { orgSlug, projectSlug, surveySlug } = useParams();
    const scrollToBottom = useScrollToBottom();
    const navigate = useNavigate();
    const { user } = useUserState();

    const surveyStore = createSelectors(useSurveyStore);
    const openQuestion = surveyStore.use.openQuestion();
    const setOpenQuestion = surveyStore.use.setOpenQuestion();

    const [createSurveyMutation] = useSurveyCreateMutation();
    const [createQuestionMutaton] = useSurveyQuestionCreateMutation({});
    const [getSurveyQuery, { data: survey }] = useGetSurveyLazyQuery();
    const [updateSurveyMutation] = useSurveyUpdateMutation({});

    const questions = survey?.survey?.questions?.edges || [];
    const surveyId = survey?.survey?.id;
    console.log(surveyId);

    useEffect(() => {
        const getSurvey = async () => {
            if (!surveySlug) return;
            await getSurveyQuery({
                variables: {
                    slug: surveySlug,
                },
                onCompleted: (data) => {
                    console.log("data:", data);
                },
            });
        };
        getSurvey();
    }, [surveySlug]);

    const createSurvey = async (_template?: string) => {
        const surveySlug = `survey-${generateRandomString(10)}`;
        navigate(
            ROUTES.STUDIO.replace(":orgSlug", orgSlug!)
                .replace(":projectSlug", projectSlug!)
                .replace(":surveySlug", surveySlug),
        );
        const surveyId = crypto.randomUUID();

        await createSurveyMutation({
            variables: {
                input: {
                    id: surveyId,
                    slug: surveySlug,
                },
            },
            onError: () => {
                navigate(
                    ROUTES.SURVEY_LIST.replace(":orgSlug", orgSlug!).replace(
                        ":projectSlug",
                        projectSlug!,
                    ),
                );
            },
        });
    };

    const createQuestion = async (type: SurveyQuestionTypeEnum) => {
        const id = crypto.randomUUID();
        if (!surveyId) return;

        await createQuestionMutaton({
            variables: {
                input: {
                    orderNumber: questions.length + 1,
                    surveyId: surveyId,
                    id,
                    type: type,
                },
            },
            optimisticResponse: {
                __typename: "Mutation",
                surveyQuestionCreate: {
                    __typename: "SurveyQuestionCreate",
                    surveyQuestion: {
                        __typename: "SurveyQuestion",
                        id: "temp-id",
                        createdAt: new Date().toISOString(),
                        description: "",
                        label: "",
                        maxPath: 0,
                        orderNumber: questions.length + 1,
                        reference: id,
                        type: type,
                        settings: null,
                        options: null,
                    },
                    surveyErrors: [],
                    errors: [],
                },
            },
            update: (cache, { data }) => {
                if (!data?.surveyQuestionCreate?.surveyQuestion) return;
                console.log(cache);
                cache.modify({
                    id: `Survey:${surveyId}`,
                    fields: {
                        questions(existingQuestions = []) {
                            const newQuestionRef = cache.writeFragment({
                                data: data.surveyQuestionCreate?.surveyQuestion,
                                fragment: SURVEY_QUESTION,
                            });

                            return {
                                __typename: "SurveyQuestionCountableConnection",
                                edges: [
                                    ...existingQuestions.edges,
                                    {
                                        __typename:
                                            "SurveyQuestionCountableEdge",
                                        node: newQuestionRef,
                                    },
                                ],
                            };
                        },
                    },
                });
            },
            onCompleted: ({ surveyQuestionCreate }) => {
                const { surveyQuestion } = surveyQuestionCreate ?? {};
                setOpenQuestion(surveyQuestion?.id as string);
                scrollToBottom();
            },
        });
    };

    const updateSurvey = async (
        input: SurveyUpdateInput,
        newTheme?: Partial<ProjectTheme>,
    ) => {
        if (!surveyId || !user || !survey) return;
        console.log("updateSurvey", newTheme);

        await updateSurveyMutation({
            variables: {
                id: surveyId,
                input: {
                    ...input,
                    themeId: input.themeId,
                },
            },
            optimisticResponse: {
                __typename: "Mutation",
                surveyUpdate: {
                    __typename: "SurveyUpdate",
                    survey: {
                        __typename: "Survey",
                        id: surveyId,
                        name: input.name ?? survey?.survey?.name,
                        reference: survey?.survey?.reference ?? "",
                        type:
                            input.type ??
                            survey?.survey?.type ??
                            SurveyTypeEnum.Survey,
                        status:
                            input.status ??
                            survey.survey?.status ??
                            SurveyStatusEnum.Draft,
                        slug: input.slug ?? surveySlug ?? "",
                        questions: survey?.survey?.questions ?? {
                            __typename: "SurveyQuestionCountableConnection",
                            edges: [],
                        },
                        channels: survey?.survey?.channels ?? {
                            __typename: "SurveyChannelCountableConnection",
                            edges: [],
                        },
                        createdAt:
                            survey?.survey?.createdAt ??
                            new Date().toISOString(),
                        updatedAt: new Date().toISOString(),

                        creator: survey?.survey?.creator ?? user,
                        theme: newTheme ?? survey?.survey?.theme ?? null,
                    },
                    surveyErrors: [],
                    errors: [],
                },
            },
        });
    };

    return {
        createSurvey,
        createQuestion,
        questions,
        surveySlug,
        setOpenQuestion,
        openQuestion,
        surveyId,
        survey,
        updateSurvey,
    };
};
