import {
    LoginScreen,
    MagicSignIn,
    Onboarding,
    Signup,
    SurveyStudio,
    SurveyTemplates,
    Surveys,
    Workspace,
} from "@/pages";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { NotFound } from "./components/NotFound";
import "./index.css";
import { AppCore } from "./layout/AppCore";
import AppShell from "./layout/AppShell";
import { AuthLayout } from "./layout/AuthLayout";
import { SurveyShell } from "./layout/SurveyShell";
import { Workspace as WorkspaceSettings } from "./modules/workspace/components/settings/Workspace";
import { Audience } from "./pages/Audience";
import { EmailWorkspaceInvitation } from "./pages/EmailWorkspaceInvitation";
import { Events } from "./pages/Events";
import { LinkWorkspaceInvitation } from "./pages/LinkWorkspaceInvitation";
import { ProfileSettings } from "./pages/ProfileSettings";
import { ProjectSettings } from "./pages/ProjectSettings";
import { ROUTES } from "./routes";

const isDebugMode = import.meta.env.MODE === "development";

if (isDebugMode) {
    loadDevMessages();
    loadErrorMessages();
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppShell />,
        children: [
            {
                path: "",
                element: <AuthLayout />,
                children: [
                    {
                        path: ROUTES.LOGIN,
                        element: <LoginScreen />,
                    },
                    {
                        path: ROUTES.SIGNUP,
                        element: <Signup />,
                    },
                ],
            },
            {
                path: ROUTES.MAGIC_SIGN_IN,
                element: <MagicSignIn />,
            },
            {
                path: ROUTES.CREATE_WORKSPACE,
                element: <Workspace />,
            },
            {
                path: ROUTES.ACCEPT_LINK_WORKSPACE_INVITE,
                element: <LinkWorkspaceInvitation />,
            },
            {
                path: ROUTES.ACCEPT_EMAIL_WORKSPACE_INVITE,
                element: <EmailWorkspaceInvitation />,
            },
            {
                path: "/:orgSlug/projects/:projectSlug",
                element: <AppCore />,
                children: [
                    {
                        path: "settings/profile",
                        element: <ProfileSettings />,
                    },
                    {
                        path: "settings/project",
                        element: <ProjectSettings />,
                    },
                    {
                        path: "settings/workspace",
                        element: <WorkspaceSettings />,
                    },
                    {
                        path: "get-started",
                        element: <Onboarding />,
                    },
                    {
                        path: "audience",
                        element: <Audience />,
                    },
                    {
                        path: "events",
                        element: <Events />,
                    },
                    {
                        path: "",
                        element: <SurveyShell />,
                        children: [
                            {
                                path: "surveys",
                                element: <Surveys />,
                            },
                            {
                                path: "surveys/templates",
                                element: <SurveyTemplates />,
                            },
                            {
                                path: "survey/:surveySlug",
                                element: <SurveyStudio />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
