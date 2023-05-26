import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import PublishIcon from '@mui/icons-material/Publish';
import Tooltip from '@mui/material/Tooltip';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';

import { Document } from '@/types/document.type';
import { borderColor, borderRadius } from '@/style/Variables';
import { Fragment, MouseEvent } from 'react';
import { CustomOnlyIconButton } from '../Custom/CustomButton';

import { GetSingleTestCaseResponse } from '@/types/document.type';
import { BoxItemSx } from '@/style/BoxSx';

interface TestCaseItemProps {
	index: number;
	onSelected: Function;
	onDeleted: Function;
	item: GetSingleTestCaseResponse;
}

const TestCaseItem = (props: TestCaseItemProps) => {
	const { index, onSelected, onDeleted } = props;
	return (
		<Box
			sx={BoxItemSx}
			onClick={() => {
				onSelected();
			}}
		>
			<Stack width="100%" flexDirection="row" alignItems="center" justifyContent="space-between">
				<Typography variant="h5">{`Test Case ${index}`}</Typography>
				<CustomOnlyIconButton
					color="error"
					onClick={(e: MouseEvent) => {
						e.stopPropagation();
						e.preventDefault();
						onDeleted();
					}}
				>
					<Tooltip title="Delete">
						<RemoveCircleOutlinedIcon />
					</Tooltip>
				</CustomOnlyIconButton>
			</Stack>
		</Box>
	);
};

export default TestCaseItem;
