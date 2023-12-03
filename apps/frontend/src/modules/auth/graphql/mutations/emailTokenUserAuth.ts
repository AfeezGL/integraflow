import { gql } from "@apollo/client";

export const EMAIL_TOKEN_USER_AUTH = gql`
    mutation emailTokenUserAuth(
        $email: String!
        $token: String!
        $inviteLink: ID
    ) {
        emailTokenUserAuth(
            email: $email
            token: $token
            inviteLink: $inviteLink
        ) {
            ...EmailTokenUserAuthFragment
        }
    }
`;
