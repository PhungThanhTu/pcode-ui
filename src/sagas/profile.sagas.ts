import { put, call, takeLatest, delay } from 'redux-saga/effects';
import { loginSuccess, logout } from '../slices/auth.slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { UserProfile } from '../types/auth.type';
import profileApi from '@/api/profileApi';
import { updateProfile, fetchProfile, changePassword } from '@/slices/profile.slice';
import { setSnackbar } from '@/slices/snackbar.slice';
import notificationMessage from '@/utils/notificationMessage';

function* fetchProfileSaga() {
    try {
        console.log('saga fetching profile');
        const profile: AxiosResponse<UserProfile> = yield call(profileApi.getProfile);
        yield put(loginSuccess(profile.data));
    } catch (error: any) {
        console.log('saga fetch profile failed');
        yield put(logout());
    }
}

function* updateProfileSaga(action: PayloadAction<UserProfile>) {
    try {
        let body = {
            fullName: action.payload.fullName,
            email: action.payload.email
            // avatar: action.payload.avatar
        };
        console.log('saga updating profile');
        yield call(profileApi.updateProfile, body);
        yield put(setSnackbar(notificationMessage.UPDATE_SUCCESS('profile', '')));
        yield put(fetchProfile());
    } catch (error: any) {
        console.log('saga update profile failed');
        yield put(setSnackbar(notificationMessage.UPDATE_FAIL('profile', '')));
    }
}
function* changePasswordSaga(action: any) {
    try {
        console.log('saga change password', action.payload);
        yield call(profileApi.changePassword, action.payload);
        yield put(setSnackbar(notificationMessage.UPDATE_SUCCESS('password', '')));
        yield put(fetchProfile());
    } catch (error: any) {
        console.log('saga update password failed');
        yield put(setSnackbar(notificationMessage.UPDATE_FAIL('paswword', '')));
    }
}
export function* watchProfile() {
    yield takeLatest(changePassword.type, changePasswordSaga);
    yield takeLatest(fetchProfile.type, fetchProfileSaga);
    yield takeLatest(updateProfile.type, updateProfileSaga);
}
