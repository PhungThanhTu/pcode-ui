import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	Course,
	CoursesState,
	CourseState,
	CreateCourseRequest,
	CreateCourseResponse,
	GetCourseByIdResponse,
	JoinCourse
} from '@/types/course.type';

export const initialCoursesState: CoursesState = {
	courses: undefined,
	loading: false
};
export const initialCourseState: CourseState = {
	course: undefined,
	loading: false
};
const coursesSlice = createSlice({
	name: 'course',
	initialState: initialCoursesState,
	reducers: {
		fetchCourses: (state) => {
			state.loading = true;
		},
		createCourse: (state, { payload }: PayloadAction<CreateCourseRequest>) => {},
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
		fetchCoursesSuccess: (state, { payload }: PayloadAction<Course[]>) => {
			state.courses = payload;
			state.loading = false;
		},
		fetchCoursesError: (state) => {
			state.courses = null;
			state.loading = false;
		}
	}
});
const courseSlice = createSlice({
	name: 'course',
	initialState: initialCourseState,
	reducers: {
		fetchCourseById: (state, { payload }: PayloadAction<{ id: string }>) => {
			state.loading = true;
		},
		fetchCourseByIdSuccess: (state, { payload }: PayloadAction<GetCourseByIdResponse>) => {
			state.course = payload;
			state.loading = false;
		},
		fetchCourseByIdError: (state) => {
			state.course = null;
			state.loading = false;
		}
	}
});
export const { fetchCourses, createCourse, renameCourse, joinCourse, fetchCoursesSuccess, fetchCoursesError } =
	coursesSlice.actions;
export const { fetchCourseById, fetchCourseByIdError, fetchCourseByIdSuccess } = courseSlice.actions;

export const coursesReducer = coursesSlice.reducer;
export const courseReducer = courseSlice.reducer;
