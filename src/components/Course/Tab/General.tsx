import CreateIcon from '@mui/icons-material/Create';

import TabLayout from '@/layouts/TabLayout';
import CourseTabHeader from '../CourseHeader';
import ListItems from '../../ListItems';
import CourseCodeBox from '../CourseCodeBox';

import { GetCourseByIdResponse } from '@/types/course.type';
import { Fragment } from 'react';
import { CustomIconButton } from '@/components/Custom/CustomButton';

interface GeneralProps {
	course: GetCourseByIdResponse;
	customizeButton: Function | null;
	code: string;
	createDocumentModal: Function;
}
const General = (props: GeneralProps) => {
	const { course, customizeButton, code, createDocumentModal } = props;

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
			}
			rightBody={<ListItems list={course ? course.documents : []} />}
		/>
	);
};

export default General;
