import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import authSlice from '../slices/auth.slice';
import registerSlice from '../slices/register.slice';
import profileSlice from '@/slices/profile.slice';
import snackbarSlice from '@/slices/snackbar.slice';
import courseSlice from '@/slices/course.slice';
import loadingSlice from '@/slices/loading.slice';

import { watchRegister } from '../sagas/register.saga';
import { watchProfile } from '@/sagas/profile.sagas';
import { watchLogin } from '../sagas/auth.sagas';
import { watchCourse } from '@/sagas/course.sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer: {
		auth: authSlice,
		register: registerSlice,
		profile: profileSlice,
		snackbar: snackbarSlice,
		courses: courseSlice,
		loading: loadingSlice
	},
	middleware: [sagaMiddleware]
});

sagaMiddleware.run(watchLogin);
sagaMiddleware.run(watchRegister);
sagaMiddleware.run(watchProfile);
sagaMiddleware.run(watchCourse);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
