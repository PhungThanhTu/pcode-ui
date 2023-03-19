import React, { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import CreateIcon from '@mui/icons-material/Create';
import SchoolIcon from '@mui/icons-material/School';

import { CustomIconButton } from '@/components/CustomButton';
import CourseCard from '@/components/CourseCard';
import CreateCourseModal from '@/components/CreateCourseModal';
import JoinCourseModal from '@/components/JoinCourseModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourse } from '@/slices/course.slice';
import { getCourse } from '@/selectors/course.selector';

const CoursePage = () => {
	let dispatch = useDispatch();

	const { course } = useSelector(getCourse);

	const [OpenCreateCourse, setOpenCreateCourse] = React.useState(false);
	const [OpenJoinCourse, setOpenJoinCourse] = React.useState(false);

	useEffect(() => {
		dispatch(fetchCourse());
	}, []);
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
				<CustomIconButton
					startIcon={<SchoolIcon />}
					content="Join a Course"
					onClick={() => {
						setOpenJoinCourse(true);
					}}
				/>
			</Stack>
			<Grid container spacing={1}>
				{course?.map((item, index) => {
					return (
						<Grid item padding="0" width="100%" xs={12} md={6} lg={3}>
							<CourseCard key={index} title={item.title} subheader={item.CreatorName} />
						</Grid>
					);
				})}
			</Grid>
			<CreateCourseModal
				open={OpenCreateCourse}
				onCancel={() => {
					setOpenCreateCourse(false);
				}}
			/>
			<JoinCourseModal
				open={OpenJoinCourse}
				onCancel={() => {
					setOpenJoinCourse(false);
				}}
			/>
		</Stack>
	);
};

export default CoursePage;
