import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import DocumentTabLayout from '@/layouts/DocumentTabLayout';
import { getDocumentSingleSubssion, getDocumentSubmissionsManage, getDocumentSubssions } from '@/selectors/document.selector';
import { GetDocumentByIdResponse } from '@/types/document.type';
import { useSelector } from 'react-redux';
import DocumentSubmissionItem from '../DocumentSubmissionItem';
import { centerPos } from '@/style/Variables';
import { Fragment } from 'react';
import DocumentTestResultItem from '../DocumentTestResultItem';
import { CircleLoading } from '@/components/Loading';
import { CodeEditor } from '@/components/CodeEditor';
import DocumentSubmissionManageItem from '../DocumentSubmissionManageItem';
import DataGridListItems from '@/components/DataGridListItems';

interface SubmissionProps {
	document: GetDocumentByIdResponse;
	onMark?: Function;
	onSelected: Function;
	isCreator: boolean;
	onScore?: Function;
}

const Submission = (props: SubmissionProps) => {

	const { document, onMark, onSelected, onScore, isCreator } = props;

	const submissions = useSelector(getDocumentSubssions);
	const submission = useSelector(getDocumentSingleSubssion);
	const submissionsmanage = useSelector(getDocumentSubmissionsManage);

	return (
		<DocumentTabLayout
			title={document.Title}
			left={
				isCreator ?
					submissionsmanage && submissionsmanage.length > 0 ?
						<Typography sx={centerPos} variant="subtitle1">
							Choose one submission for manually scoring.
						</Typography>
						:
						<CodeEditor
							readOnly={true}
							isCreator={isCreator}
							documentId={document.Id}
							onGetSampleSourceCode={() => { }}
							getSource={() => { }}
						/>
					:
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
												if (onMark)
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
				isCreator ?
					<Box sx={{ overflow: 'auto', maxHeight: '600px', minHeight: 'inherit' }}>
						<Stack
							padding="10%"
							paddingTop="10%"
							rowGap={2}
							width="100%"
							alignItems="center"
							justifyContent="center"
						>
							{submissionsmanage && submissionsmanage.length > 0 ? (
								// submissionsmanage.map((item, index) => {
								// 	return (
								// 		<DocumentSubmissionManageItem
								// 			key={index}

								// 		/>
								// 	);
								// })
								<DataGridListItems />
							) : (
								<></>
							)}
						</Stack>
					</Box>
					:
					(
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
											return <DocumentTestResultItem key={index} index={index + 1} item={item} />;
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
					)
			}
		></DocumentTabLayout>
	);
};

export default Submission;
