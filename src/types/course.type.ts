export interface Course {
	id: string;
	CreatorId: string;
	CreatorName: string;
	title: string;
	Code: string;
	PlpRole: Number;
	courseTheme: string;
	courseSubject: string;
}
export interface JoinCourse {
	Code: string;
}
export interface CreateCourseRequest {
	title: string;
	theme?: string | null | undefined;
	subject?: string | null;
}
export interface CreateCourseResponse {
	id: string;
	CreateId: string;
	Code: string;
	title: string;
	courseSubject: string;
	courseTheme: string;
	CreatorName: string;
}
export interface CourseState {
	courses?: Array<Course>;
	loading: boolean;
}
