import { useEffect, useState, ChangeEvent } from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import CreateIcon from '@mui/icons-material/Create';
import SchoolIcon from '@mui/icons-material/School';

import { CustomIconButton } from '@/components/CustomButton';
import CourseCard from '@/components/CourseCard';
import CreateCourseModal from '@/components/CreateCourseModal';
import JoinCourseModal from '@/components/JoinCourseModal';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse, fetchCourse } from '@/slices/course.slice';
import { getCourse } from '@/selectors/course.selector';
import { CreateCourse } from '@/types/course.type';

const CoursePage = () => {
	let dispatch = useDispatch();

	const { courses } = useSelector(getCourse);
	const InitialForm: CreateCourse = {
		title: '',
		subject: '',
		theme: 'null'
	};
	const [OpenCreateCourse, setOpenCreateCourse] = useState(false);
	const [OpenJoinCourse, setOpenJoinCourse] = useState(false);
	const [CreateCourseForm, setCreateCourseForm] = useState<CreateCourse>(InitialForm);

	const { title, subject, theme } = CreateCourseForm;

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCreateCourseForm({
			...CreateCourseForm,
			[e.target.name]: e.target.value
		});
	};
	const onCreate = () => {
		dispatch(createCourse(CreateCourseForm));
	};
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
				{courses?.map((item, index) => {
					return (
						<Grid key={index} item padding="0" width="100%" xs={12} md={6} lg={3}>
							<CourseCard title={item.title} subheader={item.CreatorName} />
						</Grid>
					);
				})}
			</Grid>
			<CreateCourseModal
				open={OpenCreateCourse}
				onCreate={onCreate}
				onChange={onChange}
				createCourseValues={{ title, subject, theme }}
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
