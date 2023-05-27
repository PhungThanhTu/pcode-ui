import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import DocumentTabLayout from '@/layouts/DocumentTabLayout';
import { getDocumentSingleSubssion, getDocumentSubssions } from '@/selectors/document.selector';
import { GetDocumentByIdResponse } from '@/types/document.type';
import { useSelector } from 'react-redux';
import DocumentSubmissionItem from '../DocumentSubmissionItem';
import { centerPos } from '@/style/Variables';
import { Fragment } from 'react';
import TestResultItem from '../TestResultItem';
import { CircleLoading } from '@/components/Loading';

interface SubmissionProps {
	document: GetDocumentByIdResponse;
	onMark: Function;
	onSelected: Function;
}

const Submission = (props: SubmissionProps) => {
	const { document, onMark, onSelected } = props;

	const submissions = useSelector(getDocumentSubssions);
	const submission = useSelector(getDocumentSingleSubssion);

	console.log(submission);
	return (
		<DocumentTabLayout
			title={document.Title}
			left={
				<Box sx={{ overflow: 'auto', maxHeight: '600px', minHeight: 'inherit' }}>
					<Typography variant="subtitle1">
						Please note that the score displaying is the score provided by automated judging system, not
						total score of the exercise
					</Typography>
					<Stack
						padding="10%"
						paddingTop="10%"
						rowGap={2}
						width="100%"
						alignItems="center"
						justifyContent="center"
					>
						{submissions && submissions.length > 0 ? (
							submissions.map((item, index) => {
								return (
									<DocumentSubmissionItem
										key={index}
										item={item}
										onSelected={() => {
											onSelected({ documentId: document.Id, submissionId: item.Id });
										}}
										onMark={() => {
											onMark({ documentId: document.Id, submissionId: item.Id });
										}}
									/>
								);
							})
						) : (
							<></>
						)}
					</Stack>
				</Box>
			}
			right={
				submission ? (
					<Fragment>
						<Typography sx={{ padding: '6px 8px', display: 'block' }}>
							Selected submission: {submission.Id}
						</Typography>
						<Stack
							padding="10%"
							paddingTop="10%"
							rowGap={2}
							width="100%"
							alignItems="center"
							justifyContent="center"
						>
							{submission && submission.testResults.length > 0 ? (
								submission.testResults.map((item, index) => {
									return <TestResultItem key={index} index={index + 1} item={item} />;
								})
							) : (
								<Typography sx={{ ...centerPos, top: '35%' }} variant="h6">
									No test results complete.
								</Typography>
							)}
						</Stack>
					</Fragment>
				) : submission === null ? (
					<CircleLoading />
				) : (
					<Typography sx={{ ...centerPos, top: '35%' }} variant="h6">
						Click view icon to see test result of submission.
					</Typography>
				)
			}
		></DocumentTabLayout>
	);
};

export default Submission;
