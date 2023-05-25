import { Loading } from '@/types/utility.type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: false
};

export const loadingSlice = createSlice({
	name: 'loading',
	initialState,
	reducers: {
		setLoading: (state, { payload }: PayloadAction<Loading>) => {
			state.isLoading = payload.isLoading;
		}
	}
});
export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
