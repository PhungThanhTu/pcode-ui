import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegisterRequest, RegisterState } from 'types/register.type';

export const initialState: RegisterState = {
	loading: false,
	success: false,
	error: undefined
};

const registerSlice = createSlice({
	name: 'register',
	initialState: initialState,
	reducers: {
		requestRegister: (state, { payload }: PayloadAction<RegisterRequest>) => {
			state.loading = true;
		},
		registerSuccess: (state) => {
			state.loading = false;
			state.success = true;
		},
		registerFailed: (state, { payload }: PayloadAction<string>) => {
			state.loading = false;
			state.success = false;
			state.error = payload;
		},
		resetRegisterState: (state) => {
			state.loading = false;
			state.success = false;
			state.error = undefined;
		}
	}
});

export const { requestRegister, registerSuccess, registerFailed, resetRegisterState } = registerSlice.actions;

export default registerSlice.reducer;
