export enum ROUTES {
    LOGIN = "",
    MAGIC_SIGN_IN = "/auth/magic-sign-in/",
    SIGNUP = "signup",
    ACCEPT_EMAIL_WORKSPACE_INVITE = "/invite/:inviteId/accept/",
    ACCEPT_LINK_WORKSPACE_INVITE = "/:workspaceName/join/:inviteLink",
    CREATE_WORKSPACE = "/create-workspace",
    HOME = "/:orgSlug/projects/:projectSlug",
    AUDIENCE = "/:orgSlug/projects/:projectSlug/audience",
    EVENTS = "/:orgSlug/projects/:projectSlug/events",
    SURVEY_LIST = "/:orgSlug/projects/:projectSlug/surveys",
    SURVEY_TEMPLATES = "/:orgSlug/projects/:projectSlug/surveys/templates",
    STUDIO = "/:orgSlug/projects/:projectSlug/survey/:surveySlug",
    GET_STARTED = "/:orgSlug/projects/:projectSlug/get-started",
    WORKSPACE_SETTINGS = "/:orgSlug/projects/:projectSlug/settings",
    WORKSPACE_SETTINGS_PROFILE = "/:orgSlug/projects/:projectSlug/settings/profile",
    WORKSPACE_SETTINGS_PROJECT = "/:orgSlug/projects/:projectSlug/settings/project",
}
