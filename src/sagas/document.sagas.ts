import { put, call, takeLatest, delay, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import documentApi from '@/api/documentApi';
import { AxiosResponse } from 'axios';
import {
	CreateDocumentContentRequest,
	CreateDocumentContentResponse,
	CreateDocumentRequest,
	CreateDocumentResponse,
	CreateExerciseRequest,
	CreateSubmissionRequest,
	CreateSubmissionResponse,
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
	createDocumentContentSuccess,
	createDocumentExercise,
	createSubmission,
	createTestCase,
	createTestCaseSuccess,
	deleteSubmission,
	deleteSubmissionSuccess,
	deleteTestCase,
	deleteTestCaseSuccess,
	downloadDocumentContent,
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
	fetchDocumentByIdWithContentError,
	fetchDocumentByIdWithContentSuccess,
	fetchExercise,
	fetchExerciseError,
	fetchExerciseSuccess,
	fetchSampleSourceCode,
	fetchSampleSourceCodeError,
	fetchSampleSourceCodeSuccess,
	fetchSingleSubmission,
	fetchSingleSubmissionError,
	fetchSingleSubmissionSuccess,
	markSubmission,
	markSubmissionSuccess,
	resetDocumentContent,
	resetDocumentContentSuccess,
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
import { contentTypeId } from '@/config';

//#region document
function* fetchDocumentByIdSaga(action: PayloadAction<{ id: string }>) {
	try {
		const document: AxiosResponse<GetDocumentByIdResponse> = yield call(
			documentApi.getDocumentById,
			action.payload.id
		);
		if (document.data.Contents.length > 0) {
			try {
				if (document.data.Contents[0].ContentTypeId != contentTypeId.markDown) {
					const file: AxiosResponse<any> = yield call(
						documentApi.getMedia,
						document.data.Contents[0].ContentBody
					);


					let content = new Blob([file.data], { type: document.data.Contents[0].ContentTypeId == contentTypeId.pdf ? 'application/pdf' : 'application/octed-stream' });
					yield put(fetchDocumentByIdWithContentSuccess({ documentContent: content }));
				} else {
					yield put(
						fetchDocumentByIdWithContentSuccess({
							documentContent: document.data.Contents[0].ContentBody
						})
					);
				}
			} catch {
				yield put(fetchDocumentByIdWithContentError());
				yield put(
					setSnackbar(
						notificationMessage.ERROR('Invalid document content id or document content does not exist.')
					)
				);
			}
		}
		yield put(fetchDocumentByIdSuccess(document.data));
	} catch (error: any) {
		yield put(fetchDocumentByIdError());
		yield put(setSnackbar(notificationMessage.ERROR('Invalid document id or document does not exist.')));
	}
}
function* createDocumentSaga(action: PayloadAction<CreateDocumentRequest>) {
	try {

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
		yield put(setLoading({ isLoading: true }));

		const response: AxiosResponse<CreateDocumentContentResponse> = yield call(
			documentApi.createDocumentContent,
			action.payload
		);

		if (response) {
			yield put(setLoading({ isLoading: false }));
			yield put(setSnackbar(notificationMessage.UPDATE_SUCCESS('document content', '')));
			yield put(
				createDocumentContentSuccess({ content: action.payload.content, documentContent: response.data })
			);
		}
	} catch (error: any) {
		yield put(setLoading({ isLoading: false }));
		yield put(setSnackbar(notificationMessage.UPDATE_FAIL('document content', '')));
	}
}
function* resetDocumentContentSaga(action: PayloadAction<{ documentId: string }>) {
	try {
		yield put(setLoading({ isLoading: true }));
		const data: AxiosResponse<any> = yield call(documentApi.deleteDocumentContent, action.payload.documentId);
		if (data) {
			yield put(setLoading({ isLoading: false }));
			yield put(setSnackbar(notificationMessage.DELETE_SUCCESS('document content')));
			yield put(resetDocumentContentSuccess());
		}
	} catch (error: any) {
		yield put(setLoading({ isLoading: false }));
		yield put(setSnackbar(notificationMessage.ERROR('Reset document content failed, please try again!.')));
	}
}
function* downloadDocumentContentSaga(action: PayloadAction<{ contentId: string, documentId: string }>) {
	try {
		yield put(setLoading({ isLoading: true }));
		const data: AxiosResponse<any> = yield call(documentApi.getMediaDownload, action.payload.documentId, action.payload.contentId);
		if (data) {
			yield put(setLoading({ isLoading: false }));
		}
	} catch (error: any) {
		yield put(setLoading({ isLoading: false }));
		yield put(setSnackbar(notificationMessage.ERROR('Download document content file failed, please try again!.')));
	}
}

//#endregion

//#region document exercise
function* fetchExerciseSaga(action: PayloadAction<{ documentId: string }>) {
	try {
		const exercise: AxiosResponse<GetExerciseResponse> = yield call(
			documentApi.getExercise,
			action.payload.documentId
		);
		if (exercise.data) {
			yield put(fetchExerciseSuccess(exercise.data));
		}
	} catch (error) {
		yield put(fetchExerciseError());
	}
}
function* createDocumentExerciseSaga(action: PayloadAction<{ body: CreateExerciseRequest; documentId: string }>) {
	try {
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
		yield put(fetchExercise({ documentId: action.payload.documentId }));
	} catch (error: any) {
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
		yield put(setLoading({ isLoading: true }));
		const data: AxiosResponse<any> = yield call(
			documentApi.updateExercise,
			action.payload.documentId,
			action.payload.ExerciseBody
		);

		if (data) {
			try {

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

				yield put(setLoading({ isLoading: false }));
				yield put(
					setSnackbar(
						notificationMessage.UPDATE_FAIL('document exercise source failed!', ' Please try again!')
					)
				);
			}
		}
		yield put(fetchExercise({ documentId: action.payload.documentId }));
	} catch (error: any) {

		yield put(setLoading({ isLoading: false }));
		yield put(setSnackbar(notificationMessage.UPDATE_FAIL('document exercise failed!', ' Please try again!')));
	}
}
function* fetchSampleSourceCodeSaga(action: PayloadAction<{ documentId: string; type: number }>) {
	try {

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

//#region document submission

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
function* fetchSingleSubmissionSaga(action: PayloadAction<SubmissionActionRequest>) {
	try {

		let maxRequests = 20
		while (maxRequests > 0) {
			yield delay(500)
			const submission: AxiosResponse<GetSingleSubmissionResponse> = yield call(
				documentApi.getSingleSubmission,
				action.payload
			);
			if (submission.data.testResults.length > 0) {
				yield put(fetchSingleSubmissionSuccess(submission.data));
				break;
			} else {
				if (maxRequests === 1) {
					yield put(fetchSingleSubmissionError());
					yield put(setSnackbar(notificationMessage.ERROR('Failed to get Submission Result! Please try again')));
					break;
				}
			}
			maxRequests--;
		}


	} catch (error: any) {
		yield put(fetchSingleSubmissionError());
	}
}
function* createSubmissionSaga(action: PayloadAction<{ documentId: string; body: CreateSubmissionRequest }>) {
	try {
		yield put(setLoading({ isLoading: true }));

		const submission: AxiosResponse<CreateSubmissionResponse> = yield call(
			documentApi.createSubmission,
			action.payload.documentId,
			action.payload.body
		);

		if (submission.data) {
			yield put(setLoading({ isLoading: false }));
			yield put(setSnackbar(notificationMessage.CREATE_SUCCESS('submission')));
			yield put(
				markSubmission({
					documentId: action.payload.documentId,
					submissionId: submission.data.id.toString()
				})
			);
			yield delay(1000)
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
			yield put(fetchSingleSubmission(action.payload));
		}
	} catch (error: any) {
		yield put(setLoading({ isLoading: false }));
		yield put(setSnackbar(notificationMessage.UPDATE_FAIL('submission', '')));
	}
}
function* scoreSubmissionManageSaga(action: PayloadAction<ScoreSubmissionRequest>) {
	try {
		yield put(setLoading({ isLoading: true }));
		const response: AxiosResponse<ScoreSubmissionResponse> = yield call(
			documentApi.scoreSubmissionManage,
			action.payload
		);

		if (response.data) {
			yield put(setLoading({ isLoading: false }));
			yield put(
				setSnackbar(notificationMessage.UPDATE_SUCCESS('submission', 'Submission is updated with new score'))
			);
			yield put(scoreSubmissionManageSuccess(response.data));
		}
	} catch (error: any) {
		yield put(setLoading({ isLoading: false }));
		yield put(setSnackbar(notificationMessage.UPDATE_FAIL('submission', 'Please try again!')));
	}
}
//#endregion

export function* watchDocument() {
	yield takeLatest(fetchDocumentById.type, fetchDocumentByIdSaga);
	yield takeLatest(createDocument.type, createDocumentSaga);
	yield takeLatest(createDocumentContent.type, createDocumentContentSaga);
	yield takeLatest(resetDocumentContent.type, resetDocumentContentSaga);
	yield takeLatest(fetchExercise.type, fetchExerciseSaga);
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
	yield takeLatest(fetchSingleSubmission.type, fetchSingleSubmissionSaga);
	yield takeLatest(createSubmission.type, createSubmissionSaga);
	yield takeLatest(deleteSubmission.type, deleteSubmissionSaga);
	yield takeLatest(markSubmission.type, markSubmissionSaga);
	yield takeLatest(scoreSubmissionManage.type, scoreSubmissionManageSaga);
	yield takeLatest(downloadDocumentContent.type, downloadDocumentContentSaga);

}
