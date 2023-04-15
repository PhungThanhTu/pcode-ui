import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';

import { useState, SyntheticEvent } from 'react';
import { TabElement } from '@/types/utility.type';

interface CustomTabProps {
	ListOfTabs: Array<TabElement>;
}
const CustomTab = (props: CustomTabProps) => {
	const { ListOfTabs } = props;

	const [TabIndex, setTabIndex] = useState('1');

	const handleChangeTab = (event: SyntheticEvent, index: string) => {
		setTabIndex(index);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<TabContext value={TabIndex}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<TabList onChange={handleChangeTab}>
						{ListOfTabs.map((item, index) => {
							return <Tab label={item.title.toUpperCase()} value={`${index + 1}`} />;
						})}
					</TabList>
				</Box>
				{ListOfTabs.map((item, index) => {
					return <TabPanel value={`${index + 1}`}>{item.element}</TabPanel>;
				})}
			</TabContext>
		</Box>
	);
};

export default CustomTab;