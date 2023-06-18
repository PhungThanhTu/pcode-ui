import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import PublishIcon from '@mui/icons-material/Publish';
import Tooltip from '@mui/material/Tooltip';

import { Document } from '@/types/document.type';
import { Fragment, MouseEvent } from 'react';
import { CustomOnlyIconButton } from '../Custom/CustomButton';
import { BoxItemSx } from '@/style/BoxSx';
import { Error } from '@/style/Colors';

interface DocumentItemProps {
	document: Document;
	publishDocument: Function;
	isCreator: boolean;
	exerciseStatus?: boolean;
}
export const DocumentItem = (props: DocumentItemProps) => {
	const { document, publishDocument, isCreator, exerciseStatus } = props;


	return (
		<Box sx={BoxItemSx}>
			<Stack width="100%">
				<Typography variant="h5">{document.Title}</Typography>
				{document.DocumentDescription ? (
					<Typography variant="subtitle2">{document.DocumentDescription}</Typography>
				) : undefined}
				{document.HasExercise && exerciseStatus ? (
					<Fragment>
						<Typography color={Error.light}>Exercise status: Nothing</Typography>
					</Fragment>
				) : undefined}
			</Stack>
			{isCreator ? (
				<Stack
					minHeight="100%"
					justifyContent="center"
					onClick={(e: MouseEvent) => {
						publishDocument(e, document.Id, document.IsPublic ? 0 : 1);
					}}
				>
					<CustomOnlyIconButton onClick={() => { }} color={document.IsPublic ? 'error' : 'primary'}>
						<Tooltip title={document.IsPublic ? 'UnPublish' : 'Publish'}>
							{document.IsPublic ? <UnpublishedIcon /> : <PublishIcon />}
						</Tooltip>
					</CustomOnlyIconButton>
				</Stack>
			) : null}
		</Box>
	);
};
