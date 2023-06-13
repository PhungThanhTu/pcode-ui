import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';

export interface RouterState {
	location: string;
}

export interface NavigationActionPayload {
	destination: string;
	navigate: NavigateFunction;
}

const initialState: RouterState = {
	location: '/'
};

const routerSlice: any = createSlice({
	name: 'router',
	initialState,
	reducers: {
		navigateTo: (state, { payload }: PayloadAction<NavigationActionPayload>) => {}
	}
});

export const { navigateTo } = routerSlice.actions;

export default routerSlice.reducer;
