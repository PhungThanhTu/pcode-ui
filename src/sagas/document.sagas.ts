import { put, call, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import documentApi from '@/api/documentApi';
import axios, { AxiosError, AxiosResponse } from 'axios';
import {
	CreateDocumentContentRequest,
	CreateDocumentRequest,
	CreateDocumentResponse,
	CreateExerciseRequest,
	GetDocumentByIdResponse,
	GetExerciseResponse,
	GetSampleSourceCodeResponse,
	UpdateExerciseRequest,
	UpdateSampleSourceCodeRequest
} from '@/types/document.type';
import {
	changePublishDocument,
	createDocument,
	createDocumentContent,
	createDocumentExercise,
	fetchDocumentById,
	fetchDocumentByIdError,
	fetchDocumentByIdSuccess,
	fetchDocumentByIdWithContentSuccess,
	fetchDocumentByIdWithExercise,
	fetchDocumentByIdWithExerciseError,
	fetchDocumentByIdWithExerciseSuccess,
	fetchSampleSourceCode,
	fetchSampleSourceCodeError,
	fetchSampleSourceCodeSuccess,
	resetDocumentContent,
	updateDocumentExercise
} from '@/slices/document.slice';
import { setSnackbar } from '@/slices/snackbar.slice';
import notificationMessage from '@/utils/notificationMessage';
import { setLoading } from '@/slices/loading.slice';
import { changePublishDocumentSuccess, fetchCourseById } from '@/slices/course.slice';

function* fetchDocumentByIdSaga(action: PayloadAction<{ id: string }>) {
	try {
		console.log('saga fetching document by id');
		const document: AxiosResponse<GetDocumentByIdResponse> = yield call(
			documentApi.getDocumentById,
			action.payload.id
		);
		if (document.data.Contents.length > 0) {
			if (document.data.Contents[0].ContentTypeId != 0) {
				const file: AxiosResponse<any> = yield call(
					documentApi.getMedia,
					document.data.Contents[0].ContentBody
				);
				let temp = new Blob([file.data], { type: 'application/pdf' });
				yield put(fetchDocumentByIdWithContentSuccess({ document: document.data, documentContent: temp }));
			} else {
				yield put(
					fetchDocumentByIdWithContentSuccess({
						document: document.data,
						documentContent: document.data.Contents[0].ContentBody
					})
				);
			}
		} else {
			yield put(fetchDocumentByIdSuccess(document.data));
		}
	} catch (error: any) {
		yield put(fetchDocumentByIdError());
		yield put(setSnackbar(notificationMessage.ERROR('Invalid document id or document does not exist.')));
		console.log('saga fetch course by id failed');
	}
}
function* fetchDocumentByIdWithExerciseSaga(action: PayloadAction<{ documentId: string }>) {
	try {
		console.log('saga fetching document exercise by id');
		const exercise: AxiosResponse<GetExerciseResponse> = yield call(
			documentApi.getExercise,
			action.payload.documentId
		);
		if (exercise.data) {
			yield put(fetchDocumentByIdWithExerciseSuccess(exercise.data));
		}
	} catch (error) {
		yield put(fetchDocumentByIdWithExerciseError());
	}
}
function* fetchSampleSourceCodeSaga(action: PayloadAction<{ documentId: string, type: number }>) {
	try {
		console.log('saga fetching sample source code');
		const source: AxiosResponse<GetSampleSourceCodeResponse> = yield call(
			documentApi.getSampleSourceCode,
			action.payload.documentId,
			action.payload.type
		);
		if (source.data) {
			yield put(fetchSampleSourceCodeSuccess(source.data));
		}
	} catch (error) {
		yield put(setSnackbar(notificationMessage.ERROR('programming language not supported.')));
		yield put(fetchSampleSourceCodeError());
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
function* createDocumentExerciseSaga(action: PayloadAction<{ body: CreateExerciseRequest; documentId: string }>) {
	try {
		console.log('saga create/update document exercise.');
		yield put(setLoading({ isLoading: true }));
		const data: AxiosResponse<any> = yield call(
			documentApi.createExercise,
			action.payload.documentId,
			action.payload.body
		);

		if (data) {
			yield put(setLoading({ isLoading: false }));
			yield put(setSnackbar(notificationMessage.CREATE_SUCCESS('document exercsie')));
		}
		yield put(fetchDocumentByIdWithExercise({ documentId: action.payload.documentId }));
	} catch (error: any) {
		console.log('saga create/update document exercise failed.');
		yield put(setLoading({ isLoading: false }));
		yield put(setSnackbar(notificationMessage.CREATE_FAIL('document content', 'Please, try again!')));
	}
}
function* resetDocumentContentSaga(action: PayloadAction<{ documentId: string }>) {
	try {
		console.log('saga delete document content');
		yield put(setLoading({ isLoading: true }));
		const data: AxiosResponse<any> = yield call(documentApi.deleteDocumentContent, action.payload.documentId);
		if (data) {
			yield put(setLoading({ isLoading: false }));
			yield put(setSnackbar(notificationMessage.DELETE_SUCCESS('document content')));
		}
		yield put(fetchDocumentById({ id: action.payload.documentId }));
	} catch (error: any) {
		console.log('saga reset document content failed');
		yield put(setLoading({ isLoading: false }));
		yield put(setSnackbar(notificationMessage.ERROR('Reset document content failed, please try again!.')));
	}
}
function* changePublishDocumentSaga(action: PayloadAction<{ documentId: string, status: number }>) {
	try {
		console.log('saga publish/unpublish document ');
		yield put(setLoading({ isLoading: true }));
		const data: AxiosResponse<any> = yield call(documentApi.changePublishDocument, action.payload.documentId, action.payload.status);

		if (data) {
			yield put(setLoading({ isLoading: false }));
			yield put(setSnackbar(notificationMessage.UPDATE_SUCCESS('document', `Document ${action.payload.status === 1 ? 'published' : 'unpublished'}`)));
		}
		yield put(changePublishDocumentSuccess({ documentId: action.payload.documentId, status: action.payload.status }));
	} catch (error: any) {
		console.log('saga publish/unpublish document failed.');
		yield put(setLoading({ isLoading: false }));
		yield put(setSnackbar(notificationMessage.ERROR('Published/Unpublished document failed! Please try again!')));
	}
}

function* updateDocumentExerciseSaga(action: PayloadAction<{ ExerciseBody: UpdateExerciseRequest; documentId: string, SourceBody: UpdateSampleSourceCodeRequest }>) {
	try {
		console.log('saga update document exercise');
		yield put(setLoading({ isLoading: true }));
		const data: AxiosResponse<any> = yield call(documentApi.updateExercise, action.payload.documentId, action.payload.ExerciseBody);

		if (data) {
			try {
				console.log('saga update document exercise source');
				const data2: AxiosResponse<any> = yield call(documentApi.updateSampleSourceCode, action.payload.documentId, action.payload.SourceBody.type, action.payload.SourceBody.sampleSourceCode);
				if (data2) {
					yield put(setLoading({ isLoading: false }));
				}
			} catch (error: any) {
				console.log('saga update document exercise source  failed.');
				yield put(setLoading({ isLoading: false }));
				yield put(setSnackbar(notificationMessage.UPDATE_FAIL('document exercise source failed!', ' Please try again!')));
			}
		}
		yield put(fetchDocumentByIdWithExercise({ documentId: action.payload.documentId }));
	} catch (error: any) {
		console.log('saga update document exercise failed.');
		yield put(setLoading({ isLoading: false }));
		yield put(setSnackbar(notificationMessage.UPDATE_FAIL('document exercise failed!', ' Please try again!')));
	}
}

function* updateSampleSourceCodeSaga(action: PayloadAction<{ documentId: string, type: number, body: UpdateSampleSourceCodeRequest }>) {

}

export function* watchDocument() {
	yield takeLatest(fetchDocumentById.type, fetchDocumentByIdSaga);
	yield takeLatest(createDocument.type, createDocumentSaga);
	yield takeLatest(createDocumentContent.type, createDocumentContentSaga);
	yield takeLatest(resetDocumentContent.type, resetDocumentContentSaga);
	yield takeLatest(fetchDocumentByIdWithExercise.type, fetchDocumentByIdWithExerciseSaga);
	yield takeLatest(createDocumentExercise.type, createDocumentExerciseSaga);
	yield takeLatest(fetchSampleSourceCode.type, fetchSampleSourceCodeSaga);
	yield takeLatest(changePublishDocument.type, changePublishDocumentSaga);
	yield takeLatest(updateDocumentExercise.type, updateDocumentExerciseSaga);
}
