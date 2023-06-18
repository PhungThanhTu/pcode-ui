import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConfigState, ContentType, Judger } from '@/types/config.type';

const initialState: ConfigState = {
    judgers: [],
    programmingLanguages: [],
    contentTypes: []
};

const configSlice = createSlice({
    name: 'config',
    initialState: initialState,
    reducers: {
        fetchAllConfigs: () => { },
        fetchAllConfigsSuccess: (state) => {

        },
        fetchJudgersSuccess: (state, { payload }: PayloadAction<Array<Judger>>) => {
            state.judgers = payload
        },
        fetchJudgers: () => {

        },
        fetchContentTypes: () => {

        },
        fetchContentTypesScuccess: (state, { payload }: PayloadAction<Array<ContentType>>) => {
            state.contentTypes = payload
        },
        fetchProgrammingLanguages: () => {

        },
        fetchProgrammingLanguagesScuccess: (state, { payload }: PayloadAction<Array<ContentType>>) => {
            state.contentTypes = payload
        }
    }
});

export const {
    fetchAllConfigs, fetchAllConfigsSuccess, fetchContentTypes,
    fetchContentTypesScuccess, fetchJudgers, fetchJudgersSuccess, fetchProgrammingLanguages,
    fetchProgrammingLanguagesScuccess
} = configSlice.actions;

export default configSlice.reducer;
