import {
	CreateDocumentContentRequest,
	CreateDocumentRequest,
	DocumentState,
	GetDocumentByIdResponse
} from '@/types/document.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialDocumentState: DocumentState = {
	document: undefined,
	documentContent: undefined,
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
		fetchDocumentByIdError: (state) => {
			state.document = null;
			state.loading = false;
		},
		createDocument: (state, { payload }: PayloadAction<CreateDocumentRequest>) => {},
		createDocumentContent: (state, { payload }: PayloadAction<CreateDocumentContentRequest>) => {},
		resetDocumentContent: (state, { payload }: PayloadAction<{ id: string }>) => {}
	}
});

export const {
	fetchDocumentById,
	fetchDocumentByIdError,
	fetchDocumentByIdSuccess,
	createDocument,
	fetchDocumentByIdWithContentSuccess,
	createDocumentContent,
	resetDocumentContent
} = documentSlice.actions;
export default documentSlice.reducer;
