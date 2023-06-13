import { DocumentTabState } from '@/types/tab.type';
import { TabElement } from '@/types/utility.type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialDocumentTabState: DocumentTabState = {
	Tabs: [],
	TabIndex: '1',
	Tab: null
};
const initialCourseTabState: DocumentTabState = {
	Tabs: [],
	TabIndex: '1',
	Tab: null
};

const documentTabSlice = createSlice({
	name: 'documentTabSlice',
	initialState: initialDocumentTabState,
	reducers: {
		setDocumentTabs: (state, { payload }: PayloadAction<Array<TabElement>>) => {
			state.Tabs = payload;
		},
		setDocumentTabIndex: (state, { payload }: PayloadAction<string>) => {
			state.TabIndex = payload;
		},
		setDocumentTab: (state, { payload }: PayloadAction<TabElement>) => {
			state.Tab = payload;
		}
	}
});
const courseTabSlice = createSlice({
	name: 'courseTabSlice',
	initialState: initialCourseTabState,
	reducers: {
		setCourseTabs: (state, { payload }: PayloadAction<Array<TabElement>>) => {
			state.Tabs = payload;
		},
		setCourseTabIndex: (state, { payload }: PayloadAction<string>) => {
			state.TabIndex = payload;
		},
		setCourseTab: (state, { payload }: PayloadAction<TabElement>) => {
			state.Tab = payload;
		}
	}
});

export const { setDocumentTab, setDocumentTabIndex, setDocumentTabs } = documentTabSlice.actions;

export const documentTabReducer = documentTabSlice.reducer;

export const { setCourseTab, setCourseTabIndex, setCourseTabs } = courseTabSlice.actions;

export const courseTabReducer = courseTabSlice.reducer;
