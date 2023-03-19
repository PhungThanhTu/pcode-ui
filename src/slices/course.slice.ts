import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Course, CreateCourse } from '@/types/course.type';

export const initialState: any = {
	course: undefined
};

const courseSlice = createSlice({
	name: 'course',
	initialState: initialState,
	reducers: {
		fetchCourse: () => {},
		createCourse: (state, { payload }: PayloadAction<CreateCourse>) => {},
		renameCourse: (state, { payload }: PayloadAction<Course>) => {}
	}
});

export const { fetchCourse, createCourse, renameCourse } = courseSlice.actions;

export default courseSlice.reducer;
