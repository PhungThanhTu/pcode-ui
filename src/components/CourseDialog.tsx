import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate, useParams } from 'react-router';
import courseApi from '@/api/courseApi';
import { Course } from '@/types/course.type';
import { useDispatch } from 'react-redux';
import { CircleLoading } from './Loading';

const CourseDialog = () => {
	let navigate = useNavigate();

	const { code } = useParams();

	const [Open, setOpen] = useState(true);
	const [Course, setCourse] = useState<Course>();
	const [Loading, setLoading] = useState(true);

	const handleClose = () => {
		setOpen(false);
		navigate('/course');
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
	console.log(Course, 'here');
	return (
		<Dialog open={Open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
			<DialogTitle id="alert-dialog-title">Do you want to join?</DialogTitle>
			<DialogContent>
				{Loading ? (
					<CircleLoading />
				) : (
					<DialogContentText id="alert-dialog-description">
						{Course
							? `Title: ${Course.title}\n
							Title: ${Course.title}\n
							`
							: 'Course does not exist or invalid Invitation Code.'}
					</DialogContentText>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} disabled={Loading}>
					Disagree
				</Button>
				<Button onClick={handleClose} disabled={Loading} autoFocus>
					Agree
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CourseDialog;
