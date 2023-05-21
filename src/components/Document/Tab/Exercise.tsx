import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

import { CodeEditor } from '@/components/CodeEditor';
import DocumentTabLayout from '@/layouts/DocumentTabLayout';
import { CreateExerciseRequest, GetDocumentByIdResponse, getExerciseResponse } from '@/types/document.type';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import Content, { PreviewProps } from './Content';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDocumentByIdWithExercise } from '@/slices/document.slice';
import { getDocumentExercise } from '@/selectors/document.selector';
import { LinearLoading } from '@/components/Loading';
import CustomDialog from '@/components/Custom/CustomDialog';
import { CustomIconButton } from '@/components/Custom/CustomButton';
import { parseToISOSDate, parseToLocalDate } from '@/utils/convert';


const BoxFieldSx = {
	width: '100%',
	padding: '5px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexDirection: 'column',
	'& .MuiTextField-root': { m: 1, width: '100%' }
};
const BoxCreateSx = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	padding: '20px',
	transform: 'translate(-50%, -50%)',
	'& .MuiButton-root': {
		width: '100%',
		height: '100%',
		padding: '20px'
	}
};
const FormGroupDeadlineSx = {
	rowGap: 1
};
interface ExerciseProps {
	onCreate?: Function;
	onUpdate?: Function;
	onSubmit?: Function;
	onGetSampleSourceCode: Function;
	isCreator: boolean;
	content?: PreviewProps;
	document: GetDocumentByIdResponse;
}

const Exercise = (props: ExerciseProps) => {
	const dispatch = useDispatch();
	const exercise = useSelector(getDocumentExercise);


	const InitialUpdateExerciseForm: getExerciseResponse = {
		ManualPercentage: 0,
		MemoryLimit: 50000,
		RuntimeLimit: 2000,
		ScoreWeight: 1,
		Id: '',
		Deadline: '',
		HaveDeadline: true,
		StrictDeadline: false,
		TimeCreated: ''
	};
	const { document, isCreator, onCreate, onUpdate, content, onSubmit, onGetSampleSourceCode } = props;

	const [ExerciseForm, setExerciseForm] = useState<getExerciseResponse>(InitialUpdateExerciseForm);
	const [DeadlineCheck, setDeadlineCheck] = useState(false);
	const [StrictDeadlineCheck, setStrictDeadlineCheck] = useState(false);
	const [OpenCreateExerciseDialog, setOpenCreateExerciseDialog] = useState(false);

	const { ManualPercentage, MemoryLimit, RuntimeLimit, ScoreWeight, Deadline, HaveDeadline, StrictDeadline, TimeCreated } = ExerciseForm;

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setExerciseForm({
			...ExerciseForm,
			[e.target.name]: e.target.value
		});
	};


	useEffect(() => {
		dispatch(fetchDocumentByIdWithExercise({ documentId: document.Id }));
	}, []);

	useEffect(() => {
		if (exercise) {
			setExerciseForm({ ...exercise })
			setDeadlineCheck(exercise.HaveDeadline)
			setStrictDeadlineCheck(exercise.StrictDeadline)
		}
	}, [exercise])
	return (
		<Fragment>
			{exercise === null ? (
				<LinearLoading />
			) : exercise === undefined ? (
				<Box sx={BoxCreateSx}>
					<CustomIconButton
						onClick={() => {
							setOpenCreateExerciseDialog(true);
						}}
						content="Create Exercise"
						startIcon={<NoteAddIcon />}
						variant="outlined"
					/>
				</Box>
			) : (
				<DocumentTabLayout
					title={document.Title}
					left={
						<CodeEditor
							document={document}
							isCreator={isCreator}
							onGetSampleSourceCode={onGetSampleSourceCode}
						/>
					}
					right={
						isCreator ? (
							<Fragment>
								<Stack flexDirection="row" alignItems="center" justifyContent="center" rowGap="2">
									<Box sx={BoxFieldSx}>
										<TextField
											fullWidth
											required
											label="Runtime limit (ms):"
											type="number"
											name="runtimeLimit"
											value={RuntimeLimit}
											onChange={onChange}
										/>
										<TextField
											fullWidth
											required
											label="Memory limit (bytes):"
											type="number"
											name="memoryLimit"
											value={MemoryLimit}
											onChange={onChange}
										/>
									</Box>
									<Box sx={BoxFieldSx}>
										<TextField
											fullWidth
											required
											label="Score Weight"
											type="number"
											name="scoreWeight"
											value={ScoreWeight}
											onChange={onChange}
										/>
										<TextField
											fullWidth
											required
											label="Manual Percentage"
											type="number"
											name="manualPercentage"
											value={ManualPercentage}
											onChange={onChange}
										/>
									</Box>
								</Stack>
								<Box>
									<FormGroup sx={FormGroupDeadlineSx}>
										<FormControlLabel
											control={
												<Checkbox
													checked={DeadlineCheck}
													onClick={() => {
														setDeadlineCheck(!DeadlineCheck);
														setStrictDeadlineCheck(false);
													}}
												/>
											}
											label="Deadline"
										/>
										<FormControlLabel
											disabled={!DeadlineCheck}
											control={
												<Checkbox
													checked={StrictDeadlineCheck && DeadlineCheck}
													onClick={() => {
														setStrictDeadlineCheck(!StrictDeadlineCheck);
													}}
												/>
											}
											label="Strict Deadline"
										/>
										<FormControlLabel
											disabled={!DeadlineCheck}
											labelPlacement="start"
											label="Deadline"
											sx={{
												columnGap: 1
											}}
											control={
												<TextField
													fullWidth
													required
													label="Deadline"
													type="datetime-local"
													name="deadline"
													value={parseToLocalDate(Deadline)}
												/>
											}
										/>
									</FormGroup>
								</Box>
							</Fragment>
						) : (
							<Content source={content?.source} title={''} type={content ? content.type : 3} />
						)
					}
				>
					{<></>}
				</DocumentTabLayout>
			)}
			<CustomDialog
				open={OpenCreateExerciseDialog}
				title="Create Exercise!"
				content="Yes to create exercise with default configs!"
				onCancel={() => {
					setOpenCreateExerciseDialog(false);
				}}
				onSave={() => {
					onCreate ? onCreate(document.Id) : () => { console.log('null action : create Exercise') };
					setOpenCreateExerciseDialog(false);
				}}
			/>
		</Fragment>
	);
};
export default Exercise;
