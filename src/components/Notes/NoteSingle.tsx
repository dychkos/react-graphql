import {ImageType, NoteType} from "@/types/note.ts";
import {Card, CardContent} from "@/components/ui/card"

interface NoteSingle {
    note: NoteType
}

const NoteSingle: React.FC<NoteSingle> = ({note}) => {
    return (
        <Card key={note.id}>
            <CardContent>
                <p>{note.content}</p>
                {note.images && (
                    note.images.map((image: ImageType) => (
                        <img src={image.path || "/placeholder.svg"} alt="Note" className="mt-2 max-w-full h-auto"/>
                    ))
                )}
            </CardContent>
        </Card>
    )
}

export default NoteSingle