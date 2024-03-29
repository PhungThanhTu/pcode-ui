import { Document } from './document.type';

// State and Variable interface
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

export interface CourseScore {
	UserId: string;
	Username: string;
	FullName: string;
	Email: string;
	Score: number;
	Details: Array<any>;
}
export interface CourseScoreDetail {
	Id: string;
	Score: number;
	ScoreWeight: number;
	Title: string;
	UserId: string;
}

export interface JoinCourse {
	Code: string;
	Navigate: Function;
}
export interface CoursesState {
	courses?: Array<Course> | null;
	loading: boolean;
}
export interface CourseState {
	course?: GetCourseByIdResponse | null;
	courseScore?: Array<CourseScore> | null;
	courseDocumentSubmission: number;
	loading: boolean;
}

// API interface
export interface GetCourseByIdResponse {
	id: string;
	title: string;
	courseSubject: string;
	courseTheme: string;
	documents: Array<Document>;
}
export interface RenameCourseRequest {
	id: string;
	title: string;
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
