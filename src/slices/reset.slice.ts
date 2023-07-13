import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResetPasswordRequest, ResetState, UserProfile } from '@/types/auth.type';
import { stat } from 'fs/promises';


const initialState: ResetState = {
    loading: false,
    error: undefined,
    success: false
};

const resetSlice = createSlice({
    name: 'reset',
    initialState: initialState,
    reducers: {

        resetPassword: (state, { payload }: PayloadAction<ResetPasswordRequest>) => {
            state.loading = true;
            state.error = undefined;

        },
        resetPasswordSuccess: (state) => {
            state.loading = false;
            state.success = true;
            state.error = undefined;
        },
        resetPasswordError: (state, { payload }: PayloadAction<string>) => {
            state.loading = false;
            state.error = payload;
            state.success = false;
        },
        resetState:(state) =>{
            state.success =false
            state.error= undefined
            state.loading = false
        }
      

    }
});

export const { resetPassword, resetPasswordError, resetPasswordSuccess,resetState } = resetSlice.actions;

export default resetSlice.reducer;
