export enum ROUTES {
    LOGIN = "",
    MAGIC_SIGN_IN = "/auth/magic-sign-in/",
    SIGNUP = "signup",
    CREATE_WORKSPACE = "/create-workspace",
    SURVEY_LIST = "/:orgSlug/projects/:projectSlug/surveys",
    SURVEY_TEMPLATES = "/:orgSlug/projects/:projectSlug/surveys/templates",
    STUDIO = "/:orgSlug/projects/:projectSlug/survey/:surveySlug",
    GET_STARTED = "/:orgSlug/projects/:projectSlug/get-started",
    WORKSPACE_SETTINGS = "/:orgSlug/projects/:projectSlug/settings",
    WORKSPACE_SETTINGS_PROFILE = "/:orgSlug/projects/:projectSlug/settings/profile",
}
