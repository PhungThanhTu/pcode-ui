import TabLayout from '@/layouts/TabLayout';
import Header from './Header';
import ListItems from './ListItems';
import CourseCodeBox from '../CourseCodeBox';

import { Course } from '@/types/course.type';
import { useSelector } from 'react-redux';
import { getProfile } from '@/selectors/auth.selector';

interface GeneralProps {
	course: Course;
}
const General = (props: GeneralProps) => {
	const { course } = props;

	const UserProfile = useSelector(getProfile);

	return (
		<TabLayout
			header={<Header background={course.courseTheme} title={course.title} subtitle={course.courseSubject} />}
			leftBody={<CourseCodeBox code={course.Code} />}
			rightBody={<ListItems list={[]} />}
		/>
	);
};

export default General;
