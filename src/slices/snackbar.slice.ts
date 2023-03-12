import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
	message: '',
	type: '',
	state: false
};

export const snackbarSlice = createSlice({
	name: 'snackbar',
	initialState,
	reducers: {
		setSnackbar: (state, action) => {
			state.message = action.payload.message;
			state.type = action.payload.type;
			state.state = true;
		},
		removeSnackbar: (state, { payload }: PayloadAction<boolean>) => {
			state.state = false;
		}
	}
});
export const { setSnackbar, removeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
