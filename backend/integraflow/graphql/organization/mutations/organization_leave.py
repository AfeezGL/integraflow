import graphene

from integraflow.graphql.core import ResolveInfo
from integraflow.graphql.core.doc_category import DOC_CATEGORY_ORGANIZATIONS
from integraflow.graphql.core.types.common import OrganizationError
from integraflow.graphql.core.mutations import ModelDeleteMutation
from integraflow.organization import models
from integraflow.permission.auth_filters import AuthorizationFilters

from ..types import Organization


class OrganizationLeave(ModelDeleteMutation):
    class Arguments:
        id = graphene.ID(
            required=True,
            description="ID of the organization to leave."
        )

    class Meta:
        description = "Leaves an organization."
        model = models.Organization
        object_type = Organization
        error_type_class = OrganizationError
        error_type_field = "organization_errors"
        doc_category = DOC_CATEGORY_ORGANIZATIONS
        permissions = (AuthorizationFilters.ORGANIZATION_MEMBER_ACCESS,)

    @classmethod
    def get_type_for_model(cls):
        return Organization

    @classmethod
    def delete(
        cls,
        _info: ResolveInfo,
        instance: models.Organization
    ):
        if _info.context.user:
            _info.context.user.leave(organization=instance)
