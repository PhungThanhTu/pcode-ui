import TabLayout from '@/layouts/TabLayout';
import ImageHeader from './ImageHeader';

import { Course } from '@/types/course.type';
import Item from './Item';
import CourseCodeBox from './CourseCodeBox';

interface GeneralProps {
	course: Course;
}
const General = (props: GeneralProps) => {
	const { course } = props;
	console.log(course);
	return (
		<TabLayout
			header={<ImageHeader background={course.courseTheme} />}
			leftBody={<CourseCodeBox code={course.Code} />}
			rightBody={<Item />}
		/>
	);
};

export default General;
