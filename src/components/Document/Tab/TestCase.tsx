import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';

import DocumentTabLayout from '@/layouts/DocumentTabLayout';
import { BoxFieldSx } from '@/style/BoxSx';
import { GetDocumentByIdResponse, GetSingleTestCaseResponse } from '@/types/document.type';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTestCases } from '@/slices/document.slice';
import { getDocumentTestCases } from '@/selectors/document.selector';
import TestCaseItem from '../TestCaseItem';
import { LinearLoading } from '@/components/Loading';
import CustomDialog from '@/components/Custom/CustomDialog';

interface TestCaseProps {
	document: GetDocumentByIdResponse;
	onCreate: Function;
	onUpdate: Function;
	onDelete: Function;
}

const TestCase = (props: TestCaseProps) => {
	const { document, onDelete, onCreate, onUpdate } = props;

	const dispatch = useDispatch();
	const testCases = useSelector(getDocumentTestCases);

	const InitialTestCaseForm: GetSingleTestCaseResponse = {
		Id: '',
		input: '',
		output: '',
		scoreWeight: 0,
		TestOrder: 0,
		visibility: false
	};

	const [SeletedTestCase, setSeletedTestCase] = useState<GetSingleTestCaseResponse>(InitialTestCaseForm);
	const [OpenDeleteTestCaseDialog, setOpenDeleteTestCaseDialog] = useState(false);

	const { input, output, scoreWeight, visibility } = SeletedTestCase;

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {};
	const onSelected = () => {};

	useEffect(() => {
		dispatch(fetchAllTestCases({ documentId: document.Id }));
	}, []);

	useEffect(() => {
		if (testCases && testCases.length > 0) {
			setSeletedTestCase(testCases[0]);
		}
	}, [testCases]);

	return (
		<Fragment>
			{testCases === null ? (
				<LinearLoading />
			) : testCases === undefined ? (
				'Please Create Excise to Create Test Cases.'
			) : (
				<DocumentTabLayout
					title={document.Title}
					childrenPosition={true}
					right={
						testCases.length > 0 ? (
							<Stack
								flexDirection="column"
								alignItems="center"
								justifyContent="flex-start"
								rowGap="2"
								minHeight="inherit"
							>
								<Stack
									flexDirection="column"
									alignItems="flex-start"
									justifyContent="center"
									rowGap="2"
									width={'100%'}
								>
									<Box sx={BoxFieldSx}>
										<TextField
											fullWidth
											required
											label="Input:"
											multiline
											value={input}
											maxRows={4}
											minRows={4}
											name="input"
										/>
										<TextField
											fullWidth
											required
											label="Output:"
											multiline
											value={output}
											maxRows={4}
											minRows={4}
											name="output"
										/>
										<TextField
											fullWidth
											required
											value={scoreWeight}
											label="Score Weight:"
											type="number"
											name="scoreWeight"
										/>
									</Box>
									<FormControlLabel
										control={
											<Checkbox
												name="visibility"
												checked={visibility}
												value={visibility}
												// // onChange={onChange}
												// onClick={() => {
												// 	setStrictDeadlineCheck(!StrictDeadlineCheck);
												// }}
											/>
										}
										label="Student can yee deadline Input/Output"
									/>
								</Stack>
							</Stack>
						) : null
					}
					left={
						<Fragment>
							<Box></Box>
							{testCases && testCases.length > 0 ? (
								testCases.map((item, index) => {
									return (
										<TestCaseItem
											key={index}
											item={item}
											index={index}
											onSelected={onSelected}
											onDeleted={() => {
												setOpenDeleteTestCaseDialog(true);
												setSeletedTestCase(item);
											}}
										/>
									);
								})
							) : (
								<></>
							)}
						</Fragment>
					}
				>
					{testCases.length > 0 ? (
						<LoadingButton
							size="large"
							fullWidth
							sx={{ padding: '10px' }}
							// onClick={() => { onUpdate ? onUpdate(ExerciseForm, Source, document.Id) : () => { console.log('Update Error') } }}
							endIcon={<SaveIcon />}
							// loading={loading}
							loadingPosition="end"
							variant="contained"
						>
							<span>Save</span>
						</LoadingButton>
					) : null}
				</DocumentTabLayout>
			)}
			<CustomDialog
				onCancel={() => setOpenDeleteTestCaseDialog(false)}
				onSave={() => {
					// onDelete(SeletedTestCase.TestOrder)
					setOpenDeleteTestCaseDialog(false);
				}}
				open={OpenDeleteTestCaseDialog}
				title="Delete Test Case"
				content="Do you want to delete this test case?"
			/>
		</Fragment>
	);
};

export default TestCase;
