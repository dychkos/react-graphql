import {gql} from "@apollo/client";

export const CREATE_NOTE = gql`
    mutation CreateNote($content: String!) {
        createNote(input: {content: $content}) {
            id
            content
        }
    }
`
