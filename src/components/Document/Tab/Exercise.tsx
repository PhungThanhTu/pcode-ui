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

import { CodeEditor } from '@/components/CodeEditor';
import DocumentTabLayout from '@/layouts/DocumentTabLayout';
import {
	GetDocumentByIdResponse,
	GetExerciseResponse,
	UpdateSampleSourceCodeRequest
} from '@/types/document.type';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import Content, { PreviewProps } from './Content';
import { useSelector } from 'react-redux';
import { getDocumentExercise } from '@/selectors/document.selector';
import { LinearLoading } from '@/components/Loading';
import CustomDialog from '@/components/Custom/CustomDialog';
import { CustomIconButton } from '@/components/Custom/CustomButton';
import { getNextDay, parseToLocalDate } from '@/utils/convert';
import { borderRadius, centerPos } from '@/style/Variables';
import { BoxFieldSx } from '@/style/BoxSx';
import { Typography } from '@mui/material';

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


	const exercise = useSelector(getDocumentExercise);

	const InitialUpdateExerciseForm: GetExerciseResponse = {
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
	const InitialSourceForm: UpdateSampleSourceCodeRequest = {
		sampleSourceCode: '',
		type: 1
	};
	const { document, isCreator, onCreate, onUpdate, content, onSubmit, onGetSampleSourceCode } = props;

	const [ExerciseForm, setExerciseForm] = useState<GetExerciseResponse>(InitialUpdateExerciseForm);
	const [Source, SetSource] = useState<UpdateSampleSourceCodeRequest>(InitialSourceForm);
	const [DeadlineCheck, setDeadlineCheck] = useState(false);
	const [StrictDeadlineCheck, setStrictDeadlineCheck] = useState(false);
	const [OpenCreateExerciseDialog, setOpenCreateExerciseDialog] = useState(false);

	const {
		ManualPercentage,
		MemoryLimit,
		RuntimeLimit,
		ScoreWeight,
		Deadline,
		HaveDeadline,
		StrictDeadline,
		TimeCreated
	} = ExerciseForm;

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		let name = e.target.name.charAt(0).toUpperCase() + e.target.name.slice(1);

		if (name === 'HaveDeadline' || name === 'StrictDeadline') {
			setExerciseForm({
				...ExerciseForm,
				[name]: e.target.checked
			});
		} else if (name === 'Deadline') {
			setExerciseForm({
				...ExerciseForm,
				[name]: e.target.value
			});
		} else {
			let value = Number(e.target.value);
			setExerciseForm({
				...ExerciseForm,
				[name]: value >= 0 ? value : 0
			});
		}
	};

	const getSource = (source: string, type: number) => {
		SetSource({
			...Source,
			sampleSourceCode: source,
			type: type
		});
	};

	useEffect(() => {
		if (exercise) {
			setExerciseForm({ ...exercise });
			setDeadlineCheck(exercise.HaveDeadline ? exercise.HaveDeadline : false);
			setStrictDeadlineCheck(exercise.StrictDeadline ? exercise.StrictDeadline : false);
			let temp = getNextDay();
			if (!exercise.Deadline) {
				setExerciseForm({
					...exercise,
					Deadline: new Date(temp).toISOString()
				});
			}
		}
	}, [exercise]);

	return (
		<Fragment>
			{exercise === null ? (
				<LinearLoading />
			) : exercise === undefined ? (
				isCreator ? (
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
					<Typography sx={centerPos} variant="h5">
						Exercise has not been created!
					</Typography>
				)
			) : (
				<DocumentTabLayout
					childrenPosition={isCreator}
					title={document.Title}
					left={
						<CodeEditor
							documentId={document.Id}
							isCreator={isCreator}
							onGetSampleSourceCode={onGetSampleSourceCode}
							getSource={getSource}
						/>
					}
					right={
						isCreator ? (
							<Stack
								flexDirection="column"
								alignItems="flex-start"
								justifyContent="flex-start"
								rowGap="2"
								minHeight="inherit"
							>
								<Stack
									flexDirection="row"
									alignItems="center"
									justifyContent="center"
									rowGap="2"
									width="100%"
								>
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
								</Stack>
								<Stack
									flexDirection="row"
									alignItems="center"
									justifyContent="center"
									rowGap="2"
									width="100%"
								>
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
													name="haveDeadline"
													checked={DeadlineCheck}
													value={DeadlineCheck}
													onChange={onChange}
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
													name="strictDeadline"
													checked={StrictDeadlineCheck && DeadlineCheck}
													value={StrictDeadlineCheck}
													onChange={onChange}
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
													onChange={onChange}
													value={parseToLocalDate(Deadline)}
												/>
											}
										/>
									</FormGroup>
								</Box>
							</Stack>
						) : (
							<Content source={content?.source} title={''} type={content ? content.type : 3} />
						)
					}
				>
					{isCreator ? (
						<LoadingButton
							size="large"
							fullWidth
							sx={{ padding: '10px' }}
							onClick={() => {
								onUpdate
									? onUpdate(ExerciseForm, Source, document.Id)
									: () => {
										console.log('Update Error');
									};
							}}
							endIcon={<SaveIcon />}
							loadingPosition="end"
							variant="contained"
						>
							<span>Save</span>
						</LoadingButton>
					) : (
						<LoadingButton
							size="small"
							fullWidth
							sx={{
								borderRadius: `0 0 ${borderRadius} ${borderRadius}`
							}}
							onClick={() => {
								onSubmit
									? onSubmit(Source, document.Id)
									: () => {
										console.log('Submit Error.');
									};
							}}
							endIcon={<SendIcon />}
							loadingPosition="end"
							variant="contained"
						>
							<span>Submit</span>
						</LoadingButton>
					)}
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
					onCreate
						? onCreate(document.Id)
						: () => {
							console.log('null action : create Exercise');
						};
					setOpenCreateExerciseDialog(false);
				}}
			/>
		</Fragment>
	);
};
export default Exercise;
