import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import { TestResult } from '@/types/document.type';

const TitleAccordionSx = {
	display: 'flex',
	flexDirection: 'row',
	alighItems: 'center',
	justifyContent: ' space-between'
};
interface TestResultItemProps {
	item: TestResult;
	index: number;
}

const DocumentTestResultItem = (props: TestResultItemProps) => {
	const { item, index } = props;

	return (
		<Box>
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} sx={TitleAccordionSx}>
					<Typography>Test Case: {index}</Typography>
					{item.RunStatus === 1 ? (
						<Typography color="green">Pass</Typography>
					) : (
						<Typography color="red">Fail</Typography>
					)}
				</AccordionSummary>
				<AccordionDetails>
					<Typography>Input: {item.Input}</Typography>
					<Typography>Expected Output: {item.ExpectedOutput}</Typography>
					<Typography>Atuacl Output: {item.Output}</Typography>
				</AccordionDetails>
			</Accordion>
		</Box>
	);
};

export default DocumentTestResultItem;
