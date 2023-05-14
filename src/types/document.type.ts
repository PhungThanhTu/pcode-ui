// State and Variable interface
export interface DocumentContent {
	Id: string;
	ContentTypeId: number;
	DocumentId: string;
	ContentBody: string;
}

export interface Document {
	Id: string;
	Title: string;
	DocumentDescription: string;
	HasExercise: boolean;
}
export interface DocumentState {
	document?: GetDocumentByIdResponse | null;
	documentContent?: any | null;
	loading: boolean;
}
// API interface
export interface CreateDocumentRequest {
	courseId: string;
	title: string;
	description: string;
	hasExercise: boolean;
}
export interface CreateDocumentResponse {
	Id: string;
	CourseId: string;
	Title: string;
	Description: string;
	HasExercise: boolean;
}
export interface CreateDocumentContentRequest {
	documentId: string;
	contentTypeId: string;
	content: any;
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
export interface CreateExerciseRequest {
	runtimeLimit: number;
	memoryLimit: number;
	scoreWeight: number;
	manualPercentage: number;
}
export interface CreateTestCaseRequest {
	input: string;	
	output: string,
	scoreWeight: number,
	visibility: boolean
}