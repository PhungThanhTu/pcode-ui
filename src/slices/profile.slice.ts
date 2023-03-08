import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '@/types/auth.type';

export const initialState: any = {
    profile: undefined
};

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        fetchProfile: () => { },
        updateProfile: (state, { payload }: PayloadAction<UserProfile>) => { }
    }
});

export const { fetchProfile, updateProfile } = profileSlice.actions;

export default profileSlice.reducer;
