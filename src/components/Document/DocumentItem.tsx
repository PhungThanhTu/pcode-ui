import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import PublishIcon from '@mui/icons-material/Publish';
import Tooltip from '@mui/material/Tooltip';

import { Document } from '@/types/document.type';
import { borderColor, borderRadius } from '@/style/Variables';
import { Fragment, MouseEvent } from 'react';
import { CustomOnlyIconButton } from '../Custom/CustomButton';


const BoxSx = {
	border: `1px solid ${borderColor}`,
	width: '100%',
	padding: '1.5rem',
	borderRadius: borderRadius,
	boxShadow: '0 1px 2px 0 rgba(60,64,67,.3), 0 2px 6px 2px rgba(60,64,67,.15)',
	cursor: 'pointer',
	display: 'flex'

};
interface DocumentItemProps {
	document: Document;
	publishDocument: Function;
	isCreator: boolean;
}
export const DocumentItem = (props: DocumentItemProps) => {
	const { document, publishDocument, isCreator } = props;

	return (
		<Box sx={BoxSx}>
			<Stack width="100%">
				<Typography variant="h5">{document.Title}</Typography>
				{document.DocumentDescription ? (
					<Typography variant="h6">{document.DocumentDescription}</Typography>
				) : undefined}
				{document.HasExercise ? (
					<Fragment>
						<Typography color="red">Exercise status: Nothing</Typography>
					</Fragment>
				) : undefined}
			</Stack>
			{
				isCreator ?
					<Stack minHeight='100%' justifyContent="center" onClick={(e: MouseEvent) => {

						publishDocument(e, document.Id, document.IsPublic ? 0 : 1)
					}} >
						<CustomOnlyIconButton onClick={() => { }} color={document.IsPublic ? 'error' : 'primary'}>
							<Tooltip title={document.IsPublic ? 'UnPublish' : 'Publish'}>
								{
									document.IsPublic ?
										<UnpublishedIcon />
										:
										<PublishIcon />
								}
							</Tooltip>
						</CustomOnlyIconButton>
					</Stack>
					:
					null
			}

		</Box>
	);
};
