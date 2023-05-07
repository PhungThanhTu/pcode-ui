import { put, call, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import documentApi from '@/api/documentApi';
import { AxiosResponse } from 'axios';
import {
	CreateDocumentContentRequest,
	CreateDocumentRequest,
	CreateDocumentResponse,
	GetDocumentByIdResponse
} from '@/types/document.type';
import {
	createDocument,
	createDocumentContent,
	fetchDocumentById,
	fetchDocumentByIdError,
	fetchDocumentByIdSuccess,
	fetchDocumentByIdWithContentSuccess
} from '@/slices/document.slice';
import { setSnackbar } from '@/slices/snackbar.slice';
import notificationMessage from '@/utils/notificationMessage';
import { setLoading } from '@/slices/loading.slice';
import { fetchCourseById } from '@/slices/course.slice';

function* fetchDocumentByIdSaga(action: PayloadAction<{ id: string }>) {
	try {
		console.log('saga fetching document by id');
		const document: AxiosResponse<GetDocumentByIdResponse> = yield call(
			documentApi.getDocumentById,
			action.payload.id
		);
		if (document.data.Contents.length > 0) {
			const file: AxiosResponse<any> = yield call(documentApi.getMedia, document.data.Contents[0].ContentBody);
			let temp = new Blob([file.data], { type: 'application/pdf' });
			yield put(fetchDocumentByIdWithContentSuccess({ document: document.data, documentContent: temp }));
		} else {
			yield put(fetchDocumentByIdSuccess(document.data));
		}
	} catch (error: any) {
		yield put(fetchDocumentByIdError());
		yield put(setSnackbar(notificationMessage.ERROR('Invalid document id or document does not exist.')));
		console.log('saga fetch course by id failed');
	}
}
function* createDocumentSaga(action: PayloadAction<CreateDocumentRequest>) {
	try {
		console.log('saga create document');
		yield put(setLoading({ isLoading: true }));

		const data: AxiosResponse<CreateDocumentResponse> = yield call(documentApi.createDocument, action.payload);

		if (data) {
			yield put(setLoading({ isLoading: false }));
			yield put(setSnackbar(notificationMessage.CREATE_SUCCESS('document')));
		}
		yield put(fetchCourseById({ id: action.payload.courseId }));
	} catch (error: any) {
		console.log('saga create course failed');
		yield put(setLoading({ isLoading: false }));
		yield put(setSnackbar(notificationMessage.CREATE_FAIL('document', '')));
	}
}
function* createDocumentContentSaga(action: PayloadAction<CreateDocumentContentRequest>) {
	try {
		console.log('saga create/update document content');
		yield put(setLoading({ isLoading: true }));
		const data: AxiosResponse<any> = yield call(documentApi.createDocumentContent, action.payload);

		if (data) {
			yield put(setLoading({ isLoading: false }));
			yield put(setSnackbar(notificationMessage.UPDATE_SUCCESS('document content', '')));
		}
		yield put(fetchDocumentById({ id: action.payload.documentId }));
	} catch (error: any) {
		console.log('saga create/update document content failed');
		yield put(setLoading({ isLoading: false }));
		yield put(setSnackbar(notificationMessage.UPDATE_FAIL('document content', '')));
	}
}

export function* watchDocument() {
	yield takeLatest(fetchDocumentById.type, fetchDocumentByIdSaga);
	yield takeLatest(createDocument.type, createDocumentSaga);
	yield takeLatest(createDocumentContent.type, createDocumentContentSaga);
}
