import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '@/types/auth.type';
import { AuthState, UserCredentials } from '../types';
import { LocalStorageService } from '@/services/localStorageService';

const initialState: AuthState = {
	loading: false,
	error: undefined,
	profile: undefined
};

const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		fetchProfile: () => {},
		login: (state, { payload }: PayloadAction<UserCredentials>) => {
			state.loading = true;
			
		},
		loginSuccess: (state, { payload }: PayloadAction<UserProfile>) => {
			state.loading = false;
			state.error = undefined;
			state.profile = payload;
		},
		loginError: (state, { payload }: PayloadAction<string>) => {
			state.loading = false;
			state.error = payload;
		},
		logout: (state) => {
			state.loading = true;
			state.error = undefined;
			state.profile = null;
			LocalStorageService.clearCodeCache();
		},
		logoutSuccess: (state) => {
			state.loading = false;
			state.authTokens = undefined;
			state.error = '';
		}
	}
});

export const { login, loginSuccess, loginError, logout, logoutSuccess, fetchProfile } = authSlice.actions;

export default authSlice.reducer;
