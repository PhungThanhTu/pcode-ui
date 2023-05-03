import { DocumentState, GetDocumentByIdResponse } from '@/types/document.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialDocumentState: DocumentState = {
	document: undefined,
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
		},
		fetchDocumentByIdError: (state) => {
			state.document = null;
			state.loading = false;
		}
	}
});

export const { fetchDocumentById, fetchDocumentByIdError, fetchDocumentByIdSuccess } = documentSlice.actions;
export default documentSlice.reducer;
