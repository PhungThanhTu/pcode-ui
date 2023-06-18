import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';

import { MouseEvent } from 'react';
import { CustomOnlyIconButton } from '../Custom/CustomButton';
import { GetSingleTestCaseResponse } from '@/types/document.type';
import { BoxItemSx } from '@/style/BoxSx';

interface TestCaseItemProps {
	index: number;
	onSelected: Function;
	onDeleted: Function;
	item: GetSingleTestCaseResponse;
}

const DocumentTestCaseItem = (props: TestCaseItemProps) => {
	const { index, onSelected, onDeleted } = props;
	return (
		<Box
			sx={{ ...BoxItemSx, padding: '10px' }}
			onClick={() => {
				onSelected();
			}}
		>
			<Stack width="100%" flexDirection="row" alignItems="center" justifyContent="space-between">
				<Typography variant="subtitle1">{`Test Case ${index}`}</Typography>
				<CustomOnlyIconButton
					color="error"
					onClick={(e: MouseEvent) => {
						e.stopPropagation();
						e.preventDefault();
						onDeleted();
					}}
				>
					<Tooltip title="Delete">
						<DeleteIcon />
					</Tooltip>
				</CustomOnlyIconButton>
			</Stack>
		</Box>
	);
};

export default DocumentTestCaseItem;
