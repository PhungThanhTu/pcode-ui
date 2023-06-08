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
export interface Submission {
	Id: string;
	ExerciseId: string;
	ProgrammingLanguageId: number;
	SourceCode: string;
	AutomatedScore: number;
	Pending: boolean;
	Choice: boolean;
	TimeCreated: string;
}
export interface SubmissionManage {
	UserId: string,
	FullName: string,
	UserName: string,
	Avatar: string,
	SubmissionId: string,
	AutomatecScore: number,
	ManualScore: number,
	ProgrammingLanguageId: number,
	SourceCode: string,
	Pending: boolean,
	Score: number,
	TimeCreated: string
}
export interface TestResult {
	SubmissionId: string;
	TestId: number;
	Time: number;
	Memory: number;
	ExitCode: number;
	Deadline: string;
	Input: string;
	Output: string;
	ExpectedOutput: string;
	RunStatus: number;
}

export interface DocumentState {
	document?: GetDocumentByIdResponse | null;
	documentContent?: any | null;
	documentExercise?: GetExerciseResponse | null;
	sampleSourceCode?: GetSampleSourceCodeResponse | null;
	documentTestCases?: Array<GetSingleTestCaseResponse> | null;
	documentSubmissions?: Array<Submission> | null;
	documentSubmissionsManage?: Array<SubmissionManage> | null;
	documentSingleSubmission?: GetSingleSubmissionResponse | null;
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
	contentTypeId: number;
	content: any;
}
export interface CreateDocumentContentResponse {
	contentId: string;
	contentTypeId: number;
	documentId: string;
	contentBody: string;
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
	runtimeLimit: number;
	memoryLimit: number;
	scoreWeight: number;
	manualPercentage: number;
	haveDeadline: boolean;
	deadline: string;
	strictDeadline: boolean;
	judgerId: string;
}
export interface GetSampleSourceCodeResponse {
	programmingLanguageId: string;
	sourceCode: string;
}
export interface UpdateSampleSourceCodeRequest {
	sampleSourceCode: string;
	type: number;
}
export interface UpdateSampleSourceCodeResponse {
	documentId: string;
	programmingLanguageId: string;
	validatedSourceCode: string;
}
//#endregion exercise

//#region test cases

export interface CreateTestCaseRequest {
	input: string;
	output: string;
	scoreWeight: number;
	visibility: boolean;
}
export interface CreateTestCaseResponse {
	id: number;
	order: number;
	input: string;
	output: string;
	scoreWeight: number;
	visibility: boolean;
}

export interface GetSingleTestCaseResponse {
	TestOrder: number;
	Id: number;
	input: string;
	output: string;
	scoreWeight: number;
	visibility: boolean;
}
export interface UpdateTestCaseRequest {
	input: string;
	output: string;
	scoreWeight: number;
	visibility: boolean;
}
export interface SwapTestCaseOrderRequest {
	TestOrder1: number;
	TestOrder2: number;
}
//#endregion

//#region document submission

export interface CreateSubmissionRequest {
	programmingLanguageId: number;
	sourceCode: string;
}

export interface CreateSubmissionResponse {
	id: string;
	programmingLanguageId: number;
	sourceCode: string;
}

export interface GetSingleSubmissionResponse {
	Id: string;
	ExerciseId: string;
	ProgrammingLanguageId: number;
	SourceCode: string;
	AutomatedScore: number;
	Pending: boolean;
	Choice: boolean;
	TimeCreated: string;
	ManualScore: number;
	Score: number;
	testResults: Array<TestResult>;
}
export interface ScoreSubmissionRequest {
	score: number;
	Ids: SubmissionActionRequest;
}
export interface ScoreSubmissionResponse {
	score: number;
	submissionId: string;
}

export interface SubmissionActionRequest {
	documentId: string;
	submissionId: string;
}

//endregion
