export interface Course {
	id: string;
	CreatorId: string;
	CreatorName: string;
	title: string;
	Code: string;
	PlpRole: Number;
	theme: string;
}
export interface CreateCourse {
	title: string;
	theme?: string | null | undefined;
	subject?: string | null;
}
export interface CreateCourseResponse {
	id: string;
	CreateId: string;
	Code: string;
	title: string;
	subject: string;
	theme: string;
}
export interface CourseState {
	courses?: Array<Course>;
	loading: boolean;
}
