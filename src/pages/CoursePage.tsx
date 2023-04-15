import CustomTab from '@/components/CustomTab';
import InDevelopment from '@/components/InDevelopment';
import { TabElement } from '@/types/utility.type';

const CoursePage = () => {
	const tabs: TabElement[] = [
		{
			title: 'General',
			element: <InDevelopment />
		},
		{
			title: 'Exercise',
			element: <InDevelopment />
		}
	];
	return <CustomTab ListOfTabs={tabs} />;
};

export default CoursePage;
