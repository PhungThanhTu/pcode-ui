import { useState, useEffect, Fragment } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import courseApi from '@/api/courseApi';

import { useNavigate, useParams } from 'react-router';
import { Course } from '@/types/course.type';
import { useDispatch } from 'react-redux';
import { CircleLoading } from './Loading';
import { joinCourse } from '@/slices/course.slice';

const CourseDialog = () => {
	let navigate = useNavigate();
	let dispatch = useDispatch();

	const { code } = useParams();

	const [Open, setOpen] = useState(true);
	const [Course, setCourse] = useState<Course>();
	const [Loading, setLoading] = useState(true);

	const handleClose = () => {
		setOpen(false);
		navigate('/course');
	};

	const handleJoinCourse = () => {
		dispatch(joinCourse({ Code: code ? code : '' }));
		navigate(`/course/${code}`);
	};

	useEffect(() => {
		//get course info here
		if (code) {
			const fetchCourse = async (code: string) => {
				try {
					const course = await courseApi.getCourse(code);
					if (course.data.id) {
						setCourse(course.data);
						setLoading(false);
					} else {
						setCourse(undefined);
						setLoading(false);
					}
				} catch (e) {
					setCourse(undefined);
					setLoading(false);
				}
			};
			fetchCourse(code);
		}
	}, [code]);
	return (
		<Dialog open={Open}>
			{Loading ? (
				<Box width="200px" height="200px">
					<CircleLoading />
				</Box>
			) : (
				<Fragment>
					<DialogTitle>{Course ? 'Do you want to join?' : 'Error Code'}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							{Course ? `Title: ${Course.title}` : 'Course does not exist or invalid Invitation Code.'}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						{Course ? (
							<Fragment>
								<Button onClick={handleClose}>Disagree</Button>
								<Button onClick={handleJoinCourse} autoFocus>
									Agree
								</Button>
							</Fragment>
						) : (
							<Button onClick={handleClose} autoFocus>
								Back
							</Button>
						)}
					</DialogActions>
				</Fragment>
			)}
		</Dialog>
	);
};

export default CourseDialog;
