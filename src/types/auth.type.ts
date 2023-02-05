export interface User {
	username: string;
	accessToken: string;
}

export interface AuthState {
	loading: boolean;
	currentUser?: User;
	isAuthenticated: boolean;
	error?: string;
}
