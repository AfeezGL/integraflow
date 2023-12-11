import {
    SurveyQuestionTypeEnum,
    useSurveyCreateMutation,
    useSurveyQuestionCreateMutation,
} from "@/generated/graphql";
import { ROUTES } from "@/routes";
import { generateRandomString } from "@/utils";
import { createSelectors } from "@/utils/selectors";
import { useNavigate, useParams } from "react-router-dom";
import { useScrollToBottom } from "react-scroll-to-bottom";
import { useSurveyStore } from "../states/survey";

export const useSurvey = () => {
    const { orgSlug, projectSlug } = useParams();
    const scrollToBottom = useScrollToBottom();
    const navigate = useNavigate();

    const [createSurveyMutation] = useSurveyCreateMutation();
    const [createQuestionMutaton] = useSurveyQuestionCreateMutation();
    const { addQuestion, setOpenQuestion, addSurveyDetails } = useSurveyStore();
    
    const surveyStore = createSelectors(useSurveyStore);
    const id = surveyStore.use.id();
    const questions = surveyStore.use.questions();

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
            onCompleted: ({ surveyCreate }) => {
                addSurveyDetails({
                    id: surveyCreate?.survey?.id as string,
                    slug: surveyCreate?.survey?.slug as string,
                });
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
    const createQuestion = async (type:SurveyQuestionTypeEnum) => {
        await createQuestionMutaton({
            variables: {
                input: {
                    orderNumber: questions.length + 1,
                    surveyId: id,
                    id: crypto.randomUUID(),
                    type: type,
                },
            },
            onCompleted: ({ surveyQuestionCreate }) => {
                const { surveyQuestion } = surveyQuestionCreate ?? {};
                setOpenQuestion(surveyQuestion?.id as string);
                addQuestion({
                    id: surveyQuestion?.id as string,
                    createdAt: surveyQuestion?.createdAt as string,
                    description: surveyQuestion?.description as string,
                    label: surveyQuestion?.label as string,
                    maxPath: surveyQuestionCreate?.surveyQuestion
                        ?.maxPath as number,
                    orderNumber: surveyQuestion?.orderNumber as number,
                    type: surveyQuestion?.type as SurveyQuestionTypeEnum,
                });

                scrollToBottom();
            },
        });
    };

    return {
        createSurvey,
        createQuestion,
    };
};
