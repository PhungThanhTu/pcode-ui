import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import InDevelopment from '../InDevelopment';
import { useState } from 'react';
import { BoxModalSx } from '@/style/BoxSx';

interface CourseCustomizeModalProps {
	open: boolean;
	close: Function;
}
const CourseCustomizeModal = (props: CourseCustomizeModalProps) => {
	const { open } = props;
	return (
		<Modal
			open={open}
			onClose={() => {
				props.close();
			}}
		>
			<Box sx={BoxModalSx}>
				<InDevelopment />
			</Box>
		</Modal>
	);
};

export default CourseCustomizeModal;
