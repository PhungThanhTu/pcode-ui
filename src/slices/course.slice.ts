import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	Course,
	CourseScore,
	CoursesState,
	CourseState,
	CreateCourseRequest,
	CreateCourseResponse,
	GetCourseByIdResponse,
	JoinCourse
} from '@/types/course.type';
import { GetSingleSubmissionResponse, SubmissionActionRequest } from '@/types/document.type';


const initialCoursesState: CoursesState = {
	courses: null,
	loading: false
};
const initialCourseState: CourseState = {
	course: null,
	courseScore: null,
	courseDocumentSubmission: 0,
	loading: false
};
const coursesSlice = createSlice({
	name: 'course',
	initialState: initialCoursesState,
	reducers: {
		fetchCourses: (state) => {
			state.courses = undefined
			state.loading = true;
		},
		createCourse: (state, { payload }: PayloadAction<CreateCourseRequest>) => { },
		renameCourse: (state, { payload }: PayloadAction<Course>) => { },
		joinCourse: (state, { payload }: PayloadAction<JoinCourse>) => { },
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
			state.course = undefined;
		},
		fetchCourseByIdSuccess: (state, { payload }: PayloadAction<GetCourseByIdResponse>) => {
			state.course = payload;
			state.loading = false;
		},
		fetchCourseByIdError: (state) => {
			state.course = null;
			state.loading = false;
		},
		fetchCourseScoreById: (state, { payload }: PayloadAction<{ courseId: string }>) => {
			state.courseScore = null;
		},
		fetchCourseScoreByIdSuccess: (state, { payload }: PayloadAction<Array<CourseScore>>) => {
			state.courseScore = payload;
		},
		fetchCourseScoreByIdError: (state) => {
			state.courseScore = undefined;
		},
		fetchDocumentSubmission: (state, { payload }: PayloadAction<{ documentId: string }>) => {
			state.courseDocumentSubmission += 1
		},
		fetchDocumentSubmissionSuccess: (state, { payload }: PayloadAction<{ documentId: string, Submission: Array<GetSingleSubmissionResponse> }>) => {
			let index = state.course?.documents.findIndex(item => item.Id === payload.documentId)

			if (index !== -1 && index !== undefined) {

				state.course ? state.course.documents[index].Submission = payload.Submission : null
			}
		},
		fetchDocumentSubmissionError: (state) => {
			state.courseDocumentSubmission -= 1
		},
		changePublishDocumentSuccess: (state, { payload }: PayloadAction<{ documentId: string; status: number }>) => {
			const documentIndex = state.course?.documents.findIndex((item) => item.Id === payload.documentId);
			if (documentIndex !== -1 && documentIndex !== null && documentIndex !== undefined) {
				state.course ? (state.course.documents[documentIndex].IsPublic = payload.status === 1) : null;
			}
		}
	}
});
export const {
	fetchCourses,
	createCourse,
	renameCourse,
	joinCourse,
	fetchCoursesSuccess,
	fetchCoursesError,

} =
	coursesSlice.actions;
export const {

	fetchCourseById,
	fetchCourseByIdError,
	fetchCourseByIdSuccess,
	changePublishDocumentSuccess,
	fetchCourseScoreById,
	fetchCourseScoreByIdError,
	fetchCourseScoreByIdSuccess,
	fetchDocumentSubmission,
	fetchDocumentSubmissionSuccess,
	fetchDocumentSubmissionError
} = courseSlice.actions;

export const coursesReducer = coursesSlice.reducer;
export const courseReducer = courseSlice.reducer;
