import CourseCustomizeModal from '@/components/Course/CourseCustomizeModal';
import Exercise from '@/components/Course/Tab/Exercise';
import General from '@/components/Course/Tab/General';
import CustomTab from '@/components/Custom/CustomTab';
import { LinearLoading } from '@/components/Loading';

import { TabElement } from '@/types/utility.type';
import { useLayoutEffect, Fragment, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getProfile } from '@/selectors/auth.selector';

const CoursePage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const UserProfile = useSelector(getProfile);

	const [OpenCourseCustomize, setOpenCourseCustomize] = useState(false);

	const course = location.state;

	const tabs: TabElement[] = [
		{
			title: 'General',
			element: (
				<General
					course={course}
					customizeButton={() => {
						setOpenCourseCustomize(true);
					}}
				/>
			)
		},
		{
			title: 'Exercise',
			element: <Exercise />
		}
	];

	useLayoutEffect(() => {
		if (!course) {
			navigate(-1);
		}
	}, [course]);

	return course ? (
		<Fragment>
			<CustomTab ListOfTabs={tabs} />
			<CourseCustomizeModal
				open={OpenCourseCustomize}
				close={() => {
					setOpenCourseCustomize(false);
				}}
			/>
		</Fragment>
	) : (
		<LinearLoading />
	);
};

export default CoursePage;
