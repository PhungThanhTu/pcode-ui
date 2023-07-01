import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConfigState, ContentType, Judger, ProgrammingLanguage } from '@/types/config.type';

const initialState: ConfigState = {
    judgers: null,
    programmingLanguages: null,
    contentTypes: null,
    history: null
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
        fetchJudgers: (state) => {
            state.judgers = undefined
        },
        fetchJudgersError: (state) => {
            state.judgers = null
        },
        fetchContentTypes: (state) => {
            state.contentTypes = undefined
        },
        fetchContentTypesError: (state) => {
            state.contentTypes = null
        },
        fetchContentTypesSuccess: (state, { payload }: PayloadAction<Array<ContentType>>) => {
            state.contentTypes = payload
        },
        fetchProgrammingLanguages: (state) => {
            state.programmingLanguages = undefined
        },
        fetchProgrammingLanguagesError: (state) => {
            state.programmingLanguages = null
        },
        fetchProgrammingLanguagesSuccess: (state, { payload }: PayloadAction<Array<ProgrammingLanguage>>) => {
            state.programmingLanguages = payload
        },
        setHistory(state, { payload }: PayloadAction<{ url: string }>) {
            state.history = payload.url
        }
    }
});

export const {
    fetchAllConfigs, fetchAllConfigsSuccess, fetchContentTypes,
    fetchContentTypesSuccess, fetchJudgers, fetchJudgersSuccess, fetchProgrammingLanguages,
    fetchProgrammingLanguagesSuccess,
    fetchContentTypesError,
    fetchJudgersError,
    fetchProgrammingLanguagesError,
    setHistory
} = configSlice.actions;

export default configSlice.reducer;
