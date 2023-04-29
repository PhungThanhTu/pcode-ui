export interface CreateDocumentRequest {
    courseId: string,
    title: string,
    description: string,
    hasExercise: boolean
}
export interface CreateDocumentResponse {
    Id: string, // creatorId
    CourseId: string,
    Title: string,
    Description: string,
    HasExercise: boolean
}