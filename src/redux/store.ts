import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { watchLogin } from '../sagas/auth.sagas';
import authSlice from '../slices/auth.slice';
import registerSlice from '../slices/register.slice';
import { watchRegister } from '../sagas/register.saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer: {
		auth: authSlice,
		register: registerSlice
	},
	middleware: [sagaMiddleware]
});

sagaMiddleware.run(watchLogin);
sagaMiddleware.run(watchRegister);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
