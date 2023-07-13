import { PayloadAction } from '@reduxjs/toolkit';
import authApi from '../api/authApi';
import { call,  put, takeLatest } from 'redux-saga/effects';
import { resetPassword, resetPasswordError, resetPasswordSuccess } from '@/slices/reset.slice';
import { ResetPasswordRequest } from '@/types/auth.type';
import { AxiosError } from 'axios';


function* resetPasswordSaga(action: PayloadAction<ResetPasswordRequest>) {

	try {
		yield call(authApi.resetPassword, action.payload);
		yield put(resetPasswordSuccess());
	} catch (error: any) {
		if (error instanceof AxiosError && error.response?.status === 401) {
			yield put(resetPasswordError('Reset failed'));
		} else {
			yield put(resetPasswordError('Reset failed'));
		}
	}
}


export function* watchReset() {
	yield takeLatest(resetPassword.type, resetPasswordSaga);
}
