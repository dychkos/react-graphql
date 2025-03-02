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


const NoteForm: React.FC<NoteFormProps> = ({ onSubmit }) => {
    const [content, setContent] = useState("")
    const [photos, setPhotos] = useState<Array<File>>([])
    const [photoPreviewUrls, setPhotoPreviewUrls] = useState<Array<string>>([])

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            // Convert FileList to Array
            const filesArray = Array.from(files)
            setPhotos(prev => [...prev, ...filesArray])

            // Create preview URLs for display
            filesArray.forEach(file => {
                const reader = new FileReader()
                reader.onloadend = () => {
                    setPhotoPreviewUrls(prev => [...prev, reader.result as string])
                }
                reader.readAsDataURL(file)
            })
        }
    }

    const removePhoto = (index: number) => {
        setPhotos(prev => prev.filter((_, i) => i !== index))
        setPhotoPreviewUrls(prev => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (content) {
            const newNote: NoteType = {
                id: Date.now(),
                content,
                photos: photos,
            }
            setContent("")
            setPhotos([])
            setPhotoPreviewUrls([])

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
                <Label htmlFor="photos">Photos</Label>
                <Input
                    id="photos"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    multiple
                />
            </div>
            {photoPreviewUrls.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                    {photoPreviewUrls.map((url, index) => (
                        <div key={index} className="relative">
                            <img src={url} alt={`Upload ${index + 1}`} className="w-full h-auto rounded" />
                            <button
                                type="button"
                                onClick={() => removePhoto(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <Button type="submit">Add Note</Button>
        </form>
    )
}

export default NoteForm