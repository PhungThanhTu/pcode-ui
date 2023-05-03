import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Document } from '@/types/document.type';
import { borderColor, borderRadius } from '@/style/Variables';
import { Fragment } from 'react';

const BoxSx = {
	border: `1px solid ${borderColor}`,
	width: '100%',
	padding: '1.5rem',
	borderRadius: borderRadius,
	boxShadow: '0 1px 2px 0 rgba(60,64,67,.3), 0 2px 6px 2px rgba(60,64,67,.15)',
	cursor: 'pointer'
};
interface DocumentItemProps {
	document: Document;
}
export const DocumentItem = (props: DocumentItemProps) => {
	const { document } = props;
	return (
		<Box sx={BoxSx}>
			<Stack width="100%">
				<Typography variant="h5">{document.Title}</Typography>
				{document.DocumentDescription ? (
					<Typography variant="h6">{document.DocumentDescription}</Typography>
				) : undefined}
				{document.HasExercise ? (
					<Fragment>
						<Typography color="red">Exercise status: Not Submited</Typography>
					</Fragment>
				) : undefined}
			</Stack>
		</Box>
	);
};
