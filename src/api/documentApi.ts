import { AxiosResponse } from 'axios';
import protectedApi from './protectedApi';
import { Course, CreateCourseRequest, CreateCourseResponse } from '@/types/course.type';

const documentApi = {
	getAllCourses: async () => {
		const result: AxiosResponse<Course[]> = await protectedApi.get('/course');
		return result;
	},
	getCourse: async (code: string) => {
		const result: AxiosResponse<Course> = await protectedApi.get(`/course/info/${code}`);
		return result;
	},
	joinCourse: async (code: string) => {
		const result: any = await protectedApi.post(`/course/join/${code}`);
		return result;
	},
	createDocument: async (body: CreateCourseRequest) => {
		const result: AxiosResponse<CreateCourseResponse> = await protectedApi.post('/course', body);
		return result;
	},
	renameCourse: async (body: Course) => {
		const result: any = await protectedApi.put(`/course/${body.id}`, body.title);
		return result;
	}
};

export default documentApi;
