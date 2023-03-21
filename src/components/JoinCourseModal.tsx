import React, { ChangeEvent, ReactElement, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Alert, AlertTitle } from '@mui/material';
import { Button } from '@mui/material';
import { BoxModalSx } from '@/style/BoxModalSx';

export interface JoinCourseModalProps {
	open: boolean;
	onCreate?: Function;
	onCancel: Function;
}
const JoinCourseModal = (props: JoinCourseModalProps) => {
	const { open, onCreate, onCancel } = props;

	return (
		<Modal open={open}>
			<Box sx={BoxModalSx}>
				<Typography variant="h5" component="h2">
					Course Code
				</Typography>
				<Stack direction="column" spacing={2} height="100%" alignItems="center" justifyContent="center">
					<TextField name="coursecode" label="Course Code" type="text" fullWidth variant="standard" />
					<Stack
						direction="row"
						spacing={1}
						height="100%"
						width="100%"
						alignItems="center"
						justifyContent="flex-end"
						paddingTop="25px"
					>
						<Button variant="contained">Join</Button>
						<Button onClick={() => onCancel()}>Cancel</Button>
					</Stack>
				</Stack>
			</Box>
		</Modal>
	);
};

export default JoinCourseModal;
