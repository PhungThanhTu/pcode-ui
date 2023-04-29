// State and Variable interface
export interface DocumentContent {
	Id: string;
	ContentTypeId: number;
	DocumentId: string;
	ContentBody: string;
}

// API interface
export interface CreateDocumentRequest {
	courseId: string;
	title: string;
	description: string;
	hasExercise: boolean;
}
export interface CreateDocumentResponse {
	Id: string; // creatorId
	CourseId: string;
	Title: string;
	Description: string;
	HasExercise: boolean;
}
export interface CreateDocumentContentRequest {
	contentTypeId: string;
	file: Blob;
}
export interface GetDocumentByIdResponse {
	Id: string;
	Title: string;
	DocumentDescription: string;
	CreatorId: string;
	HasExercise: boolean;
	Contents: Array<DocumentContent>;
}
export interface UpdateDocumentRequest {
	title: string;
	description: string;
}
