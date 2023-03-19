export interface Course {
    id: String,
    CreatorId: String,
    CreatorName: String,
    title: String,
    Code: String,
    PlpRole: Number
}
export interface CreateCourse {
    title: String,
    theme?: String | null
}
export interface CreateCourseResponse {
    courseId: String,
    invitationId: String
}