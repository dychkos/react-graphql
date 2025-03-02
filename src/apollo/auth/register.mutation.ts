import {gql} from "@apollo/client";

export const REGISTER_MUTATION = gql`
    mutation Register($name: String!, $email: String!, $password: String!, $passwordConfirmation: String!) {
        register(input: {
            name: $name, email: $email, password: $password, password_confirmation: $passwordConfirmation
        }) {
            accessToken
            user {
                id
                email
                name
            }
        }
    }
`