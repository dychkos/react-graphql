export interface NoteType {
    id: number
    content: string
    images?: ImageType[],
    photo?: string|undefined
    photos?: File[];
}

export interface ImageType {
    path: string
}