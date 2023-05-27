import { AxiosResponse } from 'axios';
import protectedApi from './protectedApi';
import {
	CreateDocumentRequest,
	CreateDocumentResponse,
	CreateDocumentContentRequest,
	GetDocumentByIdResponse,
	UpdateDocumentRequest,
	CreateExerciseRequest,
	GetSampleSourceCodeResponse,
	UpdateExerciseRequest,
	UpdateSampleSourceCodeResponse,
	UpdateSampleSourceCodeRequest,
	GetSingleTestCaseResponse,
	CreateTestCaseResponse,
	CreateTestCaseRequest,
	UpdateTestCaseRequest,
	CreateSubmissionRequest,
	Submission,
	SubmissionActionRequest,
	GetSingleSubmissionResponse
} from '@/types/document.type';

const documentApi = {
	getDocumentById: async (id: string) => {
		const result: AxiosResponse<GetDocumentByIdResponse> = await protectedApi.get(`/document/${id}`);
		return result;
	},
	createDocument: async (body: CreateDocumentRequest) => {
		const result: AxiosResponse<CreateDocumentResponse> = await protectedApi.post('/document', body);
		return result;
	},
	createDocumentContent: async (body: CreateDocumentContentRequest) => {
		if (body.contentTypeId === '1') {
			var bodyFormData = new FormData();
			bodyFormData.append('file', body.content);
			bodyFormData.append('contentTypeId', '1');

			const result: AxiosResponse<any> = await protectedApi.post(
				`/document/${body.documentId}/content`,
				bodyFormData,
				{ headers: { 'Content-Type': 'multipart/form-data' } }
			);
			return result;
		} else {
			var tmp = {
				content: body.content,
				contentTypeId: 0
			};
			const result: AxiosResponse<any> = await protectedApi.post(`/document/${body.documentId}/content`, tmp);
			return result;
		}
	},
	changePublishDocument: async (documentId: string, status: number) => {
		const result: AxiosResponse<any> = await protectedApi.post(`/document/${documentId}/publish?publish=${status}`);
		return result;
	},
	updateDocument: async (id: string, body: UpdateDocumentRequest) => {
		const result: AxiosResponse<any> = await protectedApi.patch(`/document/${id}`, body);
		return result;
	},
	deleteDocument: async (id: string) => {
		const result: AxiosResponse<any> = await protectedApi.delete(`/document/${id}`);
		return result;
	},
	deleteDocumentContent: async (id: string) => {
		const result: AxiosResponse<any> = await protectedApi.delete(`/document/${id}/content`);
		return result;
	},
	getMedia: async (id: string) => {
		const result: AxiosResponse<any> = await protectedApi.get(`/media/${id}`, { responseType: 'blob' });
		return result;
	},
	createExercise: async (documentId: string, body: CreateExerciseRequest) => {
		const result: AxiosResponse<any> = await protectedApi.post(`/document/${documentId}/exercise`, body);
		return result;
	},
	updateExercise: async (documentId: string, body: UpdateExerciseRequest) => {
		const result: AxiosResponse<any> = await protectedApi.patch(`/document/${documentId}/exercise`, body);
		return result;
	},
	getExercise: async (documentId: string) => {
		const result: AxiosResponse<any> = await protectedApi.get(`/document/${documentId}/exercise`);
		return result;
	},
	getSampleSourceCode: async (documentId: string, type: number) => {
		const result: AxiosResponse<GetSampleSourceCodeResponse> = await protectedApi.get(
			`/document/${documentId}/exercise/sample?programmingLanguage=${type}`
		);
		return result;
	},
	updateSampleSourceCode: async (documentId: string, type: number, sampleSourceCode: string) => {
		const result: AxiosResponse<UpdateSampleSourceCodeResponse> = await protectedApi.post(
			`/document/${documentId}/exercise/sample?programmingLanguage=${type}`,
			{ sampleSourceCode: sampleSourceCode }
		);
		return result;
	},
	createTestCase: async (documentId: string, body: CreateTestCaseRequest) => {
		const result: AxiosResponse<CreateTestCaseResponse> = await protectedApi.post(
			`/document/${documentId}/testcase`,
			body
		);
		return result;
	},
	getAllTestCases: async (documentId: string) => {
		const result: AxiosResponse<Array<GetSingleTestCaseResponse>> = await protectedApi.get(
			`/document/${documentId}/testcase`
		);
		return result;
	},
	getSingleTestCase: async (documentId: string, testCaseId: number) => {
		const result: AxiosResponse<GetSingleTestCaseResponse> = await protectedApi.get(
			`/document/${documentId}/testcase/${testCaseId}`
		);
		return result;
	},
	updateTestCase: async (documentId: string, testCaseId: number, body: UpdateTestCaseRequest) => {
		const result: AxiosResponse<any> = await protectedApi.patch(
			`/document/${documentId}/testcase/${testCaseId}`,
			body
		);
		return result;
	},
	swapTestCase: async (documentId: string, order1: number, order2: number) => {
		const result: AxiosResponse<any> = await protectedApi.post(
			`/document/${documentId}/testcase/swap?order1=${order1}&order2=${order2}`
		);
		return result;
	},
	deleteTestCase: async (documentId: string, testCaseId: number) => {
		const result: AxiosResponse<any> = await protectedApi.delete(`/document/${documentId}/testcase/${testCaseId}`);
		return result;
	},
	createSubmission: async (documentId: string, body: CreateSubmissionRequest) => {
		let temp = {
			sourceCode: body.sourceCode
		};
		const result: AxiosResponse<CreateTestCaseResponse> = await protectedApi.post(
			`/document/${documentId}/submission/?programmingLanguage=${body.programmingLanguageId}`,
			temp
		);
		return result;
	},
	getAllSubmissions: async (documentId: string) => {
		const result: AxiosResponse<Array<Submission>> = await protectedApi.get(`/document/${documentId}/submission`);
		return result;
	},
	getSingleSubmission: async (Ids: SubmissionActionRequest) => {
		const result: AxiosResponse<GetSingleSubmissionResponse> = await protectedApi.get(
			`/document/${Ids.documentId}/submission/${Ids.submissionId}`
		);
		return result;
	},
	markSubmission: async (Ids: SubmissionActionRequest) => {
		const result: AxiosResponse<any> = await protectedApi.post(
			`/document/${Ids.documentId}/submission/${Ids.submissionId}/mark`
		);
		return result;
	},
	deleteSubmission: async (Ids: SubmissionActionRequest) => {
		const result: AxiosResponse<any> = await protectedApi.delete(
			`/document/${Ids.documentId}/submission/${Ids.documentId}`
		);
		return result;
	}
};

export default documentApi;
