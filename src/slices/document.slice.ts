import {
	CreateDocumentContentRequest,
	CreateDocumentRequest,
	CreateExerciseRequest,
	DocumentState,
	GetDocumentByIdResponse,
	getExerciseResponse,
	getSampleSourceCode
} from '@/types/document.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialDocumentState: DocumentState = {
	document: undefined,
	documentContent: undefined,
	documentExercise: undefined,
	sampleSourceCode: undefined,
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
		fetchDocumentByIdWithExerciseSuccess: (state, { payload }: PayloadAction<getExerciseResponse>) => {
			state.documentExercise = payload;
		},
		fetchDocumentByIdWithExerciseError: (state) => {
			state.documentExercise = undefined;
		},
		fetchDocumentByIdError: (state) => {
			state.document = null;
			state.loading = false;
		},
		fetchSampleSourceCode: (state, { payload }: PayloadAction<{ documentId: string, type: number }>) => {
			state.sampleSourceCode = null
		},
		fetchSampleSourceCodeSuccess: (state, { payload }: PayloadAction<getSampleSourceCode>) => {
			state.sampleSourceCode = payload;
		},
		fetchSampleSourceCodeError: (state) => {
			state.sampleSourceCode = undefined;
		},
		createDocument: (state, { payload }: PayloadAction<CreateDocumentRequest>) => { },
		createDocumentContent: (state, { payload }: PayloadAction<CreateDocumentContentRequest>) => { },
		createDocumentExercise: (
			state,
			{ payload }: PayloadAction<{ body: CreateExerciseRequest; documentId: string }>
		) => { },
		resetDocumentContent: (state, { payload }: PayloadAction<{ id: string }>) => { }
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
	fetchSampleSourceCodeError
} = documentSlice.actions;
export default documentSlice.reducer;
