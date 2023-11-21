import graphene

from integraflow.core.exceptions import PermissionDenied
from integraflow.graphql.core import ResolveInfo
from integraflow.graphql.core.doc_category import DOC_CATEGORY_PROJECTS
from integraflow.graphql.core.fields import JSONString
from integraflow.graphql.core.mutations import ModelMutation
from integraflow.graphql.core.types.common import ProjectError
from integraflow.permission.auth_filters import AuthorizationFilters
from integraflow.project import models

from ..types import Project
from .project_create import ProjectInput


class ProjectUpdateInput(ProjectInput):
    name = graphene.String(description="The name of the project.")
    icon = graphene.String(description="The icon of the project.")
    has_completed_onboarding_for = JSONString(
        description="The data required for the onboarding process."
    )

    class Meta:
        doc_category = DOC_CATEGORY_PROJECTS


class ProjectUpdate(ModelMutation):
    """Mutation that updates a project."""

    class Arguments:
        input = ProjectUpdateInput(
            description=(
                "A partial object to update the project with."
            ),
            required=True
        )

    class Meta:
        description = "Updates a project."
        model = models.Project
        object_type = Project
        error_type_class = ProjectError
        error_type_field = "project_errors"
        doc_category = DOC_CATEGORY_PROJECTS

    @classmethod
    def get_type_for_model(cls):
        return Project

    @classmethod
    def perform_mutation(cls, _root, info: ResolveInfo, /, **data):
        permissions = info.context.user_permissions
        if permissions is None:
            raise PermissionDenied(permissions=permissions)

        project = permissions.current_project.project
        data["id"] = graphene.Node.to_global_id("Project", project.id)

        permissions = [AuthorizationFilters.ORGANIZATION_MEMBER_ACCESS]

        if project.access_control:
            permissions.append(AuthorizationFilters.ORGANIZATION_ADMIN_ACCESS)

        input = data["input"]
        if input.get("private") is True:
            permissions.append(AuthorizationFilters.ORGANIZATION_ADMIN_ACCESS)

        if not cls.check_permissions(info.context, permissions):
            raise PermissionDenied(permissions=permissions)

        return super().perform_mutation(_root, info, **data)
