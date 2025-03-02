import {gql} from "@apollo/client";

export const CREATE_NOTE = gql`
    mutation CreateNote($content: String!, $images: [Upload]) {
        createNote(input: {
            content: $content,
            images: $images
        }) {
            id
            content
        }
    }
`
