import { Snackbar } from '@/types/utility.type';
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
		setSnackbar: (state, { payload }: PayloadAction<Snackbar>) => {
			state.message = payload.message;
			state.type = payload.type;
			state.state = true;
		},
		removeSnackbar: (state) => {
			state.state = false;
		}
	}
});
export const { setSnackbar, removeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
