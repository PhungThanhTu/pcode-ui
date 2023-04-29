import CourseCustomizeModal from '@/components/Course/CourseCustomizeModal';
import Exercise from '@/components/Course/Tab/Exercise';
import General from '@/components/Course/Tab/General';
import CustomTab from '@/components/Custom/CustomTab';
import { LinearLoading } from '@/components/Loading';

import { TabElement } from '@/types/utility.type';
import { useEffect, Fragment, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '@/selectors/auth.selector';
import { getCourse, getCourses } from '@/selectors/course.selector';
import { fetchCourseById } from '@/slices/course.slice';
import NotFound from '@/components/NotFound';


const CoursePage = () => {

	const params = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const UserProfile = useSelector(getProfile);
	const { courses } = useSelector(getCourses)
	const { course, loading } = useSelector(getCourse)

	const [OpenCourseCustomize, setOpenCourseCustomize] = useState(false);
	const [Tabs, setTabs] = useState<TabElement[]>([])

	const findCourseCode = (id: string) => {
		let found = courses?.filter((item) => item.id === id)[0]
		return found ? found.Code : "null"
	}

	useEffect(() => {
		if (!course) {
			dispatch(fetchCourseById({ id: params.id ? params.id : "" }))
		}
		else if (course === null) {
			navigate(-1)
		}
		else {
			setTabs([{
				title: 'General',
				element: (
					<General
						course={course}
						code={findCourseCode(course.id)}
						customizeButton={() => {
							setOpenCourseCustomize(true);
						}}
					/>
				)
			},
			{
				title: 'Exercise',
				element: <Exercise />
			}])
		}
	}, [course])

	return loading ? <LinearLoading /> : (
		course ?
			<Fragment>
				<CustomTab ListOfTabs={Tabs} />
				<CourseCustomizeModal
					open={OpenCourseCustomize}
					close={() => {
						setOpenCourseCustomize(false);
					}}
				/>
			</Fragment>
			:
			<NotFound />
	);
};

export default CoursePage;
