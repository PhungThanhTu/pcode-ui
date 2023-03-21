import React, { ChangeEvent, ReactElement, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { BoxModalSx } from '@/style/BoxModalSx';

export interface CreateCourseModalProps {
	open: boolean;
	onCreate?: Function;
	onCancel: Function;
}

const CreateCourseModal = (props: CreateCourseModalProps) => {
	const { open, onCreate, onCancel } = props;

	return (
		<Modal open={open}>
			<Box sx={BoxModalSx}>
				<Typography variant="h5" component="h2">
					Create course
				</Typography>
				<Stack direction="column" spacing={2} height="100%" alignItems="center" justifyContent="center">
					<TextField name="title" label="Title" type="text" fullWidth variant="standard" />
					<TextField name="subject" label="Subject" type="text" fullWidth variant="standard" />
					<TextField name="theme" label="Theme" type="file" fullWidth variant="standard" />
					<Typography variant="subtitle2">
						Theme is optional, default image will be used if no theme provided.
					</Typography>
					<Stack
						direction="row"
						spacing={1}
						height="100%"
						width="100%"
						alignItems="center"
						justifyContent="flex-end"
						paddingTop="25px"
					>
						<Button variant="contained">Create</Button>
						<Button onClick={() => onCancel()}>Cancel</Button>
					</Stack>
				</Stack>
			</Box>
		</Modal>
	);
};

export default CreateCourseModal;
