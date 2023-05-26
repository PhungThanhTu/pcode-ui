import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

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
import { CustomIconButton } from '@/components/Custom/CustomButton';
import { centerPos } from '@/style/Variables';

const BoxCreateTestCase = {
	position: 'absolute',
	left: '10px'
};

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
		Id: 1,
		input: '0 0',
		output: '0',
		scoreWeight: 0,
		TestOrder: 0,
		visibility: false
	};

	const [SeletedTestCase, setSeletedTestCase] = useState(1);
	const [TestCaseForm, setTestCaseForm] = useState<GetSingleTestCaseResponse>(InitialTestCaseForm);
	const [OpenDeleteTestCaseDialog, setOpenDeleteTestCaseDialog] = useState(false);
	const [Visibility, setVisibility] = useState(TestCaseForm.visibility);

	const { input, output, scoreWeight, visibility } = TestCaseForm;

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === 'visibility') {
			setTestCaseForm({
				...TestCaseForm,
				[e.target.name]: e.target.checked
			});
		} else if (e.target.name === 'scoreWeight') {
			let value = Number(e.target.value);
			setTestCaseForm({
				...TestCaseForm,
				[e.target.name]: value >= 0 ? value : 0
			});
		} else {
			setTestCaseForm({
				...TestCaseForm,
				[e.target.name]: e.target.checked
			});
		}
	};
	const onSelected = (order: number) => {
		setSeletedTestCase(order);
		let item = FindTestCaseByOrder(order);
		setTestCaseForm(item);
	};

	const FindTestCaseByOrder = (order: number) => {
		let item = testCases?.filter((item) => item.TestOrder === order)[0];

		return item ? item : InitialTestCaseForm;
	};

	const FindTestCaseById = (id: number) => {
		let item = testCases?.filter((item) => item.Id === id)[0];

		return item ? item : InitialTestCaseForm;
	};

	useEffect(() => {
		dispatch(fetchAllTestCases({ documentId: document.Id }));
	}, []);

	useEffect(() => {
		if (testCases && testCases.length > 0) {
			setSeletedTestCase(1);
			let item = FindTestCaseByOrder(1);
			setTestCaseForm(item);
		}
	}, [testCases]);

	return (
		<Fragment>
			{testCases === null ? (
				<LinearLoading />
			) : testCases === undefined ? (
				<Typography sx={centerPos} variant="h5">
					Must have Exercise!
				</Typography>
			) : (
				<DocumentTabLayout
					title={document.Title}
					childrenPosition={true}
					right={
						<Fragment>
							<Typography sx={{ padding: '6px 8px', display: 'block' }}>
								Selected test case: {testCases.length > 0 ? SeletedTestCase : 'No test cases'}
							</Typography>
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
									width="100%"
								>
									<Box component="form" sx={BoxFieldSx}>
										<TextField
											fullWidth
											required
											label="Input:"
											multiline
											value={input}
											maxRows={4}
											minRows={4}
											name="input"
											onChange={onChange}
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
											onChange={onChange}
										/>
										<TextField
											fullWidth
											required
											value={scoreWeight}
											label="Score Weight:"
											type="number"
											name="scoreWeight"
											onChange={onChange}
										/>
									</Box>
									<FormControlLabel
										control={
											<Checkbox
												name="visibility"
												checked={Visibility}
												value={Visibility}
												onChange={onChange}
												onClick={() => {
													setVisibility(!Visibility);
												}}
											/>
										}
										label="Student can yee deadline Input/Output"
									/>
								</Stack>
							</Stack>
						</Fragment>
					}
					left={
						<Box sx={{ overflow: 'auto', maxHeight: '600px', minHeight: 'inherit' }}>
							<Box sx={BoxCreateTestCase}>
								<CustomIconButton
									type="submit"
									form="testform"
									content="New Test Case"
									startIcon={<AddOutlinedIcon />}
									onClick={() => {
										onCreate(document.Id, TestCaseForm);
									}}
								/>
							</Box>
							<Stack
								padding="10%"
								paddingTop="10%"
								rowGap={2}
								width="100%"
								alignItems="center"
								justifyContent="center"
							>
								{testCases && testCases.length > 0 ? (
									testCases.map((item, index) => {
										return (
											<TestCaseItem
												key={index}
												item={item}
												index={item.TestOrder}
												onSelected={() => {
													onSelected(item.TestOrder);
												}}
												onDeleted={() => {
													setOpenDeleteTestCaseDialog(true);
													onSelected(item.TestOrder);
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
				>
					{
						<LoadingButton
							size="large"
							fullWidth
							disabled={!(testCases && testCases.length > 0)}
							sx={{ padding: '10px' }}
							onClick={() => {
								onUpdate(document.Id, TestCaseForm.Id, TestCaseForm);
							}}
							endIcon={<SaveIcon />}
							loadingPosition="end"
							variant="contained"
						>
							<span>Save</span>
						</LoadingButton>
					}
				</DocumentTabLayout>
			)}
			<CustomDialog
				onCancel={() => setOpenDeleteTestCaseDialog(false)}
				onSave={() => {
					onDelete(document.Id, TestCaseForm.Id);
					setOpenDeleteTestCaseDialog(false);
				}}
				open={OpenDeleteTestCaseDialog}
				title="Delete Test Case"
				content={`Do you want to delete this test case: Test Case ${SeletedTestCase}?\n
				Input: ${TestCaseForm.input}\n
				Output: ${TestCaseForm.output}\n
				Score Weight: ${TestCaseForm.scoreWeight}\n
				Visible to others: ${TestCaseForm.visibility}`}
			/>
		</Fragment>
	);
};

export default TestCase;
