import { PayloadAction } from '@reduxjs/toolkit';
import authApi from '../api/authApi';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { RegisterRequest } from '../types/register.type';
import { registerFailed, registerSuccess, requestRegister, resetRegisterState } from '../slices/register.slice';

function* registerSaga(action: PayloadAction<RegisterRequest>) {
	console.log('saga is register');
	try {
		yield call(authApi.register, action.payload);
		yield put(registerSuccess());
		yield delay(5000);
		yield put(resetRegisterState());
	} catch (error: any) {
		yield put(registerFailed('Register failed'));
	}
}

export function* watchRegister() {
	yield takeLatest(requestRegister.type, registerSaga);
}
