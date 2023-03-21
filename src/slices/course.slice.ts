import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Course, CourseState, CreateCourse } from '@/types/course.type';

export const initialState: CourseState = {
	courses: undefined
};

const courseSlice = createSlice({
	name: 'course',
	initialState: initialState,
	reducers: {
		fetchCourse: () => {},
		createCourse: (state, { payload }: PayloadAction<CreateCourse>) => {},
		renameCourse: (state, { payload }: PayloadAction<Course>) => {},
		fetchCourseSuccess: (state, { payload }: PayloadAction<Course[]>) => {
			state.courses = payload;
		}
	}
});

export const { fetchCourse, createCourse, renameCourse, fetchCourseSuccess } = courseSlice.actions;

export default courseSlice.reducer;
