import { configureStore } from '@reduxjs/toolkit';
import codeReducer from './code.reducer';

export const store = configureStore({
	reducer: {
		code: codeReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
