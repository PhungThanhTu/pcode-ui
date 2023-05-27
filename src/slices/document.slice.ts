import {
	CreateDocumentContentRequest,
	CreateDocumentRequest,
	CreateExerciseRequest,
	CreateSubmissionRequest,
	CreateSubmissionResponse,
	CreateTestCaseRequest,
	CreateTestCaseResponse,
	DocumentState,
	GetDocumentByIdResponse,
	GetExerciseResponse,
	GetSampleSourceCodeResponse,
	GetSingleSubmissionResponse,
	GetSingleTestCaseResponse,
	SubmissionActionRequest,
	Submission,
	UpdateExerciseRequest,
	UpdateSampleSourceCodeRequest,
	UpdateTestCaseRequest
} from '@/types/document.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialDocumentState: DocumentState = {
	document: undefined,
	documentContent: undefined,
	documentExercise: undefined,
	sampleSourceCode: undefined,
	documentTestCases: undefined,
	documentSingleSubmission: undefined,
	documentSubmissions: undefined,
	loading: false
};

const documentSlice = createSlice({
	name: 'document',
	initialState: initialDocumentState,
	reducers: {
		fetchDocumentById: (state, { payload }: PayloadAction<{ id: string }>) => {
			state.loading = true;
		},
		fetchDocumentByIdSuccess: (state, { payload }: PayloadAction<GetDocumentByIdResponse>) => {
			state.document = payload;
			state.loading = false;
			state.documentContent = null;
		},
		fetchDocumentByIdWithContentSuccess: (
			state,
			{ payload }: PayloadAction<{ document: GetDocumentByIdResponse; documentContent: any }>
		) => {
			state.document = payload.document;
			state.documentContent = payload.documentContent;
			state.loading = false;
		},
		fetchDocumentByIdWithExercise: (state, { payload }: PayloadAction<{ documentId: string }>) => {
			state.documentExercise = null;
		},
		fetchDocumentByIdWithExerciseSuccess: (state, { payload }: PayloadAction<GetExerciseResponse>) => {
			state.documentExercise = payload;
		},
		fetchDocumentByIdWithExerciseError: (state) => {
			state.documentExercise = undefined;
		},
		fetchDocumentByIdError: (state) => {
			state.document = null;
			state.loading = false;
		},
		fetchSampleSourceCode: (state, { payload }: PayloadAction<{ documentId: string; type: number }>) => {
			state.sampleSourceCode = null;
		},
		fetchSampleSourceCodeSuccess: (state, { payload }: PayloadAction<GetSampleSourceCodeResponse>) => {
			state.sampleSourceCode = payload ? payload : undefined;
		},
		fetchSampleSourceCodeError: (state) => {
			state.sampleSourceCode = undefined;
		},
		createDocument: (state, { payload }: PayloadAction<CreateDocumentRequest>) => {},
		createDocumentContent: (state, { payload }: PayloadAction<CreateDocumentContentRequest>) => {},
		createDocumentExercise: (
			state,
			{ payload }: PayloadAction<{ body: CreateExerciseRequest; documentId: string }>
		) => {},
		resetDocumentContent: (state, { payload }: PayloadAction<{ documentId: string }>) => {},
		changePublishDocument: (state, { payload }: PayloadAction<{ documentId: string; status: number }>) => {},
		updateDocumentExercise: (
			state,
			{
				payload
			}: PayloadAction<{
				ExerciseBody: UpdateExerciseRequest;
				documentId: string;
				SourceBody: UpdateSampleSourceCodeRequest;
			}>
		) => {},
		fetchAllTestCases: (state, { payload }: PayloadAction<{ documentId: string }>) => {
			state.documentTestCases = null;
		},
		fetchAllTestCasesSuccess: (state, { payload }: PayloadAction<Array<GetSingleTestCaseResponse>>) => {
			state.documentTestCases = payload;
		},
		fetchAllTestCasesError: (state) => {
			state.documentExercise = undefined;
		},
		fetchSingleTestCase: (state, { payload }: PayloadAction<{ documentId: string; testCaseId: number }>) => {},
		fetchSingleTestCaseSuccess: (state, { payload }: PayloadAction<GetSingleTestCaseResponse>) => {},
		fetchSingleTestCaseError: (state) => {},
		createTestCase: (state, { payload }: PayloadAction<{ documentId: string; body: CreateTestCaseRequest }>) => {},
		createTestCaseSuccess: (state, { payload }: PayloadAction<CreateTestCaseResponse>) => {
			let temp: GetSingleTestCaseResponse = {
				...payload,
				TestOrder: payload.order,
				Id: payload.id
			};
			state.documentTestCases?.push(temp);
		},
		updateTestCase: (
			state,
			{ payload }: PayloadAction<{ documentId: string; testCaseId: number; body: UpdateTestCaseRequest }>
		) => {},
		updateTestCaseSuccess: (
			state,
			{ payload }: PayloadAction<{ testCaseId: number; body: UpdateTestCaseRequest }>
		) => {
			let index = state.documentTestCases?.findIndex((item) => item.Id === payload.testCaseId);
			let item = state.documentTestCases?.filter((item) => item.Id === payload.testCaseId)[0];

			if (index !== -1 && index !== null && index !== undefined && item) {
				let temp: GetSingleTestCaseResponse = {
					...item,
					...payload.body
				};

				state.documentTestCases ? (state.documentTestCases[index] = temp) : null;
			}
		},
		swapTestCase: (state, { payload }: PayloadAction<{ documentId: string; order1: number; order2: number }>) => {},
		deleteTestCase: (state, { payload }: PayloadAction<{ documentId: string; testCaseId: number }>) => {},
		deleteTestCaseSuccess: (state, { payload }: PayloadAction<{ testCaseId: number }>) => {
			let index = state.documentTestCases?.findIndex((item) => item.Id === payload.testCaseId);

			if (index !== -1 && index !== null && index !== undefined) {
				state.documentTestCases ? state.documentTestCases.splice(index, 1) : null;
			}
		},
		createSubmission: (
			state,
			{ payload }: PayloadAction<{ documentId: string; body: CreateSubmissionRequest }>
		) => {},
		fetchAllSubmissions: (state, { payload }: PayloadAction<{ documentId: string }>) => {
			state.documentSubmissions = null;
		},
		fetchAllSubmissionsSuccess: (state, { payload }: PayloadAction<Array<Submission>>) => {
			state.documentSubmissions = payload;
		},
		fetchAllSubmissionsError: (state) => {
			state.documentSubmissions = undefined;
		},
		fetchSingleSubmission: (state, { payload }: PayloadAction<{ submissionId: string }>) => {
			state.documentSingleSubmission = null;
		},
		fetchSingleSubmissionSuccess: (state, { payload }: PayloadAction<GetSingleSubmissionResponse>) => {
			state.documentSingleSubmission = payload;
		},
		fetchSingleSubmissionError: (state) => {
			state.documentSingleSubmission = undefined;
		},
		markSubmission: (state, { payload }: PayloadAction<SubmissionActionRequest>) => {},
		markSubmissionSuccess: (state, { payload }: PayloadAction<SubmissionActionRequest>) => {
			if (state.documentSubmissions && state.documentSubmissions.length > 0) {
				let index = state.documentSubmissions.findIndex((item) => item.Id === payload.submissionId);

				if (index !== -1) {
					let temp = state.documentSubmissions.map((item) => {
						return {
							...item,
							Choice: item.Id === payload.submissionId
						};
					});
					state.documentSubmissions = temp;
				}
			}
		},
		deleteSubmission: (state, { payload }: PayloadAction<SubmissionActionRequest>) => {},
		deleteSubmissionSuccess: (state, { payload }: PayloadAction<SubmissionActionRequest>) => {
			let index = state.documentSubmissions?.findIndex((item) => item.Id === payload.submissionId);

			if (index !== -1 && index !== null && index !== undefined) {
				state.documentSubmissions ? state.documentSubmissions.splice(index, 1) : null;
			}
		}
	}
});

export const {
	fetchDocumentById,
	fetchDocumentByIdError,
	fetchDocumentByIdSuccess,
	fetchDocumentByIdWithExerciseSuccess,
	fetchDocumentByIdWithExerciseError,
	fetchDocumentByIdWithExercise,
	createDocument,
	fetchDocumentByIdWithContentSuccess,
	createDocumentContent,
	resetDocumentContent,
	createDocumentExercise,
	fetchSampleSourceCode,
	fetchSampleSourceCodeSuccess,
	fetchSampleSourceCodeError,
	changePublishDocument,
	updateDocumentExercise,
	fetchAllTestCases,
	fetchAllTestCasesError,
	fetchAllTestCasesSuccess,
	fetchSingleTestCase,
	fetchSingleTestCaseError,
	fetchSingleTestCaseSuccess,
	deleteTestCase,
	deleteTestCaseSuccess,
	createTestCase,
	createTestCaseSuccess,
	updateTestCase,
	updateTestCaseSuccess,
	swapTestCase,
	createSubmission,
	deleteSubmission,
	deleteSubmissionSuccess,
	fetchAllSubmissions,
	fetchAllSubmissionsSuccess,
	fetchAllSubmissionsError,
	fetchSingleSubmission,
	fetchSingleSubmissionSuccess,
	fetchSingleSubmissionError,
	markSubmission,
	markSubmissionSuccess
} = documentSlice.actions;
export default documentSlice.reducer;
