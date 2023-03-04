export interface AuthenticationTokens {
	refreshToken: string;
	token: string;
}

export interface AuthState {
	loading: boolean;
	authTokens?: AuthenticationTokens;
	error?: string;
	profile?: UserProfile | null;
}

export interface UserCredentials {
	username: string;
	password: string;
}

export interface UserProfile {
	username: string;
	fullName: string;
	email: string;
	avatar?: string;
}
