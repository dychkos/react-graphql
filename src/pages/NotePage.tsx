import NoteForm from "@/components/Notes/NoteForm.tsx";
import {useState} from "react";
import NoteSingle from "@/components/Notes/NoteSingle.tsx";
import {NoteType} from "@/types/note.ts";
import Layout from "@/components/Layout.tsx";
import {useMutation, useQuery} from "@apollo/client";
import {GET_NOTES} from "@/apollo/notes/notes.query.ts";
import {CREATE_NOTE} from "@/apollo/notes/note.mutation.ts";


const NotePage = () => {
    const [notes, setNotes] = useState<Array<NoteType>>([]);
    const {data, loading, error} = useQuery(GET_NOTES)

    const [createNote, { data: created, loading: createLoading, error: createError }] = useMutation(CREATE_NOTE)


    const handleSubmit = async (newNote: NoteType) => {
        await createNote({
            variables: {
                content: newNote.content,
                images: newNote.photos
            }
        })
    }


    if (loading || createLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>
    if (createError) return <p>Error: {createError.message}</p>

    console.log(data.notes)

    return (
        <Layout>
            <h1 className="text-2xl text-left mb-[24px] font-semibold">Note GraphQL</h1>
            <NoteForm onSubmit={handleSubmit} />

            <div className="flex flex-col gap-[12px]">
                {data?.notes?.data.length > 0 && (
                    data.notes.data?.map(note => <NoteSingle note={note} key={note.id} />)
                )}
            </div>

        </Layout>
    )
}

export default NotePage;