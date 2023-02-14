import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../slices/auth.slice';

export const mockedStore = configureStore({
	reducer: {
		auth: authSlice
	}
});

export type RootState = ReturnType<typeof mockedStore.getState>;

export type AppDispatch = typeof mockedStore.dispatch;
