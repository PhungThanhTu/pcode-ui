import React from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import CreateIcon from '@mui/icons-material/Create';
import SchoolIcon from '@mui/icons-material/School';

import { CustomIconButton } from '@/components/CustomButton';
import CourseCard from '@/components/CourseCard';
import CreateCourseModal from '@/components/CreateCourseModal';
import JoinCourseModal from '@/components/JoinCourseModal';

const CoursePage = () => {
	const [OpenCreateCourse, setOpenCreateCourse] = React.useState(false);
	const [OpenJoinCourse, setOpenJoinCourse] = React.useState(false);

	return (
		<Stack direction="column" spacing={2}>
			<Stack direction="row" spacing={3}>
				<CustomIconButton
					startIcon={<CreateIcon />}
					content="Create a course"
					onClick={() => {
						setOpenCreateCourse(true);
					}}
				/>
				<CustomIconButton startIcon={<SchoolIcon />} content="Join a Course" />
			</Stack>
			<Grid container spacing={2}>
				<Grid item padding="0">
					<CourseCard />
				</Grid>
			</Grid>
			<CreateCourseModal
				open={OpenCreateCourse}
				onCancel={() => {
					setOpenCreateCourse(false);
				}}
			/>
			<JoinCourseModal />
		</Stack>
	);
};

export default CoursePage;
