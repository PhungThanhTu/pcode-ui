import { put, call, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { setSnackbar } from '@/slices/snackbar.slice';
import notificationMessage from '@/utils/notificationMessage';
import { createCourse, fetchCourse, fetchCourseSuccess, renameCourse } from '@/slices/course.slice';
import { Course, CreateCourse, CreateCourseResponse, JoinCourse } from '@/types/course.type';
import courseApi from '@/api/courseApi';

function* fetchCourseSaga() {
	try {
		console.log('saga fetching course');
		const course: AxiosResponse<Course[]> = yield call(courseApi.getAllCourses);
		yield put(fetchCourseSuccess(course.data));
	} catch (error: any) {
		console.log('saga fetch course failed');
	}
}

function* createCourseSaga(action: PayloadAction<CreateCourse>) {
	try {
		console.log('saga create course');
		const data: CreateCourseResponse = yield call(courseApi.createCourse, action.payload);
		if (data) {
			yield put(setSnackbar(notificationMessage.CREATE_SUCCESS('course')));
		} else {
		}
		yield put(fetchCourse());
	} catch (error: any) {
		console.log('saga create course failed');
		yield put(setSnackbar(notificationMessage.CREATE_FAIL('course', '')));
	}
}

function* renameCourseSaga(action: PayloadAction<Course>) {
	try {
		console.log('saga rename course', action.payload.title);
		yield call(courseApi.renameCourse, action.payload);
		yield put(setSnackbar(notificationMessage.UPDATE_SUCCESS('course', 'Rename Succesfully')));
		yield put(fetchCourse());
	} catch (error: any) {
		console.log('saga rename course failed');
		yield put(setSnackbar(notificationMessage.UPDATE_FAIL('course', 'Rename Fail')));
	}
}

function* joinCourse(action: PayloadAction<JoinCourse>) {
	try {
		yield call(courseApi.joinCourse, action.payload.Code);
		yield put(setSnackbar(notificationMessage.UPDATE_SUCCESS('course', 'Join Succesfully')));
		yield put(fetchCourse());
	} catch (error: any) {
		console.log('saga join course failed');
		yield put(setSnackbar(notificationMessage.UPDATE_FAIL('course', 'Cannot Join Course')));
	}
}

export function* watchCourse() {
	yield takeLatest(fetchCourse.type, fetchCourseSaga);
	yield takeLatest(createCourse.type, createCourseSaga);
	yield takeLatest(renameCourse.type, renameCourseSaga);
}