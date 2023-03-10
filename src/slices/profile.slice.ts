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
        updateProfile: (state, { payload }: PayloadAction<UserProfile>) => { },
        changePassword: (state, any) => { }
    }
});

export const { fetchProfile, updateProfile, changePassword } = profileSlice.actions;

export default profileSlice.reducer;
