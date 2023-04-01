import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Course, CourseState, CreateCourse } from '@/types/course.type';

export const initialState: CourseState = {
	courses: undefined,
	loading: false
};

const courseSlice = createSlice({
	name: 'course',
	initialState: initialState,
	reducers: {
		fetchCourse: (state) => {
			state.loading = true;
		},
		createCourse: (state, { payload }: PayloadAction<CreateCourse>) => {},
		renameCourse: (state, { payload }: PayloadAction<Course>) => {},
		fetchCourseSuccess: (state, { payload }: PayloadAction<Course[]>) => {
			state.courses = payload;
			state.loading = false;
		},
		fetchCourseError: (state, { payload }: PayloadAction<Course[]>) => {
			state.courses = undefined;
			state.loading = false;
		}
	}
});

export const { fetchCourse, createCourse, renameCourse, fetchCourseSuccess, fetchCourseError } = courseSlice.actions;

export default courseSlice.reducer;
