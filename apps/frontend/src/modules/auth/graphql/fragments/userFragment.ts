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
                    invites(first: 100) {
                        edges {
                            node {
                                id
                                email
                                role
                            }
                        }
                    }
                    members(first: 100) {
                        edges {
                            node {
                                id
                                email
                                firstName
                                lastName
                                role
                            }
                        }
                    }
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
