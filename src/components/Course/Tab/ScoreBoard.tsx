import DataGridListItems from '@/components/DataGridListItems';
import { CircleLoading } from '@/components/Loading';
import TabLayout from '@/layouts/TabLayout';
import { getCourseScore } from '@/selectors/course.selector';
import { fetchCourseScoreById } from '@/slices/course.slice';
import { centerPos } from '@/style/Variables';
import { CourseScore, CourseScoreDetail } from '@/types/course.type';
import { Box, Button, Typography } from '@mui/material';

import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CourseScoreDetailModal from '../CourseScoreDetailModal';
import NoItemsFound from '@/components/NoItemsFound';

interface ScoreBoardProps {
	courseId: string;
}
const ScoreBoard = (props: ScoreBoardProps) => {
	const { courseId } = props;

	const dispatch = useDispatch();

	const courseScore = useSelector(getCourseScore);
	const [openCourseScoreDetailModal, setOpenCourseScoreDetailModal] = useState(false);
	const [scoreDetailList, setScoreDetailList] = useState<Array<CourseScoreDetail>>([]);

	const renderList = (courseScore: Array<CourseScore>) => {

		let result = courseScore.map((item) => {
			return {
				...item,
				'Details': <Button
					variant="contained"
					size="small"
					onClick={() => {
						setOpenCourseScoreDetailModal(true)
						setScoreDetailList(item.Details)
					}}
				>
					View
				</Button>
			}
		})
		return result
	}

	useEffect(() => {
		dispatch(fetchCourseScoreById({ courseId: courseId }));
	}, []);

	return (
		<Fragment>
			<TabLayout
				header={<></>}
				rightBody={
					courseScore && courseScore.length > 0 ?
						<DataGridListItems
							columns={['Username', 'Full Name', 'Email', 'Score', "Details"]}
							rows={renderList(courseScore)}
							onSelected={() => { }}
							title={'List Scores'}
						/>
						: courseScore === null ?
							<Box sx={centerPos}>
								<CircleLoading />
							</Box>
							:
							<NoItemsFound  msg='No records found.'/>

				}
			/>
			<CourseScoreDetailModal
				open={openCourseScoreDetailModal}
				onCancel={() => {
					setOpenCourseScoreDetailModal(false)
					setScoreDetailList([])
				}}
				list={scoreDetailList}
			/>
		</Fragment>

	);
};

export default ScoreBoard;
