import CourseCustomizeModal from '@/components/Course/CourseCustomizeModal';
import Exercise from '@/components/Course/Tab/Exercise';
import General from '@/components/Course/Tab/General';
import CustomTab from '@/components/Custom/CustomTab';
import NotFound from '@/components/NotFound';
import DocumentCreateModal from '@/components/Document/DocumentCreateModal';
import { LinearLoading } from '@/components/Loading';

import { TabElement } from '@/types/utility.type';
import { useEffect, Fragment, useState, ChangeEvent, useLayoutEffect, MouseEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '@/selectors/auth.selector';
import { getCourse, getCourses } from '@/selectors/course.selector';
import { fetchCourseById, fetchCourses } from '@/slices/course.slice';
import { CreateDocumentRequest, Document } from '@/types/document.type';
import { changePublishDocument, createDocument } from '@/slices/document.slice';
import { GetCourseByIdResponse } from '@/types/course.type';
import ScoreBoard from '@/components/Course/Tab/ScoreBoard';

const CoursePage = () => {

	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const InitialForm: CreateDocumentRequest = {
		title: '',
		courseId: params.id ? params.id : '',
		description: '',
		hasExercise: false
	};

	const UserProfile = useSelector(getProfile);
	const { courses } = useSelector(getCourses);
	const { course, loading } = useSelector(getCourse);

	const [Tabs, setTabs] = useState<TabElement[]>([]);
	const [CreateDocumentForm, setCreateDocumentForm] = useState<CreateDocumentRequest>(InitialForm);
	const [OpenCourseCustomize, setOpenCourseCustomize] = useState(false);
	const [OpenDocumentCreate, setOpenDocumentCreate] = useState(false);

	const { title, description, hasExercise, courseId } = CreateDocumentForm;

	const findCourseCode = (id: string) => {
		let found = courses?.filter((item) => item.id === id)[0];
		return found ? found.Code : 'null';
	};

	const isCourseCreator = (id: string, creatorId: string) => {
		let found = courses?.filter((item) => item.id === id)[0];
		let isCreator = found?.CreatorId === creatorId;
		return isCreator;
	};

	//true: has Exercise - false: no Exercise
	const getDocumentsByType = (list: Array<Document>, type: boolean) => {

		let result = list.filter(item => {
			return item.HasExercise === type
		})

		if (result && result.length > 0)
			return result;

		return []
	}
	const onCreateDocument = (form: CreateDocumentRequest) => {
		setOpenDocumentCreate(false);
		setCreateDocumentForm(InitialForm);
		dispatch(createDocument(form));
	};

	const onCreateDocumentFieldsChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === 'hasExercise') {
			setCreateDocumentForm({
				...CreateDocumentForm,
				[e.target.name]: e.target.checked
			});
		} else {
			setCreateDocumentForm({
				...CreateDocumentForm,
				[e.target.name]: e.target.value
			});
		}
	};

	const ChangePublishDocument = (e: MouseEvent<HTMLButtonElement>, documentId: string, status: number) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch(changePublishDocument({ documentId: documentId, status: status }));
	};

	useEffect(() => {
		if (!course) {
			dispatch(fetchCourseById({ id: params.id ? params.id : '' }));
			dispatch(fetchCourses());
		} else if (course === null) {
			navigate(-1);
		} else {

			let isCreator = isCourseCreator(course.id, UserProfile ? UserProfile.id : '');

			let courseGeneral: GetCourseByIdResponse = { ...course, documents: getDocumentsByType(course.documents, false) }
			let courseExercise: GetCourseByIdResponse = { ...course, documents: getDocumentsByType(course.documents, true) }

			setTabs([
				{
					title: 'General',
					element: (
						<General
							isCreator={isCreator}
							course={courseGeneral}
							code={findCourseCode(courseGeneral.id)}
							customizeButton={
								isCreator
									? () => {
										setOpenCourseCustomize(true);
									}
									: null
							}
							changePublishDocument={ChangePublishDocument}
							createDocumentModal={
								isCourseCreator(course.id, UserProfile ? UserProfile.id : '')
									? () => {
										setOpenDocumentCreate(true);
									}
									: null
							}
						/>
					)
				},
				{
					title: 'Exercise',
					element: (
						<Exercise
							isCreator={isCreator}
							course={courseExercise}
							code={findCourseCode(courseExercise.id)}
							customizeButton={
								isCreator
									? () => {
										setOpenCourseCustomize(true);
									}
									: null
							}
							changePublishDocument={ChangePublishDocument}
							createDocumentModal={
								isCourseCreator(course.id, UserProfile ? UserProfile.id : '')
									? () => {
										setOpenDocumentCreate(true);
									}
									: null
							}
						/>
					)
				}, {
					title: 'Score Board',
					element: (
						<ScoreBoard 
						courseId={course.id}
						/>
					)
				}
			]);
		}
	}, [course, course?.documents]);

	useLayoutEffect(() => {
		dispatch(fetchCourseById({ id: params.id ? params.id : '' }));
	}, []);

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

			<DocumentCreateModal
				open={OpenDocumentCreate}
				onCreate={onCreateDocument}
				onChange={onCreateDocumentFieldsChange}
				createDocumentValues={{ title, description, hasExercise, courseId }}
				onCancel={() => {
					setOpenDocumentCreate(false);
					setCreateDocumentForm(InitialForm);
				}}
			/>
		</Fragment>
	) : (
		<NotFound />
	);
};

export default CoursePage;
