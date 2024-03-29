import { RootState } from '@/redux/store';

export const getDocument = (state: RootState) => state.document;
export const getDocumentExercise = (state: RootState) => state.document.documentExercise;
export const getDocumentTestCases = (state: RootState) => state.document.documentTestCases;
export const getSampleSourceCode = (state: RootState) => state.document.sampleSourceCode;
export const getDocumentSubssions = (state: RootState) => state.document.documentSubmissions;
export const getDocumentSingleSubssion = (state: RootState) => state.document.documentSingleSubmission;
export const getDocumentSubmissionsManage = (state: RootState) => state.document.documentSubmissionsManage;
