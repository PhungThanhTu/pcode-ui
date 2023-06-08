import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';

import { useState, SyntheticEvent } from 'react';
import { TabElement } from '@/types/utility.type';

interface CustomTabProps {
	listOfTabs: Array<TabElement>;
}

const BoxCustomTabSx = {
	width: '100%',
	'.MuiTabPanel-root': {
		padding: 0,
		paddingTop: '5px'
	}
};

const CustomTab = (props: CustomTabProps) => {

	const { listOfTabs: ListOfTabs } = props;

	const [TabIndex, setTabIndex] = useState('1');

	const handleChangeTab = (event: SyntheticEvent, index: string) => {
		setTabIndex(index);
	};

	return (
		<Box
			id="CustomTab"
			sx={{
				...BoxCustomTabSx
			}}
		>
			<TabContext value={TabIndex}>
				<Box sx={{ borderColor: 'divider' }}>
					<TabList onChange={handleChangeTab}>
						{ListOfTabs.map((item, index) => {
							return <Tab key={index} label={item.title.toUpperCase()} value={`${index + 1}`} />;
						})}
					</TabList>
				</Box>
				{ListOfTabs.map((item, index) => {
					return (
						<TabPanel key={index} value={`${index + 1}`}>
							{item.element}
						</TabPanel>
					);
				})}
			</TabContext>
		</Box>
	);
};

export default CustomTab;
