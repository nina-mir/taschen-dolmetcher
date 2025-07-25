// to be used in Question & QuestionsContainer components 

export interface MediaItem {
    imgUrl: string;
    sourceUrl: string;
    imgCaption: string;
    photog?: string;
    altText?: string;
    credit?: string;
    originalArchive?: string;
}