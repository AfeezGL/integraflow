import { gql } from "@apollo/client";

export const USER = gql`
    fragment UserFragment on User {
        id
        email
        firstName
        lastName
        isStaff
        isActive
        isOnboarded
        organization {
            ...AuthOrganizationFragment
        }
        project {
            ...ProjectFragment
        }
        organizations(first: 50) {
            edges {
                node {
                    id
                    slug
                    name
                    memberCount
                    projects(first: 100) {
                        edges {
                            node {
                                ...ProjectFragment
                            }
                        }
                    }
                }
            }
        }
    }
`;
