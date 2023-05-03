import { put, call, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import documentApi from '@/api/documentApi';
import { AxiosResponse } from 'axios';
import { GetDocumentByIdResponse } from '@/types/document.type';
import { fetchDocumentById, fetchDocumentByIdError, fetchDocumentByIdSuccess } from '@/slices/document.slice';
import { setSnackbar } from '@/slices/snackbar.slice';
import notificationMessage from '@/utils/notificationMessage';

function* fetchDocumentByIdSaga(action: PayloadAction<{ id: string }>) {
	try {
		console.log('saga fetching document by id');
		const document: AxiosResponse<GetDocumentByIdResponse> = yield call(
			documentApi.getDocumentById,
			action.payload.id
		);
		yield put(fetchDocumentByIdSuccess(document.data));
	} catch (error: any) {
		yield put(fetchDocumentByIdError());
		yield put(setSnackbar(notificationMessage.ERROR('Invalid document id or document does not exist.')));
		console.log('saga fetch course by id failed');
	}
}

export function* watchDocument() {
	yield takeLatest(fetchDocumentById.type, fetchDocumentByIdSaga);
}
