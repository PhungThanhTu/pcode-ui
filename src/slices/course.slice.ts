import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Course, CourseState, CreateCourse, CreateCourseResponse, JoinCourse } from '@/types/course.type';

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
		joinCourse: (state, { payload }: PayloadAction<JoinCourse>) => {},
		createCourseSuccess: (state, { payload }: PayloadAction<CreateCourseResponse>) => {
			let Course: Course = {
				id: payload.id,
				CreatorId: payload.CreateId,
				Code: payload.Code,
				CreatorName: '',
				PlpRole: 1,
				courseTheme: payload.courseTheme,
				courseSubject: payload.courseSubject,
				title: payload.title
			};
			state.courses?.push(Course);
		},
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

export const { fetchCourse, createCourse, renameCourse, joinCourse, fetchCourseSuccess, fetchCourseError } =
	courseSlice.actions;

export default courseSlice.reducer;
