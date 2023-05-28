import CreateIcon from '@mui/icons-material/Create';

import TabLayout from '@/layouts/TabLayout';
import CourseTabHeader from '../CourseHeader';
import ListItems from '../../ListItems';
import CourseCodeBox from '../CourseCodeBox';

import { GetCourseByIdResponse } from '@/types/course.type';
import { Fragment } from 'react';
import { CustomIconButton } from '@/components/Custom/CustomButton';

interface ExerciseProps {
	course: GetCourseByIdResponse;
	customizeButton: Function | null;
	code: string;
	createDocumentModal: Function | null;
	changePublishDocument: Function;
	isCreator: boolean;
}
const Exercise = (props: ExerciseProps) => {

	const { course, customizeButton, code, createDocumentModal, changePublishDocument, isCreator } = props;


	return (
		<TabLayout
			header={
				<CourseTabHeader
					background={course.courseTheme}
					title={course.title}
					subtitle={course.courseSubject}
					customizeButton={customizeButton ? customizeButton : null}
				/>
			}
			leftBody={
				createDocumentModal ? (
					<Fragment>
						<CustomIconButton
							onClick={() => {
								createDocumentModal();
							}}
							startIcon={<CreateIcon />}
							content="Create Document"
						/>
						<CourseCodeBox code={code} />
					</Fragment>
				) : null
			}
			rightBody={
				<ListItems
					isCreator={isCreator}
					list={course ? course.documents : []}
					publishDocument={changePublishDocument}
				/>
			}
		/>
	);
};

export default Exercise;
