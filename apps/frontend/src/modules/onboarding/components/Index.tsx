import { useUpdateOnboardingMutation } from "@/generated/graphql";
import useSessionState from "@/modules/users/hooks/useSessionState";
import useUserState from "@/modules/users/hooks/useUserState";
import { Session } from "@/modules/users/states/session";
import { GlobalSpinner, Header } from "@/ui";
import { CheckComplete, CheckPending } from "@/ui/icons";
import * as Tabs from "@radix-ui/react-tabs";
import { useMemo } from "react";
import { useOnboarding } from "../hooks/useOnboarding";
import ConnectIntegration from "./connect-integration/Index";
import CreateFirstSurvey from "./create-first-survey/Index";
import IntegrateSDK from "./integrate-sdk/Index";

export const tabContents = [
    { content: IntegrateSDK },
    { content: IntegrateSDK },
    { content: IntegrateSDK },
    { content: CreateFirstSurvey },
    { content: ConnectIntegration },
];

export default function OnboardingIndex() {
    const { session, updateSession } = useSessionState();
    const { updateProject } = useUserState();
    const { currentTab, switchTab, steps, updatingUser } = useOnboarding();
    const [updateOnboarding] = useUpdateOnboardingMutation();

    const completedKeys = useMemo(() => {
        if (!session?.project.hasCompletedOnboardingFor) {
            return [];
        }

        return JSON.parse(
            session?.project.hasCompletedOnboardingFor,
        ) as string[];
    }, [session?.project.hasCompletedOnboardingFor]);

    const markAsCompleted = async (index: number) => {
        const updatedKeys = [...completedKeys];
        if (updatedKeys.includes(steps[index].key)) {
            return;
        }
        updatedKeys.push(steps[index].key);
        updateOnboarding({
            variables: {
                input: {
                    hasCompletedOnboardingFor: JSON.stringify(updatedKeys),
                },
            },
            context: {
                headers: {
                    Project: session?.project.id,
                },
            },
            onCompleted: (data) => {
                if (data.projectUpdate?.project?.hasCompletedOnboardingFor) {
                    if (!session) return;

                    updateProject(
                        session?.project.organization.slug,
                        session?.project.slug,
                        {
                            hasCompletedOnboardingFor:
                                data.projectUpdate?.project
                                    ?.hasCompletedOnboardingFor,
                        },
                    );

                    updateSession({
                        ...session,
                        project: {
                            ...session?.project,
                            hasCompletedOnboardingFor:
                                data.projectUpdate?.project
                                    ?.hasCompletedOnboardingFor,
                        },
                    } as Session);
                }
            },
            optimisticResponse: (input) => {
                return {
                    __typename: "Mutation",
                    projectUpdate: {
                        project: {
                            id: session!.project.id,
                            hasCompletedOnboardingFor:
                                input.input.hasCompletedOnboardingFor,
                            __typename: "Project",
                        },
                        __typename: "ProjectUpdate",
                    },
                };
            },
        });
    };

    if (updatingUser) return <GlobalSpinner />;

    return (
        <section className="px-[72px] pt-20">
            <Header
                title="Getting started"
                description="Integraflow enables you to understand your customers  To get started, we'll need to integrate your SDK product."
                className="max-w-[386px]"
            />

            <Tabs.Root
                className="flex gap-12 pt-10"
                defaultValue={steps[0].name}
                value={currentTab}
                onValueChange={(value) => switchTab(value)}
            >
                <Tabs.List className="flex flex-col gap-2 pt-[25px]">
                    {steps.map((step) => (
                        <Tabs.Trigger
                            key={step.name}
                            value={step.name}
                            className="flex items-center gap-3 rounded-lg p-6 hover:bg-intg-bg-9 data-[state=active]:bg-intg-bg-9"
                        >
                            {completedKeys.includes(step.key) ? (
                                <CheckComplete />
                            ) : (
                                <CheckPending />
                            )}
                            <span className="min-w-max text-base text-intg-text">
                                {step.name}
                            </span>
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>

                {steps.map((step, index) => {
                    const Content = tabContents[index].content;
                    return (
                        <Tabs.Content key={step.name} value={step.name} asChild>
                            <div>
                                <Content
                                    onSkip={
                                        index < steps.length - 1
                                            ? () => {
                                                  console.log("skip");
                                                  console.log(steps[index + 1]);
                                                  markAsCompleted(index);
                                                  switchTab(
                                                      steps[index + 1].name,
                                                  );
                                              }
                                            : () => {
                                                  markAsCompleted(index);
                                              }
                                    }
                                    onComplete={() => {
                                        markAsCompleted(index);
                                        if (index < steps.length - 1) {
                                            switchTab(steps[index + 1].name);
                                        }
                                    }}
                                />
                            </div>
                        </Tabs.Content>
                    );
                })}
            </Tabs.Root>
        </section>
    );
}
