import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { fetchAllConfigs, fetchContentTypesScuccess, fetchJudgersSuccess } from '@/slices/config.slice';
import { AxiosResponse } from 'axios';

import configApi from '@/api/configApi';
import { Judger, ContentType } from '@/types/config.type';


function* fetchAllConfigsSaga() {
    fetchJudgersSaga()
    fetchContentTypesSaga()
}
function* fetchJudgersSaga() {
    try {
        const judgers: AxiosResponse<Array<Judger>> = yield call(configApi.getJudgers);
        yield put(fetchJudgersSuccess(judgers.data))

    } catch {

    }
}
function* fetchContentTypesSaga() {
    try {
        const contentTypes: AxiosResponse<Array<ContentType>> = yield call(configApi.getContentTypes);
        yield put(fetchContentTypesScuccess(contentTypes.data))

    } catch {

    }
}

export function* watchConfig() {
    yield takeLatest(fetchAllConfigs.type, fetchAllConfigsSaga);
}
