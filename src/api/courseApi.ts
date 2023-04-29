import { AxiosResponse } from 'axios';
import protectedApi from './protectedApi';
import { Course, CreateCourseRequest, CreateCourseResponse, GetCourseByIdResponse } from '@/types/course.type';

const courseApi = {
	getAllCourses: async () => {
		const result: AxiosResponse<Course[]> = await protectedApi.get('/course');
		return result;
	},
	getCourseByCode: async (code: string) => {
		const result: AxiosResponse<Course> = await protectedApi.get(`/course/info/${code}`);
		return result;
	},
	getCourseById: async (id: string) => {
		const result: AxiosResponse<GetCourseByIdResponse> = await protectedApi.get(`/course/${id}`);
		return result;
	},

	joinCourse: async (code: string) => {
		const result: any = await protectedApi.post(`/course/join/${code}`);
		return result;
	},
	createCourse: async (body: CreateCourseRequest) => {
		const result: AxiosResponse<CreateCourseResponse> = await protectedApi.post('/course', body);
		return result;
	},
	renameCourse: async (body: Course) => {
		const result: any = await protectedApi.put(`/course/${body.id}`, body.title);
		return result;
	}
};

export default courseApi;
