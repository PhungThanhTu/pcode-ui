import { put, call, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import documentApi from '@/api/documentApi';
import { AxiosResponse } from 'axios';
import {
	CreateDocumentContentRequest,
	CreateDocumentRequest,
	CreateDocumentResponse,
	CreateExerciseRequest,
	CreateSubmissionRequest,
	CreateTestCaseRequest,
	CreateTestCaseResponse,
	GetDocumentByIdResponse,
	GetExerciseResponse,
	GetSampleSourceCodeResponse,
	GetSingleSubmissionResponse,
	GetSingleTestCaseResponse,
	ScoreSubmissionRequest,
	ScoreSubmissionResponse,
	Submission,
	SubmissionActionRequest,
	SubmissionManage,
	UpdateExerciseRequest,
	UpdateSampleSourceCodeRequest,
	UpdateTestCaseRequest
} from '@/types/document.type';
import {
	changePublishDocument,
	createDocument,
	createDocumentContent,
	createDocumentExercise,
	createSubmission,
	createTestCase,
	createTestCaseSuccess,
	deleteSubmission,
	deleteSubmissionSuccess,
	deleteTestCase,
	deleteTestCaseSuccess,
	fetchAllSubmissions,
	fetchAllSubmissionsError,
	fetchAllSubmissionsManage,
	fetchAllSubmissionsManageError,
	fetchAllSubmissionsManageSuccess,
	fetchAllSubmissionsSuccess,
	fetchAllTestCases,
	fetchAllTestCasesError,
	fetchAllTestCasesSuccess,
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
	fetchSingleSubmission,
	fetchSingleSubmissionError,
	fetchSingleSubmissionSuccess,
	markSubmission,
	markSubmissionSuccess,
	resetDocumentContent,
	scoreSubmissionManage,
	scoreSubmissionManageSuccess,
	updateDocumentExercise,
	updateTestCase,
	updateTestCaseSuccess
} from '@/slices/document.slice';
import { setSnackbar } from '@/slices/snackbar.slice';
import notificationMessage from '@/utils/notificationMessage';
import { setLoading } from '@/slices/loading.slice';
import { changePublishDocumentSuccess, fetchCourseById } from '@/slices/course.slice';

//#region document
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
function* changePublishDocumentSaga(action: PayloadAction<{ documentId: string; status: number }>) {
	try {
		console.log('saga publish/unpublish document ');
		yield put(setLoading({ isLoading: true }));
		const data: AxiosResponse<any> = yield call(
			documentApi.changePublishDocument,
			action.payload.documentId,
			action.payload.status
		);

		if (data) {
			yield put(setLoading({ isLoading: false }));
			yield put(
				setSnackbar(
					notificationMessage.UPDATE_SUCCESS(
						'document',
						`Document ${action.payload.status === 1 ? 'published' : 'unpublished'}`
					)
				)
			);
		}
		yield put(
			changePublishDocumentSuccess({ documentId: action.payload.documentId, status: action.payload.status })
		);
	} catch (error: any) {
		console.log('saga publish/unpublish document failed.');
		yield put(setLoading({ isLoading: false }));
		yield put(setSnackbar(notificationMessage.ERROR('Published/Unpublished document failed! Please try again!')));
	}
}
//#endregion

//#region document content
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
//#endregion

//#region document exercise
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
function* updateDocumentExerciseSaga(
	action: PayloadAction<{
		ExerciseBody: UpdateExerciseRequest;
		documentId: string;
		SourceBody: UpdateSampleSourceCodeRequest;
	}>
) {
	try {
		console.log('saga update document exercise');
		yield put(setLoading({ isLoading: true }));
		const data: AxiosResponse<any> = yield call(
			documentApi.updateExercise,
			action.payload.documentId,
			action.payload.ExerciseBody
		);

		if (data) {
			try {
				console.log('saga update document exercise source');
				const data2: AxiosResponse<any> = yield call(
					documentApi.updateSampleSourceCode,
					action.payload.documentId,
					action.payload.SourceBody.type,
					action.payload.SourceBody.sampleSourceCode
				);
				if (data2) {
					yield put(setLoading({ isLoading: false }));
					yield put(setSnackbar(notificationMessage.UPDATE_SUCCESS('document exercise', '')));
				}
			} catch (error: any) {
				console.log('saga update document exercise source  failed.');
				yield put(setLoading({ isLoading: false }));
				yield put(
					setSnackbar(
						notificationMessage.UPDATE_FAIL('document exercise source failed!', ' Please try again!')
					)
				);
			}
		}
		yield put(fetchDocumentByIdWithExercise({ documentId: action.payload.documentId }));
	} catch (error: any) {
		console.log('saga update document exercise failed.');
		yield put(setLoading({ isLoading: false }));
		yield put(setSnackbar(notificationMessage.UPDATE_FAIL('document exercise failed!', ' Please try again!')));
	}
}
function* fetchSampleSourceCodeSaga(action: PayloadAction<{ documentId: string; type: number }>) {
	try {
		console.log('saga fetching sample source code');
		const source: AxiosResponse<GetSampleSourceCodeResponse> = yield call(
			documentApi.getSampleSourceCode,
			action.payload.documentId,
			action.payload.type
		);

		yield put(fetchSampleSourceCodeSuccess(source.data));
	} catch (error) {
		yield put(setSnackbar(notificationMessage.ERROR('programming language not supported.')));
		yield put(fetchSampleSourceCodeError());
	}
}
//#endregion

//#region test case
function* fetchAllTestCasesSaga(action: PayloadAction<{ documentId: string }>) {
	try {
		console.log('saga fetching document test case');
		const testcases: AxiosResponse<Array<GetSingleTestCaseResponse>> = yield call(
			documentApi.getAllTestCases,
			action.payload.documentId
		);
		if (testcases.data) {
			yield put(fetchAllTestCasesSuccess(testcases.data));
		}
	} catch (error: any) {
		yield put(fetchAllTestCasesError());
		console.log('saga fetch document test cases failed');
	}
}
function* createTestCaseSaga(action: PayloadAction<{ documentId: string; body: CreateTestCaseRequest }>) {
	try {
		console.log('saga create test case');
		yield put(setLoading({ isLoading: true }));

		const testcase: AxiosResponse<CreateTestCaseResponse> = yield call(
			documentApi.createTestCase,
			action.payload.documentId,
			action.payload.body
		);

		if (testcase.data) {
			yield put(setLoading({ isLoading: false }));
			yield put(setSnackbar(notificationMessage.CREATE_SUCCESS('test case')));
			yield put(createTestCaseSuccess(testcase.data));
		}
	} catch (error: any) {
		console.log('saga create test case failed');
		yield put(setLoading({ isLoading: false }));
		yield put(setSnackbar(notificationMessage.CREATE_FAIL('test case', '')));
	}
}
function* updateTestCaseSaga(
	action: PayloadAction<{ documentId: string; testCaseId: number; body: UpdateTestCaseRequest }>
) {
	try {
		console.log('saga update test case');
		yield put(setLoading({ isLoading: true }));
		const testcase: AxiosResponse<any> = yield call(
			documentApi.updateTestCase,
			action.payload.documentId,
			action.payload.testCaseId,
			action.payload.body
		);

		if (testcase) {
			yield put(setLoading({ isLoading: false }));
			yield put(setSnackbar(notificationMessage.UPDATE_SUCCESS('test case', '')));
			yield put(updateTestCaseSuccess({ body: action.payload.body, testCaseId: action.payload.testCaseId }));
		}
	} catch (error: any) {
		console.log('saga update test case failed');
		yield put(setLoading({ isLoading: false }));
		yield put(setSnackbar(notificationMessage.UPDATE_FAIL('test case', '')));
	}
}
function* deleteTestCaseSaga(action: PayloadAction<{ documentId: string; testCaseId: number }>) {
	try {
		console.log('saga delete test case');
		yield put(setLoading({ isLoading: true }));
		const testcase: AxiosResponse<any> = yield call(
			documentApi.deleteTestCase,
			action.payload.documentId,
			action.payload.testCaseId
		);

		if (testcase) {
			yield put(setLoading({ isLoading: false }));
			yield put(setSnackbar(notificationMessage.DELETE_SUCCESS('test case')));
			yield put(deleteTestCaseSuccess({ testCaseId: action.payload.testCaseId }));
		}
	} catch (error: any) {
		console.log('saga delete test case failed');
		yield put(setLoading({ isLoading: false }));
		yield put(setSnackbar(notificationMessage.DELETE_FAIL('test case', '')));
	}
}
//#endregion

//region document submission

function* fetchAllSubmissionsSaga(action: PayloadAction<{ documentId: string }>) {
	try {

		const submission: AxiosResponse<Array<Submission>> = yield call(
			documentApi.getAllSubmissions,
			action.payload.documentId
		);
		if (submission.data) {
			yield put(fetchAllSubmissionsSuccess(submission.data));
		}
	} catch (error: any) {
		yield put(fetchAllSubmissionsError());

	}
}
function* fetchAllSubmissionsManageSaga(action: PayloadAction<{ documentId: string }>) {
	try {

		const submission: AxiosResponse<Array<SubmissionManage>> = yield call(
			documentApi.getAllSubmissionsManage,
			action.payload.documentId
		);
		if (submission.data) {
			yield put(fetchAllSubmissionsManageSuccess(submission.data));
		}
	} catch (error: any) {
		yield put(fetchAllSubmissionsManageError());

	}
}
function* fetchSingleSubmissionsSaga(action: PayloadAction<SubmissionActionRequest>) {
	try {
		console.log('saga fetching document submission');
		const submission: AxiosResponse<GetSingleSubmissionResponse> = yield call(
			documentApi.getSingleSubmission,
			action.payload
		);
		if (submission.data) {
			yield put(fetchSingleSubmissionSuccess(submission.data));
		}
	} catch (error: any) {
		yield put(fetchSingleSubmissionError());
		console.log('saga fetch document submission failed');
	}
}
function* createSubmissionSaga(action: PayloadAction<{ documentId: string; body: CreateSubmissionRequest }>) {
	try {

		yield put(setLoading({ isLoading: true }));

		const submission: AxiosResponse<CreateTestCaseResponse> = yield call(
			documentApi.createSubmission,
			action.payload.documentId,
			action.payload.body
		);

		if (submission.data) {
			yield put(setLoading({ isLoading: false }));
			yield put(setSnackbar(notificationMessage.CREATE_SUCCESS('submission')));
			yield put(fetchAllSubmissions({ documentId: action.payload.documentId }));
		}
	} catch (error: any) {

		yield put(setLoading({ isLoading: false }));
		yield put(setSnackbar(notificationMessage.CREATE_FAIL('submission', '')));
	}
}
function* deleteSubmissionSaga(action: PayloadAction<SubmissionActionRequest>) {
	try {

		yield put(setLoading({ isLoading: true }));
		const submission: AxiosResponse<any> = yield call(documentApi.deleteSubmission, action.payload);

		if (submission) {
			yield put(setLoading({ isLoading: false }));
			yield put(setSnackbar(notificationMessage.DELETE_SUCCESS('submission')));
			yield put(deleteSubmissionSuccess(submission.data));
		}
	} catch (error: any) {

		yield put(setLoading({ isLoading: false }));
		yield put(setSnackbar(notificationMessage.DELETE_FAIL('test case', '')));
	}
}

function* markSubmissionSaga(action: PayloadAction<SubmissionActionRequest>) {
	try {

		yield put(setLoading({ isLoading: true }));
		const submission: AxiosResponse<any> = yield call(documentApi.markSubmission, action.payload);

		if (submission) {
			yield put(setLoading({ isLoading: false }));
			yield put(setSnackbar(notificationMessage.UPDATE_SUCCESS('submission', 'Submission is marked')));
			yield put(markSubmissionSuccess(action.payload));
		}
	} catch (error: any) {

		yield put(setLoading({ isLoading: false }));
		yield put(setSnackbar(notificationMessage.UPDATE_FAIL('submission', '')));
	}
}
function* scoreSubmissionManageSaga(action: PayloadAction<ScoreSubmissionRequest>) {
	try {

		yield put(setLoading({ isLoading: true }));
		const response : AxiosResponse<ScoreSubmissionResponse> = yield call(documentApi.scoreSubmissionManage, action.payload);

		if (response.data) {
			yield put(setLoading({ isLoading: false }));
			yield put(setSnackbar(notificationMessage.UPDATE_SUCCESS('submission', 'Submission is updated with new score')));
			yield put(scoreSubmissionManageSuccess(response.data));
		}
	} catch (error: any) {

		yield put(setLoading({ isLoading: false }));
		yield put(setSnackbar(notificationMessage.UPDATE_FAIL('submission', '')));
	}
}
//endregion

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
	yield takeLatest(fetchAllTestCases.type, fetchAllTestCasesSaga);
	yield takeLatest(createTestCase.type, createTestCaseSaga);
	yield takeLatest(updateTestCase.type, updateTestCaseSaga);
	yield takeLatest(deleteTestCase.type, deleteTestCaseSaga);
	yield takeLatest(fetchAllSubmissions.type, fetchAllSubmissionsSaga);
	yield takeLatest(fetchAllSubmissionsManage.type, fetchAllSubmissionsManageSaga);
	yield takeLatest(fetchSingleSubmission.type, fetchSingleSubmissionsSaga);
	yield takeLatest(createSubmission.type, createSubmissionSaga);
	yield takeLatest(deleteSubmission.type, deleteSubmissionSaga);
	yield takeLatest(markSubmission.type, markSubmissionSaga);
	yield takeLatest(scoreSubmissionManage.type, scoreSubmissionManageSaga);
}
