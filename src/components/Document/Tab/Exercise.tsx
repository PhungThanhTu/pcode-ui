import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import Switch from '@mui/material/Switch';

import { CodeEditor } from '@/components/CodeEditor';
import DocumentTabLayout from '@/layouts/DocumentTabLayout';
import {
	CreateSubmissionRequest,
	GetDocumentByIdResponse,
	GetExerciseResponse,
	UpdateSampleSourceCodeRequest
} from '@/types/document.type';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import Content, { ContentProps } from './Content';
import { useDispatch, useSelector } from 'react-redux';
import { getDocumentExercise } from '@/selectors/document.selector';
import { LinearLoading } from '@/components/Loading';
import CustomDialog from '@/components/Custom/CustomDialog';
import { CustomIconButton } from '@/components/Custom/CustomButton';
import { getNextDay, parseToLocalDate } from '@/utils/convert';
import { centerPos } from '@/style/Variables';
import { BoxFieldSx } from '@/style/BoxSx';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Tooltip, Typography } from '@mui/material';
import { LocalStorageService } from '@/services/localStorageService';
import { fetchExercise } from '@/slices/document.slice';
import { useParams } from 'react-router-dom';
import { getJudgers } from '@/selectors/config.selector';
import { fetchJudgers } from '@/slices/config.slice';
import { SourceCode } from 'eslint';


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
	rowGap: 1,
	width: '100%'
};

interface ExerciseProps {
	onCreate?: Function;
	onUpdate?: Function;
	onSubmit?: Function;
	onGetSampleSourceCode: Function;
	isCreator: boolean;
	content?: ContentProps;
	document: GetDocumentByIdResponse;
}

const Exercise = (props: ExerciseProps) => {
	const params = useParams();
	const dispatch = useDispatch();


	const judgers = useSelector(getJudgers)
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
		TimeCreated: '',
		JudgerId: ''
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
	const [TargetDeadline, setTargetDeadline] = useState<number | null>(0);
	const [DisableSubmission, setDisableSubmission] = useState(true);
	const [TempSource, setTempSource] = useState<CreateSubmissionRequest>();
	const [Judger, setJudger] = useState('')

	const {
		ManualPercentage,
		MemoryLimit,
		RuntimeLimit,
		ScoreWeight,
		Deadline,
		HaveDeadline,
		StrictDeadline,
		TimeCreated,
		JudgerId
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

			setExerciseForm({
				...ExerciseForm,
				[name]: Number(e.target.value) >= 0 ? e.target.value : 0
			});
		}
	};

	const getSource = (source: string, type: number) => {
		SetSource({
			...Source,
			sampleSourceCode: source,
			type: type
		});
		if (TempSource) {
			setTempSource({
				programmingLanguageId: type,
				sourceCode: source
			})
		}
	};


	const handleChangeJudgers = (e: SelectChangeEvent) => {

		let name = e.target.name.charAt(0).toUpperCase() + e.target.name.slice(1);
		setJudger(e.target.value as string)
		setExerciseForm({
			...ExerciseForm,
			[name]: e.target.value
		});
	};

	useEffect(() => {

		if (exercise) {
			setExerciseForm({ ...exercise });
			setDeadlineCheck(exercise.HaveDeadline ? exercise.HaveDeadline : false);
			setStrictDeadlineCheck(exercise.StrictDeadline ? exercise.StrictDeadline : false);

			let nextDay = getNextDay();

			if (!exercise.Deadline) {
				setExerciseForm({
					...exercise,
					Deadline: new Date(nextDay).toISOString()
				});
				setDisableSubmission(false);
			} else if (exercise.HaveDeadline) {
				let now_in_mins = new Date().getTime();
				let targetDate = new Date(exercise.Deadline).getTime();

				if (targetDate < now_in_mins) {
					setTargetDeadline(0);
					if (exercise.StrictDeadline) setDisableSubmission(true);
					else setDisableSubmission(false);
				} else {
					setTargetDeadline(targetDate)
					setDisableSubmission(false)
				};
			} else {

				setDisableSubmission(false);
				setTargetDeadline(null);
			}
		}
	}, [exercise]);

	useEffect(() => {
		if (judgers && judgers.length > 0) {
			setJudger(judgers[0].Id)
		}
	}, [judgers])

	useEffect(() => {
		if (exercise === null) {
			dispatch(fetchExercise({ documentId: params.documentId ? params.documentId : '' }));
			LocalStorageService.clearCodeCache();
		}
		if (judgers === null) {
			dispatch(fetchJudgers())
		}

		let codeCache = LocalStorageService.getCodeCache();

		if (codeCache) {
			setTempSource({ ...codeCache });
			SetSource({
				sampleSourceCode: codeCache.sourceCode,
				type: codeCache.programmingLanguageId,
			})
		}
		else {
			setTempSource(undefined);
			SetSource({
				sampleSourceCode: '',
				type: 1,
			})
			onGetSampleSourceCode(params.documentId ? params.documentId : '', 1)
		}
	}, []);

	// useEffect(() => {
	// 	if (TempSource) {
	// 		SetSource({
	// 			sampleSourceCode: TempSource.sourceCode,
	// 			type: TempSource.programmingLanguageId,
	// 		})
	// 	}

	// }, [TempSource])

	return (
		<Fragment>
			{exercise === undefined ? (
				<LinearLoading />
			) : exercise === null ? (
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
							deadline={TargetDeadline}
							source={TempSource ? TempSource.sourceCode : ""}
							language={TempSource ? TempSource.programmingLanguageId : 1}
							documentId={document.Id}
							isCreator={isCreator}
							onGetSampleSourceCode={onGetSampleSourceCode}
							getSource={getSource}

							resetTempSource={(id: number) => {
								setTempSource(undefined);
							}}
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
											size='small'
											fullWidth
											required
											label="Runtime limit (ms):"
											type="number"
											name="runtimeLimit"
											value={RuntimeLimit}
											onChange={onChange}
										/>
										<TextField
											size='small'
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
											size='small'
											fullWidth
											required
											label="Score Weight"
											type="number"
											name="scoreWeight"
											value={ScoreWeight}
											onChange={onChange}
										/>
										<TextField
											size='small'
											fullWidth
											required
											label="Manual Rate"
											type="number"
											name="manualPercentage"
											value={ManualPercentage}
											onChange={onChange}
										/>
									</Box>
								</Stack>
								<Box sx={BoxFieldSx}>
									<FormControl
										fullWidth
										size='small'
									>
										<InputLabel id="judger-select">Judger</InputLabel>
										<Select
											labelId="judger-select"
											label="Judger"
											name="judgerId"
											id='judger'
											value={judgers && judgers.length > 0 ? JudgerId : ""}
											onChange={handleChangeJudgers}>
											{
												judgers ?
													judgers.length > 0 ?
														judgers.map((item, index) => {
															return <MenuItem key={index} value={item.Id}>{item.DisplayName}</MenuItem>
														})
														: " "
													:
													" "
											}

										</Select>
									</FormControl>
								</Box>
								<Box sx={{ ...BoxFieldSx, alignContent: 'flex-start' }}>
									<FormGroup sx={FormGroupDeadlineSx}  >
										<FormControlLabel
											control={
												<Switch
													size='small'
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
												<Switch
													size='small'
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
												marginLeft: 0,
												columnGap: 1
											}}
											control={
												<TextField
													size='small'
													fullWidth
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
							<Content source={content?.source} title={''} type={content ? content.type : 3} contentBody={document.Contents.length > 0 ? document.Contents[0].ContentBody : ""} />
						)
					}
				>
					{isCreator ? (
						<Tooltip title='Save'>
							<LoadingButton
								size="large"
								fullWidth
								sx={{
									borderRadius: `0 0 0 0`,
									'>span': {
										margin: 0
									}
								}}
								onClick={() => {
									onUpdate
										? onUpdate(ExerciseForm, Source, document.Id, JudgerId)
										: () => {
											console.log('Update Error');
										};
								}}
								endIcon={<SaveIcon />}

								loadingPosition="end"
								variant="contained"
							/>
						</Tooltip>
					) : (
						<Tooltip title='Submit'>
							<div style={{ width: '100%' }}>
								<LoadingButton
									size="large"
									fullWidth
									sx={{
										borderRadius: `0 0 0 0`,
										'>span': {
											margin: 0
										}
									}}
									onClick={() => {
										onSubmit
											? onSubmit(TempSource ? { sampleSourcecode: TempSource.sourceCode, type: TempSource.programmingLanguageId } : Source, document.Id)
											: () => {
											};

										let temp = {
											programmingLanguageId: Source.type,
											sourceCode: Source.sampleSourceCode
										};
										LocalStorageService.setCodeCache(temp);
										setTempSource(temp);
									}}
									endIcon={<SendIcon />}
									loadingPosition="end"
									variant="contained"
									disabled={DisableSubmission}
								/>
							</div>
						</Tooltip>

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
						? onCreate(document.Id, Judger)
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
