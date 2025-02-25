export interface NoteType {
    id: number
    content: string
    images?: ImageType[]
}

export interface ImageType {
    path: string
}