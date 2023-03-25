export interface Course {
	id: string;
	CreatorId: string;
	CreatorName: string;
	title: string;
	Code: string;
	PlpRole: Number;
}
export interface CreateCourse {
	title: string;
	theme?: string | null | undefined;
	subject?: string | null;
}
export interface CreateCourseResponse {
	courseId: string;
	invitationId: string;
}
export interface CourseState {
	courses?: Array<Course>;
}
