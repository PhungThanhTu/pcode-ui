import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { CreateDocumentRequest } from '@/types/document.type';
import { BoxModalSx } from '@/style/BoxSx';
import { useState } from 'react';

interface DocumentCreateModalProps {
	open: boolean;
	onCreate: Function;
	onCancel: Function;
	onChange: Function;
	createDocumentValues: CreateDocumentRequest;
}

const DocumentCreateModal = (props: DocumentCreateModalProps) => {
	const { open, onCreate, onCancel, onChange, createDocumentValues } = props;
	const [Error, setError] = useState(false);

	return (
		<Modal open={open}>
			<Box sx={BoxModalSx}>
				<Typography variant="h5" component="h2">
					Create course
				</Typography>
				<Stack direction="column" spacing={2} height="100%" alignItems="center" justifyContent="center">
					<Box component="form" onSubmit={() => onCreate(createDocumentValues)}>
						<TextField
							error={Error}
							required
							name="title"
							label="Title"
							type="text"
							value={createDocumentValues.title}
							fullWidth
							variant="standard"
							onChange={(e) => {
								onChange(e);
							}}
						/>
						<TextField
							required
							error={Error}
							name="description"
							label="Description"
							type="text"
							fullWidth
							rows={5}
							multiline
							value={createDocumentValues.description}
							variant="standard"
							onChange={(e) => {
								onChange(e);
							}}
						/>
						<FormGroup>
							<FormControlLabel
								control={
									<Checkbox
										name="hasExercise"
										checked={createDocumentValues.hasExercise}
										onChange={(e) => {
											onChange(e);
										}}
									/>
								}
								label="Has Exercises?"
							/>
						</FormGroup>
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

export default DocumentCreateModal;
