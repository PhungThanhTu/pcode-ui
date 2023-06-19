import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { GridRowParams } from '@mui/x-data-grid/models/params/gridRowParams';

import DocumentTabLayout from '@/layouts/DocumentTabLayout';
import {
	getDocumentSingleSubssion,
	getDocumentSubmissionsManage,
	getDocumentSubssions
} from '@/selectors/document.selector';
import { GetDocumentByIdResponse, SubmissionManage } from '@/types/document.type';
import { useDispatch, useSelector } from 'react-redux';
import DocumentSubmissionItem from '../DocumentSubmissionItem';
import { borderRadius, centerPos } from '@/style/Variables';
import { Fragment, useEffect, useState } from 'react';
import DocumentTestResultItem from '../DocumentTestResultItem';
import { CircleLoading } from '@/components/Loading';
import { CodeEditor } from '@/components/CodeEditor';
import DataGridListItems from '@/components/DataGridListItems';
import TextField from '@mui/material/TextField';
import { fetchAllSubmissions, fetchAllSubmissionsManage } from '@/slices/document.slice';
import { useParams } from 'react-router-dom';
import { Tooltip } from '@mui/material';

interface SubmissionProps {
	document: GetDocumentByIdResponse;
	onMark?: Function;
	onSelected: Function;
	isCreator: boolean;
	onScore?: Function;
}

const Submission = (props: SubmissionProps) => {
	const { document, onMark, onSelected, onScore, isCreator } = props;

	const params = useParams();
	const dispatch = useDispatch();

	const [SelectedSubmissionManage, setSelectedSubmissionManage] = useState<SubmissionManage>();
	const [ManualScore, setManualScore] = useState<number | string>(0);
	const [SourceCodeSubmissionManage, setSourceCodeSubmissionManage] = useState('');

	const onSelectSubmissionManage = (params: GridRowParams) => {
		setSelectedSubmissionManage(params.row);
		setManualScore(params.row.ManualScore ? params.row.ManualScore : 0);
		setSourceCodeSubmissionManage(params.row.SourceCode ? params.row.SourceCode : ' ');
	};

	const submissions = useSelector(getDocumentSubssions);
	const submission = useSelector(getDocumentSingleSubssion);
	const submissionsmanage = useSelector(getDocumentSubmissionsManage);

	useEffect(() => {
		if (isCreator) {
			if (submissionsmanage === null)
				dispatch(fetchAllSubmissionsManage({ documentId: params.documentId ? params.documentId : '' }));
		} else dispatch(fetchAllSubmissions({ documentId: params.documentId ? params.documentId : '' }));
	}, []);

	return (
		<DocumentTabLayout
			title={document.Title}
			childrenPosition={false}
			left={
				isCreator ? (
					submissionsmanage && submissionsmanage.length > 0 && SelectedSubmissionManage ? (
						<CodeEditor
							language={SelectedSubmissionManage.ProgrammingLanguageId}
							source={SourceCodeSubmissionManage}
							readOnly={true}
							isCreator={isCreator}
							documentId={document.Id}
							onGetSampleSourceCode={() => { }}
							getSource={() => { }}
						/>
					) : (
						<Typography sx={centerPos} variant="subtitle1">
							Choose one submission for manually scoring.
						</Typography>
					)
				) : (
					<Box sx={{ overflowY: 'auto' , height: 'inherit'}}>
						<Typography variant="subtitle2" sx={{ padding: '6px 8px', display: 'block' }}>
							Please note that the score displaying is the score provided by automated judging system, not
							total score of the exercise
						</Typography>
						<Stack
							padding="5%"
							rowGap={1}
							overflow={'auto'}
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
												if (onMark) onMark({ documentId: document.Id, submissionId: item.Id });
											}}
										/>
									);
								})
							) : (
								<></>
							)}
						</Stack>
					</Box>
				)
			}
			right={
				isCreator ? (
					<Box sx={{ overflowY: 'auto' , height: 'inherit'}}>
						<Stack rowGap={2} width="100%" alignItems="center" justifyContent="center">
							{submissionsmanage && submissionsmanage.length > 0 ? (
								<DataGridListItems
									rows={submissionsmanage}
									columns={['Full Name', 'Automatec Score', 'Manual Score', 'Submission Id']}
									onSelected={onSelectSubmissionManage}
								/>
							) : null}
						</Stack>
					</Box>
				) : (
					<Fragment>
						{submission ? (
							<Box sx={{ overflowY: 'auto' , height: 'inherit'}}>
								<Typography sx={{ padding: '6px 8px', display: 'block' }}>
									Selected submission: {submission.Id}
								</Typography>
								<Stack
									padding="5%"
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
										<Box sx={centerPos}>
											<CircleLoading />
										</Box>
									)}
								</Stack>
							</Box>
						) : submission === undefined ? (
							<Box sx={centerPos}>
								<CircleLoading />
							</Box>
						) : (
							<Typography sx={{ ...centerPos, top: '35%' }} variant="h6">
								Click eyes icon to view test result of submission.
							</Typography>
						)}
					</Fragment>
				)
			}
		>
			{isCreator ? (
				submissionsmanage && submissionsmanage.length > 0 && SelectedSubmissionManage ? (
					<Fragment>
						<TextField
							fullWidth
							required
							value={ManualScore}
							onChange={(e) => {
								setManualScore(Number(e.target.value) >= 0 ? e.target.value : 0);
							}}
							label="Score: "
							type="number"
							name="score"
							size="small"
							sx={{
								'.MuiInputBase-root': {
									borderRadius: `0`,
									backgroundColor: 'white'
								}
							}}
						/>
						<Tooltip title='Submit'>
							<LoadingButton
								size="large"
								fullWidth
								sx={{
									borderRadius: `0`,
									'>span': {
										margin: 0
									}
								}}
								onClick={() => {
									onScore
										? onScore({
											score: ManualScore,
											Ids: {
												documentId: document.Id,
												submissionId: SelectedSubmissionManage.SubmissionId
											}
										})
										: () => {
											console.log('Submit Error.');
										};
								}}
								endIcon={<SendIcon />}
								loadingPosition="end"
								variant="contained"
							/>
						</Tooltip>

					</Fragment>
				) : null
			) : null}
		</DocumentTabLayout>
	);
};

export default Submission;
