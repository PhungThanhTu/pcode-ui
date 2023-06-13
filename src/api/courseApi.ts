import { AxiosResponse } from 'axios';
import protectedApi from './protectedApi';
import {
	Course,
	CourseScore,
	CreateCourseRequest,
	CreateCourseResponse,
	GetCourseByIdResponse,
	RenameCourseRequest
} from '@/types/course.type';

const courseApi = {
	getAllCourses: async () => {
		const result: AxiosResponse<Course[]> = await protectedApi.get('/course');
		return result;
	},
	getCourseByCode: async (code: string) => {
		const result: AxiosResponse<Course> = await protectedApi.get(`/course/info/${code}`);
		return result;
	},
	getCourseById: async (courseId: string) => {
		const result: AxiosResponse<GetCourseByIdResponse> = await protectedApi.get(`/course/${courseId}`);
		return result;
	},
	getCourseScoreById: async (courseId: string) => {
		const result: AxiosResponse<Array<CourseScore>> = await protectedApi.get(`/course/${courseId}/score`);
		return result;
	},

	joinCourse: async (courseCode: string) => {
		const result: any = await protectedApi.post(`/course/join/${courseCode}`);
		return result;
	},
	createCourse: async (request: CreateCourseRequest) => {
		const result: AxiosResponse<CreateCourseResponse> = await protectedApi.post('/course', request);
		return result;
	},
	renameCourse: async (request: RenameCourseRequest) => {
		const result: any = await protectedApi.put(`/course/${request.id}`, request.title);
		return result;
	}
};

export default courseApi;
