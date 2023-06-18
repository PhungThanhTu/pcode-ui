import { RootState } from '@/redux/store';

export const getAuth = (state: RootState) => state.auth;
export const getProfile = (state: RootState) => state.auth.profile;

