import TabLayout from '@/layouts/TabLayout';
import ImageHeader from './ImageHeader';
import ListItems from './ListItems';
import CourseCodeBox from '../CourseCodeBox';

import { Course } from '@/types/course.type';
import { useSelector } from 'react-redux';

interface GeneralProps {
	course: Course;
}
const General = (props: GeneralProps) => {
	const { course } = props;
	const profile = useSelector(get)

	return (
		<TabLayout
			header={<ImageHeader background={course.courseTheme} />}
			leftBody={<CourseCodeBox code={course.Code} />}
			rightBody={<ListItems list={[]} />}
		/>
	);
};

export default General;
