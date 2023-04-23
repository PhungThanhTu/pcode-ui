import TabLayout from '@/layouts/TabLayout';
import Header from './Header';
import ListItems from './ListItems';
import CourseCodeBox from '../CourseCodeBox';

import { Course } from '@/types/course.type';


interface GeneralProps {
	course: Course;
	customizeButton: Function;
}
const General = (props: GeneralProps) => {

	const { course, customizeButton } = props;

	return (
		<TabLayout
			header={<Header background={course.courseTheme} title={course.title} subtitle={course.courseSubject}  customizeButton={customizeButton} />}
			leftBody={<CourseCodeBox code={course.Code} />}
			rightBody={<ListItems list={[]} />}
		/>
	);
};

export default General;
