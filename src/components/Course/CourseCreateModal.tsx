import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useState } from 'react';
import { BoxModalSx } from '@/style/BoxModalSx';
import { CreateCourseRequest } from '@/types/course.type';

interface CourseCreateModalProps {
	open: boolean;
	onCreate: Function;
	onCancel: Function;
	onChange: Function;
	createCourseValues: CreateCourseRequest;
}

const CourseCreateModal = (props: CourseCreateModalProps) => {
	const { open, onCreate, onCancel, onChange, createCourseValues } = props;
	const [Error, setError] = useState(false);

	return (
		<Modal open={open}>
			<Box sx={BoxModalSx}>
				<Typography variant="h5" component="h2">
					Create course
				</Typography>
				<Stack direction="column" spacing={2} height="100%" alignItems="center" justifyContent="center">
					<Box component="form" onSubmit={() => onCreate()}>
						<TextField
							error={Error}
							required
							name="title"
							label="Title"
							type="text"
							value={createCourseValues.title}
							fullWidth
							variant="standard"
							onChange={(e) => {
								onChange(e);
							}}
						/>
						<TextField
							required
							error={Error}
							name="subject"
							label="Subject"
							type="text"
							fullWidth
							value={createCourseValues.subject ?? ''}
							variant="standard"
							onChange={(e) => {
								onChange(e);
							}}
						/>
						<TextField
							name="theme"
							label="Theme"
							type="file"
							fullWidth
							variant="standard"
							onChange={(e) => {
								onChange(e);
							}}
						/>
						<Typography variant="subtitle2">
							Theme is optional, default theme will be used if no theme provided.
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
							<Button type="submit" variant="contained">
								Create
							</Button>
							<Button onClick={() => onCancel()}>Cancel</Button>
						</Stack>
					</Box>
				</Stack>
			</Box>
		</Modal>
	);
};

export default CourseCreateModal;
