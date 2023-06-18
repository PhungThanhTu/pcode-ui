import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import { TestResult } from '@/types/document.type';
import Stack from '@mui/material/Stack';
import { TestResultStatus } from '@/config';
import { TestResultStatusToMessage } from '@/utils/convert';

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
		<Box sx={{ width: '100%' }}>
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} sx={TitleAccordionSx}>
					<Stack width="100%" flexDirection="row" alignContent="space-between" columnGap={2}>
						<Typography>Test Case: {index} </Typography>
						{item.RunStatus === TestResultStatus.Accepted.status ? (
							<Typography color="green">Pass</Typography>
						) : (
							<Typography color="red">{TestResultStatusToMessage(item.RunStatus)}</Typography>
						)}
					</Stack>
				</AccordionSummary>
				<AccordionDetails>
					<Typography variant='subtitle2'><strong>Input:</strong> {item.Input}</Typography>
					<Typography variant='subtitle2'><strong>Expected Output:</strong> {item.ExpectedOutput}</Typography>
					<Typography variant='subtitle2'><strong>Actual Output:</strong> {item.Output}</Typography>
				</AccordionDetails>
			</Accordion>
		</Box>
	);
};

export default DocumentTestResultItem;
