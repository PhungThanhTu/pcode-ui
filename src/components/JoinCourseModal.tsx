import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { ChangeEvent, useState } from 'react';
import { BoxModalSx } from '@/style/BoxModalSx';

interface JoinCourseModalProps {
	open: boolean;
	onJoin: Function;
	onCancel: Function;
}
const JoinCourseModal = (props: JoinCourseModalProps) => {
	const { open, onJoin, onCancel } = props;

	const [Code, setCode] = useState('');

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCode(e.target.value);
	};

	return (
		<Modal open={open}>
			<Box sx={BoxModalSx}>
				<Typography variant="h5" component="h2">
					Course Code
				</Typography>
				<Stack direction="column" spacing={2} height="100%" alignItems="center" justifyContent="center">
					<Box component="form" onSubmit={() => onJoin(Code)} width="100%">
						<TextField
							name="coursecode"
							label="Course Code"
							type="text"
							fullWidth
							required
							variant="standard"
							onChange={onChange}
						/>
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
								Join
							</Button>
							<Button onClick={() => onCancel()}>Cancel</Button>
						</Stack>
					</Box>
				</Stack>
			</Box>
		</Modal>
	);
};

export default JoinCourseModal;
