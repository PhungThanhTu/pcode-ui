import Exercise from '@/components/Course/Tab/Exercise';
import General from '@/components/Course/Tab/General';
import CustomTab from '@/components/Custom/CustomTab';
import { LinearLoading } from '@/components/Loading';

import { TabElement } from '@/types/utility.type';
import { useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CoursePage = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const course = location.state;

	const tabs: TabElement[] = [
		{
			title: 'General',
			element: <General course={course} />
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

	return course ? <CustomTab ListOfTabs={tabs} /> : <LinearLoading />;
};

export default CoursePage;
