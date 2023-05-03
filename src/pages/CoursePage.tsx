import CourseCustomizeModal from '@/components/Course/CourseCustomizeModal';
import Exercise from '@/components/Course/Tab/Exercise';
import General from '@/components/Course/Tab/General';
import CustomTab from '@/components/Custom/CustomTab';
import { LinearLoading } from '@/components/Loading';

import { TabElement } from '@/types/utility.type';
import { useEffect, Fragment, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '@/selectors/auth.selector';
import { getCourse, getCourses } from '@/selectors/course.selector';
import { fetchCourseById, fetchCourses } from '@/slices/course.slice';
import NotFound from '@/components/NotFound';

const CoursePage = () => {
	const params = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const UserProfile = useSelector(getProfile);
	const { courses } = useSelector(getCourses);
	const { course, loading } = useSelector(getCourse);

	const [OpenCourseCustomize, setOpenCourseCustomize] = useState(false);
	const [Tabs, setTabs] = useState<TabElement[]>([]);

	console.log(location);

	const findCourseCode = (id: string) => {
		let found = courses?.filter((item) => item.id === id)[0];
		return found ? found.Code : 'null';
	};
	const isCourseCreator = (id: string, creatorId: string) => {
		let found = courses?.filter((item) => item.id === id)[0];
		let isCreator = found?.CreatorId === creatorId;
		return isCreator;
	};
	const onDocumentDirect = (id: string) => {
		let { pathname } = location;
		navigate(`${pathname}/`);
	};
	useEffect(() => {
		if (!course) {
			dispatch(fetchCourseById({ id: params.id ? params.id : '' }));
			dispatch(fetchCourses());
		} else if (course === null) {
			navigate(-1);
		} else {
			setTabs([
				{
					title: 'General',
					element: (
						<General
							course={course}
							code={findCourseCode(course.id)}
							customizeButton={
								isCourseCreator(course.id, UserProfile ? UserProfile.id : '')
									? () => {
											setOpenCourseCustomize(true);
									  }
									: null
							}
						/>
					)
				},
				{
					title: 'Exercise',
					element: <Exercise />
				}
			]);
		}
	}, [course]);

	return loading ? (
		<LinearLoading />
	) : course ? (
		<Fragment>
			<CustomTab ListOfTabs={Tabs} />
			<CourseCustomizeModal
				open={OpenCourseCustomize}
				close={() => {
					setOpenCourseCustomize(false);
				}}
			/>
		</Fragment>
	) : (
		<NotFound />
	);
};

export default CoursePage;
