import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import courseApi from '@/api/courseApi';

import { useState, useEffect, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Course } from '@/types/course.type';
import { useDispatch } from 'react-redux';
import { CircleLoading } from '@/components/Loading';
import { joinCourse } from '@/slices/course.slice';
import { AppDispatch, dispatchWithPromise, store } from '@/redux/store';

const CourseDialog = () => {

	const navigate = useNavigate();


	const { code } = useParams();

	const [Open, setOpen] = useState(true);
	const [Course, setCourse] = useState<Course>();
	const [Loading, setLoading] = useState(true);

	const handleClose = () => {
		setOpen(false);
		navigate('/course');
	};

	const handleJoinCourse = async (id: string) => {

		const dispatch = dispatchWithPromise(store.dispatch);

		try {
			await dispatch(joinCourse({ Code: code ? code : '' })).finally(() => { navigate(`/course/${id}`); });
		} catch (error) {
			console.error('Error dispatching joinCourse action:', error);
		}

	};

	useEffect(() => {
		//get course info here
		if (code) {
			const fetchCourse = async (code: string) => {
				try {
					const course = await courseApi.getCourseByCode(code);
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
								<Button
									onClick={() => {
										handleJoinCourse(Course.id);
									}}
									autoFocus
								>
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