from typing import cast

from integraflow.graphql.core.context import get_database_connection_name
from integraflow.graphql.core.utils import from_global_id_or_error
from integraflow.project.models import Project
from integraflow.survey import models


def resolve_channels(info, id: str):
    project = cast(Project, info.context.user.project)

    _, survey_id = from_global_id_or_error(id)

    return models.SurveyChannel.objects.using(
        get_database_connection_name(info.context)
    ).filter(
        survey_id=survey_id,
        survey__project_id=project.id
    )


def resolve_questions(info, id: str):
    project = cast(Project, info.context.user.project)

    _, survey_id = from_global_id_or_error(id)

    return models.SurveyQuestion.objects.using(
        get_database_connection_name(info.context)
    ).filter(
        survey_id=survey_id,
        survey__project_id=project.id
    )


def resolve_surveys(info):
    project = cast(Project, info.context.user.project)

    return models.Survey.objects.using(
        get_database_connection_name(info.context)
    ).filter(project_id=project.pk)
