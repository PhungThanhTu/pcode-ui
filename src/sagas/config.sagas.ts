import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { fetchAllConfigs, fetchContentTypes, fetchContentTypesError, fetchContentTypesSuccess, fetchJudgers, fetchJudgersError, fetchJudgersSuccess, fetchProgrammingLanguages, fetchProgrammingLanguagesSuccess } from '@/slices/config.slice';
import { AxiosResponse } from 'axios';

import configApi from '@/api/configApi';
import { Judger, ContentType, ProgrammingLanguage } from '@/types/config.type';
import { fetchSampleSourceCodeError } from '@/slices/document.slice';


function* fetchAllConfigsSaga() {
    fetchJudgersSaga()
    fetchContentTypesSaga()
    fetchProgrammingLanguagesSaga()
}
function* fetchJudgersSaga() {
    try {
        const judgers: AxiosResponse<Array<Judger>> = yield call(configApi.getJudgers);
        yield put(fetchJudgersSuccess(judgers.data))

    } catch {
        yield put(fetchJudgersError())
    }
}
function* fetchContentTypesSaga() {
    try {
        const contentTypes: AxiosResponse<Array<ContentType>> = yield call(configApi.getContentTypes);
        yield put(fetchContentTypesSuccess(contentTypes.data))

    } catch {
        yield put(fetchContentTypesError())
    }
}
function* fetchProgrammingLanguagesSaga() {
    try {
        const programmingLanguages: AxiosResponse<Array<ProgrammingLanguage>> = yield call(configApi.getProgrammingLaguages);
        yield put(fetchProgrammingLanguagesSuccess(programmingLanguages.data))

    } catch {
        yield put(fetchSampleSourceCodeError())
    }
}
export function* watchConfig() {
    yield takeLatest(fetchAllConfigs.type, fetchAllConfigsSaga);
    yield takeLatest(fetchJudgers.type, fetchJudgersSaga);
    yield takeLatest(fetchContentTypes.type, fetchContentTypesSaga);
    yield takeLatest(fetchProgrammingLanguages.type, fetchProgrammingLanguagesSaga);
}
