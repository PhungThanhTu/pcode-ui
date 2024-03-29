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
export interface ResetState {
	loading: boolean;
	error?: string;
	success: boolean;
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
	id: string;
}

export interface PasswordChangeRequest {
	password: string;
	newPassword: string;
}

export interface ResetPasswordRequest {
	password: string;
	token: string;
}
