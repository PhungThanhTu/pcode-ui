import TabLayout from '@/layouts/TabLayout';
import CourseTabHeader from '../CourseHeader';
import ListItems from '../../ListItems';
import CourseCodeBox from '../CourseCodeBox';

import { GetCourseByIdResponse } from '@/types/course.type';

interface GeneralProps {
	course: GetCourseByIdResponse;
	customizeButton: Function | null;
	code: string;
}
const General = (props: GeneralProps) => {
	const { course, customizeButton, code } = props;

	return (
		<TabLayout
			header={
				<CourseTabHeader
					background={course.courseTheme}
					title={course.title}
					subtitle={course.courseSubject}
					customizeButton={customizeButton ? customizeButton : null}
				/>
			}
			leftBody={<CourseCodeBox code={code} />}
			rightBody={<ListItems list={course ? course.documents : []} />}
		/>
	);
};

export default General;
