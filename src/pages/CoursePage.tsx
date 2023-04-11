import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';

import InDevelopment from '@/components/InDevelopment';
import { useState, SyntheticEvent } from 'react';

const CoursePage = () => {
	const [TabIndex, setTabIndex] = useState('1');

	const handleChangeTab = (event: SyntheticEvent, index: string) => {
		setTabIndex(index);
	};
	return (
		<Box sx={{ width: '100%' }}>
			<TabContext value={TabIndex}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<TabList onChange={handleChangeTab}>
						<Tab label="Exercise" value="1" />
						<Tab label="General" value="2" />
						<Tab label="Detail" value="3" />
					</TabList>
				</Box>
				<TabPanel value="1">
					<InDevelopment />
				</TabPanel>
				<TabPanel value="2">
					<InDevelopment />
				</TabPanel>
				<TabPanel value="3">
					<InDevelopment />
				</TabPanel>
			</TabContext>
		</Box>
	);
};

export default CoursePage;
