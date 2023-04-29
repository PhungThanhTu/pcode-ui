import { put, call, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { setSnackbar } from '@/slices/snackbar.slice';
import notificationMessage from '@/utils/notificationMessage';
import { createCourse, fetchCourses, fetchCoursesSuccess, renameCourse, joinCourse, fetchCourseById, fetchCourseByIdSuccess, fetchCourseByIdError, fetchCoursesError } from '@/slices/course.slice';
import { Course, CreateCourseRequest, CreateCourseResponse, GetCourseByIdResponse, JoinCourse } from '@/types/course.type';
import courseApi from '@/api/courseApi';
import { setLoading } from '@/slices/loading.slice';

function* fetchCoursesSaga() {
	try {
		console.log('saga fetching courses');
		const courses: AxiosResponse<Course[]> = yield call(courseApi.getAllCourses);
		yield put(fetchCoursesSuccess(courses.data));
	} catch (error: any) {
		yield put(fetchCoursesError());
		console.log('saga fetch course failed');
	}
}

function* createCourseSaga(action: PayloadAction<CreateCourseRequest>) {
	try {
		console.log('saga create course');
		yield put(setLoading({ isLoading: true }));
		const data: CreateCourseResponse = yield call(courseApi.createCourse, action.payload);

		if (data) {
			yield put(setLoading({ isLoading: false }));
			yield put(setSnackbar(notificationMessage.CREATE_SUCCESS('course')));
		}

		yield put(fetchCourses());
	} catch (error: any) {
		console.log('saga create course failed');
		yield put(setLoading({ isLoading: false }));
		yield put(setSnackbar(notificationMessage.CREATE_FAIL('course', '')));
	}
}

function* renameCourseSaga(action: PayloadAction<Course>) {
	try {
		console.log('saga rename course', action.payload.title);
		yield call(courseApi.renameCourse, action.payload);
		yield put(setSnackbar(notificationMessage.UPDATE_SUCCESS('course', 'Rename Succesfully')));
		yield put(fetchCourses());
	} catch (error: any) {
		console.log('saga rename course failed');
		yield put(setSnackbar(notificationMessage.UPDATE_FAIL('course', 'Rename Fail')));
	}
}

function* joinCourseSaga(action: PayloadAction<JoinCourse>) {
	try {
		yield call(courseApi.joinCourse, action.payload.Code);
		yield put(setSnackbar(notificationMessage.UPDATE_SUCCESS('course', 'Join Succesfully')));
		yield put(fetchCourses());
		yield;
	} catch (error: any) {
		console.log('saga join course failed');
		yield put(setSnackbar(notificationMessage.UPDATE_FAIL('course', 'Cannot Join Course')));
	}
}
function* fetchCourseByIdSaga(action: PayloadAction<{ id: string }>) {
	try {
		console.log('saga fetching course by id');
		const course: AxiosResponse<GetCourseByIdResponse> = yield call(courseApi.getCourseById, action.payload.id);
		yield put(fetchCourseByIdSuccess(course.data));
	} catch (error: any) {
		yield put(fetchCourseByIdError())
		yield put(setSnackbar(notificationMessage.ERROR('Invalid course id or course does not exist.')))
		console.log('saga fetch course by id failed');
	}
}
export function* watchCourse() {
	yield takeLatest(fetchCourses.type, fetchCoursesSaga);
	yield takeLatest(createCourse.type, createCourseSaga);
	yield takeLatest(renameCourse.type, renameCourseSaga);
	yield takeLatest(joinCourse.type, joinCourseSaga);
	yield takeLatest(fetchCourseById.type, fetchCourseByIdSaga);
}
