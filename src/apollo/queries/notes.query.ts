import {gql} from "@apollo/client";

export const GET_NOTES = gql`
    query GetNotes {
        notes {
            data {
                id
                content
                user {
                    id
                    email
                },
                images {
                    path
                }
            }
        }
    }
`