export interface RegisterRequest {
	username: string;
	password: string;
	email: string;
	fullName: string;
}

export interface RegisterState {
	loading: boolean;
	error?: string;
	success: boolean;
}
