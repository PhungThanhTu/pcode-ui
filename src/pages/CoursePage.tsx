import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import CreateIcon from '@mui/icons-material/Create';
import SchoolIcon from '@mui/icons-material/School';

import CourseCard from '@/components/CourseCard';
import CreateCourseModal from '@/components/CreateCourseModal';
import JoinCourseModal from '@/components/JoinCourseModal';

import { useEffect, useState, ChangeEvent } from 'react';
import { CustomIconButton } from '@/components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse, fetchCourse } from '@/slices/course.slice';
import { getCourses } from '@/selectors/course.selector';
import { CreateCourse } from '@/types/course.type';
import { useImageFileReader } from '@/hook/useFileReader';
import { useNavigate } from 'react-router';
import { LinearLoading } from '@/components/Loading';

const CoursePage = () => {
	let dispatch = useDispatch();
	let navigate = useNavigate();

	const { courses, loading } = useSelector(getCourses);
	const { B64Value, getImageB64Value } = useImageFileReader();

	const InitialForm: CreateCourse = {
		title: '',
		subject: '',
		theme: ''
	};

	const [OpenCreateCourse, setOpenCreateCourse] = useState(false);
	const [OpenJoinCourse, setOpenJoinCourse] = useState(false);
	const [CreateCourseForm, setCreateCourseForm] = useState<CreateCourse>(InitialForm);

	const { title, subject, theme } = CreateCourseForm;

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === 'theme') {
			getImageB64Value(e);
		} else {
			setCreateCourseForm({
				...CreateCourseForm,
				[e.target.name]: e.target.value
			});
		}
	};
	const onCreate = () => {
		setOpenCreateCourse(false);
		setCreateCourseForm(InitialForm);
		dispatch(createCourse(CreateCourseForm));
	};
	const onJoin = (code: string) => {
		navigate(`/invitation/${code}`);
	};

	useEffect(() => {
		dispatch(fetchCourse());
	}, []);
	useEffect(() => {
		if (B64Value) {
			setCreateCourseForm({
				...CreateCourseForm,
				theme: B64Value
			});
		}
	}, [B64Value]);
	return (
		<Stack direction="column" spacing={2}>
			<Stack direction="row" spacing={3}>
				<CustomIconButton
					startIcon={<CreateIcon />}
					content="Create a Course"
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
			{loading ? (
				<LinearLoading />
			) : (
				<Grid container spacing={1}>
					{courses?.map((item, index) => {
						return (
							<Grid key={index} item padding="0" width="100%" xs={12} md={6} lg={3}>
								<CourseCard title={item.title} subheader={item.CreatorName} theme={item.theme} />
							</Grid>
						);
					})}
				</Grid>
			)}
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
				onJoin={onJoin}
				onCancel={() => {
					setOpenJoinCourse(false);
				}}
			/>
		</Stack>
	);
};

export default CoursePage;
