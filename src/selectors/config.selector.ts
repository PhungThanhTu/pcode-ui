import { RootState } from '@/redux/store';

export const getJudgers = (state: RootState) => state.config.judgers;
export const getContentTypes = (state: RootState) => state.config.contentTypes;
export const getProgrammingLanguages = (state: RootState) => state.config.programmingLanguages;
export const getHistory = (state: RootState) => state.config.history;