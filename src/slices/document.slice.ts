import {
	CreateDocumentContentRequest,
	CreateDocumentRequest,
	CreateExerciseRequest,
	CreateTestCaseRequest,
	CreateTestCaseResponse,
	DocumentState,
	GetAllTestCasesResponse,
	GetDocumentByIdResponse,
	GetExerciseResponse,
	GetSampleSourceCodeResponse,
	GetSingleTestCaseResponse,
	UpdateExerciseRequest,
	UpdateSampleSourceCodeRequest,
	UpdateTestCaseRequest
} from '@/types/document.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';

export const initialDocumentState: DocumentState = {
	document: undefined,
	documentContent: undefined,
	documentExercise: undefined,
	sampleSourceCode: undefined,
	documentTestCases: undefined,
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
		fetchAllTestCasesSuccess: (state, { payload }: PayloadAction<GetAllTestCasesResponse>) => {
			state.documentTestCases = payload.TestCases ? payload.TestCases : [];
		},
		fetchAllTestCasesError: (state) => {
			state.documentExercise = undefined;
		},
		fetchSingleTestCase: (state, { payload }: PayloadAction<{ documentId: string; order: number }>) => {},
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

			// else if (state.documentTestCases === undefined) {
			// 	state.documentTestCases = new Array<GetSingleTestCaseResponse>;
			// 	let temp: GetSingleTestCaseResponse = {
			// 		...payload.testCase,
			// 		TestOrder: payload.testCase.order,
			// 		Id: payload.testCase.id
			// 	}
			// 	state.documentTestCases.push(temp)
			// }
		},
		updateTestCase: (
			state,
			{ payload }: PayloadAction<{ documentId: string; order: number; body: UpdateTestCaseRequest }>
		) => {},
		updateTestCaseSuccess: (state, { payload }: PayloadAction<{ order: number; body: UpdateTestCaseRequest }>) => {
			let index = state.documentTestCases?.findIndex((item) => item.TestOrder === payload.order);
			let item = state.documentTestCases?.filter((item) => item.TestOrder === payload.order)[0];

			if (index !== -1 && index !== null && index !== undefined && item) {
				let temp: GetSingleTestCaseResponse = {
					...item,
					...payload.body
				};

				state.documentTestCases ? (state.documentTestCases[index] = temp) : null;
			}
		},
		swapTestCase: (state, { payload }: PayloadAction<{ documentId: string; order1: number; order2: number }>) => {},
		deleteTestCase: (state, { payload }: PayloadAction<{ documentId: string; order: number }>) => {},
		deleteTestCaseSuccess: (state, { payload }: PayloadAction<{ order: number }>) => {
			let index = state.documentTestCases?.findIndex((item) => item.TestOrder === payload.order);

			if (index !== -1 && index !== null && index !== undefined) {
				state.documentTestCases ? state.documentTestCases.splice(index, 1) : null;
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
	swapTestCase
} = documentSlice.actions;
export default documentSlice.reducer;
