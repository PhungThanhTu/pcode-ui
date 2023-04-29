import { RootState } from '@/redux/store';

export const getCourses = (state: RootState) => state.courses;
export const getCourse = (state: RootState) => state.course;