import { RootState } from '@/redux/store';

export const getDocumentTabs = (state: RootState) => state.documentTab.Tabs;
export const getDocumentTabIndex = (state: RootState) => state.documentTab.TabIndex;
export const getDocumentTab = (state: RootState) => state.documentTab.Tab;

export const getCourseTabs = (state: RootState) => state.courseTab.Tabs;
export const getCourseTabIndex = (state: RootState) => state.courseTab.TabIndex;
export const getCourseTab = (state: RootState) => state.courseTab.Tab;
