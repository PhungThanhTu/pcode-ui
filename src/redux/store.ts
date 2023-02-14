import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { watchLogin } from '../sagas/auth.sagas';
import authSlice from '../slices/auth.slice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer: {
		auth: authSlice
	},
	middleware: [sagaMiddleware]
});

sagaMiddleware.run(watchLogin);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
