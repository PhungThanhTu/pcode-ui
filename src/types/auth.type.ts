export interface AuthenticationTokens {
	refreshToken: string;
	token: string;
}

export interface AuthState {
	loading: boolean;
	authTokens?: AuthenticationTokens;
	error?: string;
	profile?: UserProfile;
}

export interface UserCredentials {
	username: string;
	password: string;
}

export interface RegisterRequest {
	username: string;
	password: string;
	email: string;
	fullName: string;
}

export interface UserProfile {
	username: string;
	fullName: string;
	email: string;
	avatar?: string;
}
