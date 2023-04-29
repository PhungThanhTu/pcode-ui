import TabLayout from '@/layouts/TabLayout';
import Header from './Header';
import ListItems from './ListItems';
import CourseCodeBox from '../CourseCodeBox';

import { GetCourseByIdResponse } from '@/types/course.type';

interface GeneralProps {
	course: GetCourseByIdResponse;
	customizeButton: Function;
	code: string;
}
const General = (props: GeneralProps) => {
	const { course, customizeButton, code } = props;

	return (
		<TabLayout
			header={
				<Header
					background={course.courseTheme}
					title={course.title}
					subtitle={course.courseSubject}
					customizeButton={customizeButton}
				/>
			}
			leftBody={<CourseCodeBox code={code} />}
			rightBody={<ListItems list={course ? course.documents : []} />}
		/>

	);
};

export default General;
