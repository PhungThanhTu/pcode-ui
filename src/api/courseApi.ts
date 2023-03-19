import { AxiosResponse } from 'axios';
import protectedApi from './protectedApi';
import { Course, CreateCourse, CreateCourseResponse } from '@/types/course.type';

const courseApi = {
	getAllCourse: async () => {
		const result: AxiosResponse<Course[]> = await protectedApi.get('/course');
		return result;
	},
	createCourse: async (body: CreateCourse) => {
		const result: AxiosResponse<CreateCourseResponse> = await protectedApi.post('/course', body);
		return result;
	},
	renameCourse: async (body: Course) => {
		const result: any = await protectedApi.put(`/course/${body.id}`, body.title);
		return result;
	}
};

export default courseApi;
