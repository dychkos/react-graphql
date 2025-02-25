import * as React from "react";
import {useState} from "react";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {NoteType} from "@/types/note.ts";

interface NoteFormProps {
    onSubmit: (note: NoteType) => void;
}


const NoteForm: React.FC<NoteFormProps> = ({ onSubmit}) => {

    const [content, setContent] = useState("")
    const [photo, setPhoto] = useState<string | null>(null)


    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPhoto(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (content) {
            const newNote: NoteType = {
                id: Date.now(),
                content,
                photo: photo || undefined,
            }
            setContent("")
            setPhoto(null)

            onSubmit(newNote)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
            <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter note content"
                />
            </div>
            <div>
                <Label htmlFor="photo">Photo</Label>
                <Input id="photo" type="file" accept="image/*" onChange={handlePhotoUpload}/>
            </div>
            {photo && (
                <div>
                    <img src={photo || "/placeholder.svg"} alt="Uploaded" className="mt-2 max-w-full h-auto"/>
                </div>
            )}
            <Button type="submit">Add Note</Button>
        </form>

    )
}

export default NoteForm