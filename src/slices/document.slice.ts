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
	UpdateTestCaseRequest,
	SubmissionManage,
	ScoreSubmissionRequest,
	ScoreSubmissionResponse,
	CreateDocumentContentResponse,
	DocumentContent
} from '@/types/document.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialDocumentState: DocumentState = {

	document: null,
	documentContent: null,
	documentExercise: null,
	sampleSourceCode: null,
	documentTestCases: null,
	documentSingleSubmission: null,
	documentSubmissions: null,
	documentSubmissionsManage: null,
	loading: false
};

const documentSlice = createSlice({
	name: 'document',
	initialState: initialDocumentState,
	reducers: {
		fetchDocumentById: (state, { payload }: PayloadAction<{ id: string }>) => {
			
			state.loading = true;
			state.document = undefined;
			state.documentContent = undefined;
			state.documentSingleSubmission = null;
			state.documentSubmissionsManage = null;
			state.documentExercise = null;
			state.documentSingleSubmission = null;
			state.documentTestCases = null;
			state.sampleSourceCode = null;

		},
		fetchDocumentByIdSuccess: (state, { payload }: PayloadAction<GetDocumentByIdResponse>) => {
			state.document = payload;
			state.loading = false;


		},
		fetchDocumentByIdWithContentSuccess: (
			state,
			{ payload }: PayloadAction<{ documentContent: any }>
		) => {
			state.documentContent = payload.documentContent;
			state.loading = false;
		},
		fetchDocumentByIdWithContentError: (state) => {
			state.documentContent = null;
			state.loading = false;
		},
		fetchExercise: (state, { payload }: PayloadAction<{ documentId: string }>) => {
			state.documentExercise = undefined;
		},
		fetchExerciseSuccess: (state, { payload }: PayloadAction<GetExerciseResponse>) => {
			state.documentExercise = payload;
		},
		fetchExerciseError: (state) => {
			state.documentExercise = null;
		},
		fetchDocumentByIdError: (state) => {
			state.document = null;
			state.loading = false;
		},
		fetchSampleSourceCode: (state, { payload }: PayloadAction<{ documentId: string; type: number }>) => {
			state.sampleSourceCode = undefined;
		},
		fetchSampleSourceCodeSuccess: (state, { payload }: PayloadAction<GetSampleSourceCodeResponse>) => {
			state.sampleSourceCode = payload ? payload : null;
		},
		fetchSampleSourceCodeError: (state) => {
			state.sampleSourceCode = null;
		},
		createDocument: (state, { payload }: PayloadAction<CreateDocumentRequest>) => { },
		createDocumentContent: (state, { payload }: PayloadAction<CreateDocumentContentRequest>) => { },
		createDocumentContentSuccess: (state, { payload }: PayloadAction<{ documentContent: CreateDocumentContentResponse, content: any }>) => {
			let documentContent: DocumentContent = {
				ContentBody: payload.documentContent.contentBody,
				ContentTypeId: payload.documentContent.contentTypeId,
				DocumentId: payload.documentContent.documentId,
				Id: payload.documentContent.contentId
			}

			state.document ? state.document.Contents[0] = documentContent : null;
			state.documentContent = payload.content

		},
		createDocumentExercise: (
			state,
			{ payload }: PayloadAction<{ body: CreateExerciseRequest; documentId: string }>
		) => { },
		resetDocumentContent: (state, { payload }: PayloadAction<{ documentId: string }>) => { },
		resetDocumentContentSuccess: (state) => {
			state.documentContent = null;
			state.document ? state.document.Contents = [] : null;
		},
		changePublishDocument: (state, { payload }: PayloadAction<{ documentId: string; status: number }>) => { },
		updateDocumentExercise: (
			state,
			{
				payload
			}: PayloadAction<{
				ExerciseBody: UpdateExerciseRequest;
				documentId: string;
				SourceBody: UpdateSampleSourceCodeRequest;
			}>
		) => { },
		fetchAllTestCases: (state, { payload }: PayloadAction<{ documentId: string }>) => {
			state.documentTestCases = undefined;
		},
		fetchAllTestCasesSuccess: (state, { payload }: PayloadAction<Array<GetSingleTestCaseResponse>>) => {
			state.documentTestCases = payload;
		},
		fetchAllTestCasesError: (state) => {
			state.documentExercise = null;
		},
		fetchSingleTestCase: (state, { payload }: PayloadAction<{ documentId: string; testCaseId: number }>) => { },
		fetchSingleTestCaseSuccess: (state, { payload }: PayloadAction<GetSingleTestCaseResponse>) => { },
		fetchSingleTestCaseError: (state) => { },
		createTestCase: (state, { payload }: PayloadAction<{ documentId: string; body: CreateTestCaseRequest }>) => { },
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
		) => { },
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
		swapTestCase: (state, { payload }: PayloadAction<{ documentId: string; order1: number; order2: number }>) => { },
		deleteTestCase: (state, { payload }: PayloadAction<{ documentId: string; testCaseId: number }>) => { },
		deleteTestCaseSuccess: (state, { payload }: PayloadAction<{ testCaseId: number }>) => {
			let index = state.documentTestCases?.findIndex((item) => item.Id === payload.testCaseId);

			if (index !== -1 && index !== null && index !== undefined) {
				state.documentTestCases ? state.documentTestCases.splice(index, 1) : null;
			}
		},
		createSubmission: (
			state,
			{ payload }: PayloadAction<{ documentId: string; body: CreateSubmissionRequest }>
		) => { },
		createSubmissionSuccess: (
			state,
			{ payload }: PayloadAction<{ documentId: string; body: CreateSubmissionRequest }>
		) => { },
		fetchAllSubmissions: (state, { payload }: PayloadAction<{ documentId: string }>) => {
			state.documentSubmissions = undefined;
		},
		fetchAllSubmissionsSuccess: (state, { payload }: PayloadAction<Array<Submission>>) => {
			state.documentSubmissions = payload;
			state.documentSubmissionsManage = null;
		},
		fetchAllSubmissionsError: (state) => {
			state.documentSubmissions = null;
		},
		fetchAllSubmissionsManage: (state, { payload }: PayloadAction<{ documentId: string }>) => {
			state.documentSubmissionsManage = undefined;
		},
		fetchAllSubmissionsManageSuccess: (state, { payload }: PayloadAction<Array<SubmissionManage>>) => {
			state.documentSubmissions = null;
			state.documentSubmissionsManage = payload;
		},
		fetchAllSubmissionsManageError: (state) => {
			state.documentSubmissionsManage = null;
		},
		fetchSingleSubmission: (state, { payload }: PayloadAction<{ submissionId: string }>) => {
			state.documentSingleSubmission = undefined;
		},
		fetchSingleSubmissionSuccess: (state, { payload }: PayloadAction<GetSingleSubmissionResponse>) => {
			state.documentSingleSubmission = payload;
		},
		fetchSingleSubmissionError: (state) => {
			state.documentSingleSubmission = null;
		},
		markSubmission: (state, { payload }: PayloadAction<SubmissionActionRequest>) => { },
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
		deleteSubmission: (state, { payload }: PayloadAction<SubmissionActionRequest>) => { },
		deleteSubmissionSuccess: (state, { payload }: PayloadAction<SubmissionActionRequest>) => {
			let index = state.documentSubmissions?.findIndex((item) => item.Id === payload.submissionId);

			if (index !== -1 && index !== null && index !== undefined) {
				state.documentSubmissions ? state.documentSubmissions.splice(index, 1) : null;
			}
		},
		scoreSubmissionManage: (state, { payload }: PayloadAction<ScoreSubmissionRequest>) => { },
		scoreSubmissionManageSuccess: (state, { payload }: PayloadAction<ScoreSubmissionResponse>) => {
			if (state.documentSubmissionsManage && state.documentSubmissionsManage.length > 0) {
				let index = state.documentSubmissionsManage.findIndex((item) => item.SubmissionId === payload.submissionId);

				if (index !== -1 && index !== null && index !== undefined) {
					state.documentSubmissionsManage[index].ManualScore = payload.score;
				}
			}
		}
	}
});

export const {
	fetchDocumentById,
	fetchDocumentByIdError,
	fetchDocumentByIdSuccess,
	fetchExerciseSuccess,
	fetchExerciseError,
	fetchExercise,
	createDocument,
	createDocumentContentSuccess,
	fetchDocumentByIdWithContentSuccess,
	fetchDocumentByIdWithContentError,
	createDocumentContent,
	resetDocumentContent,
	resetDocumentContentSuccess,
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
	createSubmissionSuccess,
	deleteSubmission,
	deleteSubmissionSuccess,
	fetchAllSubmissions,
	fetchAllSubmissionsSuccess,
	fetchAllSubmissionsError,
	fetchAllSubmissionsManage,
	fetchAllSubmissionsManageSuccess,
	fetchAllSubmissionsManageError,
	fetchSingleSubmission,
	fetchSingleSubmissionSuccess,
	fetchSingleSubmissionError,
	markSubmission,
	markSubmissionSuccess,
	scoreSubmissionManage,
	scoreSubmissionManageSuccess
} = documentSlice.actions;
export default documentSlice.reducer;
