import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../types';

export const initialState: AuthState = {
	currentUser: undefined,
	loading: false,
	isAuthenticated: false
};

const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		login: (state) => {
			state.loading = true;
		},
		loginSuccess: (state, { payload }: PayloadAction<User>) => {
			state.loading = false;
			state.currentUser = payload;
			state.isAuthenticated = true;
		},
		loginError: (state, { payload }: PayloadAction<string>) => {
			state.loading = false;
			state.isAuthenticated = false;
			state.error = payload;
		},
		logout: (state) => {
			state.loading = true;
		},
		logoutSuccess: (state) => {
			state.isAuthenticated = false;
			state.loading = false;
			state.currentUser = undefined;
			state.error = '';
		}
	}
});

export default authSlice;
