import Exercise from '@/components/Course/Tab/Exercise';
import General from '@/components/Course/Tab/General';
import CustomTab from '@/components/CustomTab';

import { TabElement } from '@/types/utility.type';

const CoursePage = () => {
	const tabs: TabElement[] = [
		{
			title: 'General',
			element: <General />
		},
		{
			title: 'Exercise',
			element: <Exercise />
		}
	];
	return <CustomTab ListOfTabs={tabs} />;
};

export default CoursePage;
