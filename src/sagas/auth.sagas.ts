import { put, call, takeLatest } from 'redux-saga/effects';
import { login, loginSuccess, loginError, logout, fetchProfile, logoutSuccess } from '../slices/auth.slice';
import { PayloadAction } from '@reduxjs/toolkit';
import authApi from '../api/authApi';
import { UserCredentials } from 'types';
import { AxiosError, AxiosResponse } from 'axios';
import { UserProfile } from 'types/auth.type';

function* loginSaga(action: PayloadAction<UserCredentials>) {
	console.log('Saga is login');
	try {
		yield call(authApi.login, action.payload);
		const profile: AxiosResponse<UserProfile> = yield call(authApi.getProfile);
		yield put(loginSuccess(profile.data));
	} catch (error: any) {
		if (error instanceof AxiosError && error.response?.status === 401) {
			yield put(loginError('Invalid Credentials'));
		} else {
			yield put(loginError('Login failed'));
		}
	}
}

function* logoutSaga() {
	console.log('saga is log out');
	try {
		yield call(authApi.logout);
		yield put(logoutSuccess());
	} catch {
		console.log('logout error');
		yield put(logoutSuccess());
	}
}

function* fetchProfileSaga() {
	try {
		console.log('saga fetching profile');
		const profile: AxiosResponse<UserProfile> = yield call(authApi.getProfile);
		yield put(loginSuccess(profile.data));
		console.log('saga fetch profile success');
	} catch (error: any) {
		console.log('saga fetch profile failed');
		yield call(authApi.logout);
		yield put(logout());
	}
}

export function* watchLogin() {
	yield takeLatest(login.type, loginSaga);
	yield takeLatest(logout.type, logoutSaga);
	yield takeLatest(fetchProfile.type, fetchProfileSaga);
}
