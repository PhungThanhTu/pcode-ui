import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import CreateIcon from '@mui/icons-material/Create';
import SchoolIcon from '@mui/icons-material/School';

import CourseCard from '@/components/Course/CourseCard';
import CourseCreateModal from '@/components/Course/CourseCreateModal';
import CourseJoinModal from '@/components/Course/CourseJoinModal';

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { CustomIconButton } from '@/components/Custom/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse, fetchCourse } from '@/slices/course.slice';
import { getCourses } from '@/selectors/course.selector';
import { CreateCourse } from '@/types/course.type';
import { useImageFileReader } from '@/hook/useFileReader';
import { useNavigate } from 'react-router';
import { LinearLoading } from '@/components/Loading';
import { validInvitationCode } from '@/utils/regex';

const CoursesPage = () => {
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
	const onJoin = (e: FormEvent<HTMLFormElement>, code: string, error: Function) => {
		e.preventDefault();
		if (validInvitationCode.test(code)) navigate(`/invitation/${code}`);
		else error();
	};
	const onCourseDirect = (code: string) => {
		navigate(`/course/${code}`, { state: courses?.filter((item) => item.Code === code)[0] });
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
				<Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 1, md: 2, lg: 2 }} alignItems="center">
					{courses?.map((item, index) => {
						return (
							<Grid key={index} item width="100%" xs={12} sm={6} md={4} lg={3}>
								<CourseCard course={item} onDirect={onCourseDirect} />
							</Grid>
						);
					})}
				</Grid>
			)}
			<CourseCreateModal
				open={OpenCreateCourse}
				onCreate={onCreate}
				onChange={onChange}
				createCourseValues={{ title, subject, theme }}
				onCancel={() => {
					setOpenCreateCourse(false);
				}}
			/>
			<CourseJoinModal
				open={OpenJoinCourse}
				onJoin={onJoin}
				onCancel={() => {
					setOpenJoinCourse(false);
				}}
			/>
		</Stack>
	);
};

export default CoursesPage;
