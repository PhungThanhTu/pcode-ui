import { put, call, takeLatest, delay } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { setSnackbar } from '@/slices/snackbar.slice';
import notificationMessage from '@/utils/notificationMessage';
import {
	createCourse,
	fetchCourses,
	fetchCoursesSuccess,
	renameCourse,
	joinCourse,
	fetchCourseById,
	fetchCourseByIdSuccess,
	fetchCourseByIdError,
	fetchCoursesError,
	fetchCourseScoreByIdSuccess,
	fetchCourseScoreByIdError,
	fetchCourseScoreById
} from '@/slices/course.slice';
import {
	Course,
	CourseScore,
	CreateCourseRequest,
	CreateCourseResponse,
	GetCourseByIdResponse,
	JoinCourse
} from '@/types/course.type';
import courseApi from '@/api/courseApi';
import { setLoading } from '@/slices/loading.slice';

function* fetchCoursesSaga() {
	try {
		const courses: AxiosResponse<Course[]> = yield call(courseApi.getAllCourses);
		yield put(fetchCoursesSuccess(courses.data));
	} catch (error: any) {
		yield put(fetchCoursesError());
	}
}

function* createCourseSaga(action: PayloadAction<CreateCourseRequest>) {
	try {
		yield put(setLoading({ isLoading: true }));
		const data: CreateCourseResponse = yield call(courseApi.createCourse, action.payload);

		if (data) {
			yield put(setLoading({ isLoading: false }));
			yield put(setSnackbar(notificationMessage.CREATE_SUCCESS('course')));
		}
		yield put(fetchCourses());
	} catch (error: any) {
		yield put(setLoading({ isLoading: false }));
		yield put(setSnackbar(notificationMessage.CREATE_FAIL('course', '')));
	}
}

function* renameCourseSaga(action: PayloadAction<Course>) {
	try {
		yield call(courseApi.renameCourse, action.payload);
		yield put(setSnackbar(notificationMessage.UPDATE_SUCCESS('course', 'Rename Succesfully')));
		yield put(fetchCourses());
	} catch (error: any) {
		yield put(setSnackbar(notificationMessage.UPDATE_FAIL('course', 'Rename Fail')));
	}
}

function* joinCourseSaga(action: PayloadAction<JoinCourse>) {
	try {
		yield delay(3000);
		yield call(courseApi.joinCourse, action.payload.Code);
		yield put(setSnackbar(notificationMessage.UPDATE_SUCCESS('course', 'Join Succesfully')));
		yield put(fetchCourses());
		yield action.payload.Navigate();
	} catch (error: any) {
		yield put(setSnackbar(notificationMessage.UPDATE_FAIL('course', 'Cannot Join Course')));
	}
}
function* fetchCourseByIdSaga(action: PayloadAction<{ id: string }>) {
	try {
		const course: AxiosResponse<GetCourseByIdResponse> = yield call(courseApi.getCourseById, action.payload.id);
		yield put(fetchCourseByIdSuccess(course.data));
	} catch (error: any) {
		yield put(fetchCourseByIdError());
		yield put(setSnackbar(notificationMessage.ERROR('Invalid course id or course does not exist.')));
	}
}
function* fetchCourseScoreByIdSaga(action: PayloadAction<{ courseId: string }>) {
	try {
		const response: AxiosResponse<Array<CourseScore>> = yield call(
			courseApi.getCourseScoreById,
			action.payload.courseId
		);
		yield put(fetchCourseScoreByIdSuccess(response.data));
	} catch (error: any) {
		yield put(fetchCourseScoreByIdError());
	}
}
export function* watchCourse() {
	yield takeLatest(fetchCourses.type, fetchCoursesSaga);
	yield takeLatest(createCourse.type, createCourseSaga);
	yield takeLatest(renameCourse.type, renameCourseSaga);
	yield takeLatest(joinCourse.type, joinCourseSaga);
	yield takeLatest(fetchCourseById.type, fetchCourseByIdSaga);
	yield takeLatest(fetchCourseScoreById.type, fetchCourseScoreByIdSaga);
}
