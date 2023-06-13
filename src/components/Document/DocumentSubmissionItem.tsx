import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Checkbox from '@mui/material/Checkbox';

import { Submission } from '@/types/document.type';
import { BoxItemSx } from '@/style/BoxSx';
import { CustomOnlyIconButton } from '../Custom/CustomButton';

interface SubmissionProps {
	onSelected: Function;
	onMark: Function;
	item: Submission;
}

const DocumentSubmissionItem = (props: SubmissionProps) => {
	const { onSelected, onMark, item } = props;

	return (
		<Box sx={{ ...BoxItemSx, padding: '10px' }}>
			<Stack width="100%" flexDirection="row" alignItems="center" justifyContent="space-around" columnGap={1}>
				<Typography sx={{ flexGrow: 1 }} variant="subtitle1">
					{item.Id}
				</Typography>
				<Tooltip title="Mark as final submission to validate">
					<Checkbox
						name="choice"
						checked={item.Choice}
						onClick={() => {
							onMark();
						}}
					/>
				</Tooltip>

				<CustomOnlyIconButton
					color="primary"
					onClick={() => {
						onSelected();
					}}
				>
					<Tooltip title="View result">
						<VisibilityOutlinedIcon />
					</Tooltip>
				</CustomOnlyIconButton>
			</Stack>
		</Box>
	);
};

export default DocumentSubmissionItem;
