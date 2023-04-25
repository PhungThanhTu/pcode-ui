import { AxiosResponse } from 'axios';
import protectedApi from './protectedApi';
import {
	CreateDocumentRequest,
	CreateDocumentResponse,
	CreateDocumentContentRequest,
	GetDocumentByIdResponse,
	UpdateDocumentRequest
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
	createDocumentContent: async (id: string, body: CreateDocumentContentRequest) => {
		const result: AxiosResponse<any> = await protectedApi.post(`/document/${id}/content`, body);
		return result;
	},
	changePublishDocument: async (id: string, status: number) => {
		const result: AxiosResponse<any> = await protectedApi.post(`/document/${id}/publish?publish=${status}`);
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
	}
};

export default documentApi;
