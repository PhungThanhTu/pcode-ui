import { AxiosResponse } from 'axios';
import { RegisterRequest } from '../types/register.type';
import { AuthenticationTokens, UserCredentials, UserProfile } from '../types/auth.type';
import { TokenService } from '../utils/tokenService';
import protectedApi from './protectedApi';
import publicApi from './publicApi';

const API_PREFIX = '/auth';

const authApi = {
	login: async (credential: UserCredentials) => {
		const result = await publicApi.post<AuthenticationTokens>(API_PREFIX + '/login', credential);
		console.log('USER LOGIN');
		console.log(result.data);
		TokenService.setToken(result.data.token);
		TokenService.setRefreshToken(result.data.refreshToken);
		return result;
	},
	register: async (registerRequest: RegisterRequest) => {
		const result = await publicApi.post<RegisterRequest, any>(API_PREFIX + '/register', registerRequest);
		return result;
	},
	refresh: async (authenticationTokens: AuthenticationTokens) => {
		const result: AxiosResponse<AuthenticationTokens> = await publicApi.post<AuthenticationTokens>(
			API_PREFIX + '/refresh',
			authenticationTokens
		);
		return result;
	},
	logout: () => {
		return TokenService.clearTokens();
	},
	getProfile: async () => {
		const result: AxiosResponse<UserProfile> = await protectedApi.get('/profile');
		return result;
	}
};

export default authApi;
