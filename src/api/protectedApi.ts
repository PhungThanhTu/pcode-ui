import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { AuthenticationTokens } from '../types';
import { TokenService } from '../utils/tokenService';
import authApi from './authApi';

const baseUrl = import.meta.env.VITE_BACKEND_ENDPOINT;

const protectedApi = axios.create({
	baseURL: baseUrl
});

const onRequestSuccess = (config: InternalAxiosRequestConfig) => {
	config.headers.Authorization = TokenService.getToken();
	return config;
};

const onResponseSuccess = (response: AxiosResponse) => {
	return response;
};

const onResponseError = async (error: AxiosError) => {
	const errStatusCode = error.response?.status;
	if (errStatusCode !== 401 || error?.config?.url?.includes('refresh') || error?.config?.url?.includes('login')) {
		const errMessage = error.response?.data || error?.response || error;
		return Promise.reject(errMessage);
	}
	return refreshToken(error, authApi.logout);
};

const refreshToken = async (error: AxiosError, logout: Function) => {
	const originalConfig = error.config as AxiosRequestConfig;
	const storedRefreshToken = TokenService.getRefreshToken();
	const storedAccessToken = TokenService.getToken();
	if (!storedRefreshToken || !storedAccessToken) {
		logout();
		return Promise.reject(error);
	}
	try {
		const result: AxiosResponse<AuthenticationTokens> = await authApi.refresh({
			refreshToken: storedRefreshToken,
			token: storedAccessToken
		});

		TokenService.setRefreshToken(result.data.refreshToken);
		TokenService.setToken(result.data.token);

		return protectedApi(originalConfig);
	} catch {
		logout();
		return Promise.reject(error);
	}
};

protectedApi.interceptors.request.use(onRequestSuccess);
protectedApi.interceptors.response.use(onResponseSuccess, onResponseError);

export default protectedApi;
