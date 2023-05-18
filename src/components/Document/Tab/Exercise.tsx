import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { CodeEditor } from '@/components/CodeEditor';
import DocumentTabLayout from '@/layouts/DocumentTabLayout';
import { CreateExerciseRequest } from '@/types/document.type';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { ChangeEvent, Fragment, useState } from 'react';

const BoxFieldSx = {
	width: '100%',
	padding: '5px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexDirection: 'column',
	'& .MuiTextField-root': { m: 1, width: '100%' }
};
const FormGroupDeadlineSx = {
	rowGap: 1
};
interface ExerciseProps {
	onCreate?: Function;
	onUpdate?: Function;
	isCreator: boolean;
	title: string;
}

const Exercise = (props: ExerciseProps) => {
	const InitialCreateExerciseForm: CreateExerciseRequest = {
		manualPercentage: 0,
		memoryLimit: 50000,
		runtimeLimit: 2000,
		scoreWeight: 1
	};
	const { title, isCreator, onCreate, onUpdate } = props;

	const [CreateExerciseForm, setCreateExerciseForm] = useState<CreateExerciseRequest>(InitialCreateExerciseForm);
	const [DeadlineCheck, setDeadlineCheck] = useState(false);
	const [StrictDeadlineCheck, setStrictDeadlineCheck] = useState(false);
	const { runtimeLimit, manualPercentage, memoryLimit, scoreWeight } = CreateExerciseForm;

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCreateExerciseForm({
			...CreateExerciseForm,
			[e.target.name]: e.target.value
		});
	};

	return (
		<DocumentTabLayout
			title={title}
			left={isCreator ? <CodeEditor /> : <MarkdownPreview source="Exercise" />}
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
									value={runtimeLimit}
									onChange={onChange}
								/>
								<TextField
									fullWidth
									required
									label="Memory limit (bytes):"
									type="number"
									name="memoryLimit"
									value={memoryLimit}
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
									value={scoreWeight}
									onChange={onChange}
								/>
								<TextField
									fullWidth
									required
									label="Manual Percentage"
									type="number"
									name="manualPercentage"
									value={manualPercentage}
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
										columnGap: 2
									}}
									control={
										<TextField
											fullWidth
											required
											label="Deadline"
											type="datetime-local"
											name="deadline"
											// value={runtimeLimit}
										/>
									}
								/>
							</FormGroup>
						</Box>
					</Fragment>
				) : (
					<CodeEditor />
				)
			}
		>
			{<></>}
		</DocumentTabLayout>
	);
};
export default Exercise;
