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
	GetSingleSubmissionResponse,
	ScoreSubmissionRequest
} from '@/types/document.type';
import { contentTypeId } from '@/config';

const documentApi = {
	getDocumentById: async (id: string) => {
		const result: AxiosResponse<GetDocumentByIdResponse> = await protectedApi.get(`/document/${id}`);
		return result;
	},
	createDocument: async (request: CreateDocumentRequest) => {
		const result: AxiosResponse<CreateDocumentResponse> = await protectedApi.post('/document', request);
		return result;
	},
	createDocumentContent: async (request: CreateDocumentContentRequest) => {
		if (request.contentTypeId === contentTypeId.pdf) {

			let body = new FormData();
			body.append('file', request.content);
			body.append('contentTypeId', contentTypeId.pdf.toString());

			const result: AxiosResponse<any> = await protectedApi.post(
				`/document/${request.documentId}/content`,
				body,
				{ headers: { 'Content-Type': 'multipart/form-data' } }
			);
			return result;
		} else {
			let body = {
				content: request.content,
				contentTypeId: contentTypeId.markDown
			};
			const result: AxiosResponse<any> = await protectedApi.post(`/document/${request.documentId}/content`, body);
			return result;
		}
	},
	changePublishDocument: async (documentId: string, status: number) => {
		const result: AxiosResponse<any> = await protectedApi.post(`/document/${documentId}/publish?publish=${status}`);
		return result;
	},
	updateDocument: async (id: string, request: UpdateDocumentRequest) => {
		const result: AxiosResponse<any> = await protectedApi.patch(`/document/${id}`, request);
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
	createExercise: async (documentId: string, request: CreateExerciseRequest) => {
		const result: AxiosResponse<any> = await protectedApi.post(`/document/${documentId}/exercise`, request);
		return result;
	},
	updateExercise: async (documentId: string, request: UpdateExerciseRequest) => {
		const result: AxiosResponse<any> = await protectedApi.patch(`/document/${documentId}/exercise`, request);
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

		let body = {
			sampleSourceCode: sampleSourceCode
		}
		const result: AxiosResponse<UpdateSampleSourceCodeResponse> = await protectedApi.post(
			`/document/${documentId}/exercise/sample?programmingLanguage=${type}`,
			body
		);
		return result;
	},
	createTestCase: async (documentId: string, request: CreateTestCaseRequest) => {
		const result: AxiosResponse<CreateTestCaseResponse> = await protectedApi.post(
			`/document/${documentId}/testcase`,
			request
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
	updateTestCase: async (documentId: string, testCaseId: number, request: UpdateTestCaseRequest) => {

		const result: AxiosResponse<any> = await protectedApi.patch(
			`/document/${documentId}/testcase/${testCaseId}`,
			request
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
	createSubmission: async (documentId: string, request: CreateSubmissionRequest) => {
		let body = {
			sourceCode: request.sourceCode
		};
		const result: AxiosResponse<CreateTestCaseResponse> = await protectedApi.post(
			`/document/${documentId}/submission/?programmingLanguage=${request.programmingLanguageId}`,
			body
		);
		return result;
	},
	getAllSubmissions: async (documentId: string) => {
		const result: AxiosResponse<Array<Submission>> = await protectedApi.get(`/document/${documentId}/submission`);
		return result;
	},
	getAllSubmissionsManage: async (documentId: string) => {
		const result: AxiosResponse<Array<Submission>> = await protectedApi.get(`/document/${documentId}/submission/manage`);
		return result;
	},
	getSingleSubmission: async (request: SubmissionActionRequest) => {
		const result: AxiosResponse<GetSingleSubmissionResponse> = await protectedApi.get(
			`/document/${request.documentId}/submission/${request.submissionId}`
		);
		return result;
	},
	markSubmission: async (request: SubmissionActionRequest) => {
		const result: AxiosResponse<any> = await protectedApi.post(
			`/document/${request.documentId}/submission/${request.submissionId}/mark`
		);
		return result;
	},
	scoreSubmissionManage: async (request: ScoreSubmissionRequest) => {

		let body = {
			score: request.score
		}
		const result: AxiosResponse<any> = await protectedApi.post(
			`/document/${request.Ids.documentId}/submission/${request.Ids.submissionId}/score`,
			body
		);
		return result;
	},
	deleteSubmission: async (request: SubmissionActionRequest) => {
		const result: AxiosResponse<any> = await protectedApi.delete(
			`/document/${request.documentId}/submission/${request.documentId}`
		);
		return result;
	}
};

export default documentApi;
