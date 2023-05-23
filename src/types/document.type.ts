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
	IsPublic: boolean;
}
export interface DocumentState {
	document?: GetDocumentByIdResponse | null;
	documentContent?: any | null;
	documentExercise?: GetExerciseResponse | null;
	sampleSourceCode?: GetSampleSourceCodeResponse | null;
	loading: boolean;
}
// API interface

//#region document
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
export interface UpdateDocumentRequest {
	title: string;
	description: string;
}
export interface GetDocumentByIdResponse {
	Id: string;
	Title: string;
	DocumentDescription: string;
	CreatorId: string;
	HasExercise: boolean;
	Contents: Array<DocumentContent>;
}
//#endregion document

//#region document content

export interface CreateDocumentContentRequest {
	documentId: string;
	contentTypeId: string;
	content: any;
}

//#endregion document content

//#region exercise

export interface CreateExerciseRequest {
	runtimeLimit: number;
	memoryLimit: number;
	scoreWeight: number;
	manualPercentage: number;
	judgerId: string;
}

export interface GetExerciseResponse {
	Id: string;
	RuntimeLimit: number;
	MemoryLimit: number;
	ScoreWeight: number;
	TimeCreated: string;
	HaveDeadline: boolean;
	Deadline: string;
	StrictDeadline: boolean;
	ManualPercentage: number;
}
export interface UpdateExerciseRequest {
	runtimeLimit: number,
	memoryLimit: number,
	scoreWeight: number,
	manualPercentage: number,
	haveDeadline: boolean,
	deadline: string,
	strictDeadline: boolean,
	judgerId: string
}
export interface GetSampleSourceCodeResponse {
	programmingLanguageId: string,
	sourceCode: string
}
export interface UpdateSampleSourceCodeRequest {
	sampleSourceCode: string,
	type: number
}
export interface UpdateSampleSourceCodeResponse {
	documentId: string,
	programmingLanguageId: string,
	validatedSourceCode: string
}
//#endregion exercise

//#region test cases

export interface GetAllTestCasesResponse {

	List: Array<GetSingleTestCaseResponse>
}
export interface CreateTestCaseRequest {
	input: string;
	output: string;
	scoreWeight: number;
	visibility: boolean;
}
export interface CreateTestCaseResponse {
	id: string,
	order: number,
	input: string,
	output: string,
	scoreWeight: number,
	visibility: boolean
}

export interface GetSingleTestCaseResponse {
	TestOrder: number,
	Id: number,
	input: string,
	output: string,
	scoreWeight: number,
	visibility: boolean
}
export interface UpdateTestCaseRequest {
	input: string,
	output: string,
	scoreWeight: number,
	visibility: boolean
}
export interface SwapTestCaseOrderRequest {
	TestOrder1: number,
	TestOrder2: number
}
//#endregion 