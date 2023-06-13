import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PasswordChangeRequest, UserProfile } from '@/types/auth.type';

const initialState: any = {
	profile: undefined
};

const profileSlice = createSlice({
	name: 'profile',
	initialState: initialState,
	reducers: {
		fetchProfile: () => {},
		updateProfile: (state, { payload }: PayloadAction<UserProfile>) => {},
		changePassword: (state, { payload }: PayloadAction<PasswordChangeRequest>) => {}
	}
});

export const { fetchProfile, updateProfile, changePassword } = profileSlice.actions;

export default profileSlice.reducer;
