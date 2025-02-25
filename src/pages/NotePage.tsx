import NoteForm from "@/components/Notes/NoteForm.tsx";
import {useState} from "react";
import NoteSingle from "@/components/Notes/NoteSingle.tsx";
import {NoteType} from "@/types/note.ts";
import Layout from "@/components/Layout.tsx";
import {useQuery} from "@apollo/client";
import {GET_NOTES} from "@/apollo/queries/notes.query.ts";


const NotePage = () => {
    const [notes, setNotes] = useState<Array<NoteType>>([]);
    const {data, loading, error} = useQuery(GET_NOTES)


    const handleSubmit = () => {

    }


    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    console.log(data.notes)

    return (
        <Layout>
            <h1 className="text-2xl text-left mb-[24px] font-semibold">Note GraphQL</h1>
            <NoteForm onSubmit={handleSubmit} />


            {data?.notes?.data.length > 0 && (
                data.notes.data?.map(note => <NoteSingle note={note} key={note.id} />)
            )}
        </Layout>
    )
}

export default NotePage;