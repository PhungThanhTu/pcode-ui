import Editor, { loader } from '@monaco-editor/react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getSampleSourceCode } from '@/selectors/document.selector';
import { borderRadius } from '@/style/Variables';
import { CustomOnlyIconButton } from './Custom/CustomButton';
import Tooltip from '@mui/material/Tooltip';
import { LocalStorageService } from '@/services/localStorageService';


interface CodeEditorProps {

	documentId: string;
	onGetSampleSourceCode: Function;
	isCreator?: boolean;
	getSource: Function;
	source?: string;
	readOnly?: boolean;
	language?: number;
	resetTempSource?: Function;
}
export const CodeEditor = (props: CodeEditorProps) => {

	const { documentId, onGetSampleSourceCode, getSource, readOnly, source, isCreator, language, resetTempSource } = props;

	const initial = '// Input your code here';
	const loading = 'Loading...';

	loader.init().then((monaco) => {
		// Monaco Editor is initialized and ready to use
	});

	const SampleSourceCode = useSelector(getSampleSourceCode);

	const [Language, setLanguage] = useState('1');
	const [Theme, setTheme] = useState('vs');
	const [Value, setValue] = useState('');
	const [Read, setRead] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false)

	const onLanguageChange = (event: SelectChangeEvent) => {
		let type = event.target.value;
		setLanguage(type as string);

		onGetSampleSourceCode(documentId, Number(type));
		getSource(Value, Number(type));
	};

	const onThemeChange = (event: SelectChangeEvent) => {
		let type = event.target.value;
		setTheme(type as string);
	};

	const onValueChange = (value: string | undefined) => {
		setValue(value ? value : '');
		getSource(value, Number(Language));
	};

	useEffect(() => {

		if (!readOnly)
			onGetSampleSourceCode(documentId, Number(Language));
	}, []);

	useEffect(() => {

		if (!source) {
			if (SampleSourceCode && Object.keys(SampleSourceCode).length > 0) {
				setRead(false);
				setValue(SampleSourceCode.sourceCode);
				getSource(SampleSourceCode.sourceCode, SampleSourceCode.programmingLanguageId);
			} else if (SampleSourceCode === undefined) {
				setValue(loading);
				setRead(true);
			} else if (SampleSourceCode === null) {
				setValue(initial);
				getSource(initial, Language);
				setRead(false);
			}
		}
	}, [SampleSourceCode, isEditMode]);

	useEffect(() => {

		if (source) {


			setValue(source)
			if (isCreator) {
				setIsEditMode(true)
				setRead(true)
			}
			else {
				setRead(false)
				setIsEditMode(false)
			}

		}
		if (language) {
			setLanguage(language.toString())
		}
	}, [source])

	return (
		<Stack minHeight="inherit" sx={{ '*': { borderRadius: borderRadius } }}>
			<Stack flexDirection="row" columnGap={1} justifyContent="space-around">
				<Stack justifyContent="center" alignItems="center" paddingLeft="10px">
					<Typography variant="subtitle1">Language</Typography>
				</Stack>
				<Box width="40%" sx={{ display: 'flex' }}>
					<FormControl fullWidth disabled={readOnly || isEditMode}>
						<Select
							value={Language}
							onChange={onLanguageChange}
							sx={{ '.MuiSelect-select': { padding: '10px', paddingLeft: '5%' } }}
						>
							<MenuItem value={'1'}>C</MenuItem>
							<MenuItem value={'2'}>C++</MenuItem>
						</Select>
					</FormControl>
					<CustomOnlyIconButton
						disabled={isCreator}
						onClick={() => {

							resetTempSource ? resetTempSource() : null
							LocalStorageService.clearCodeCache();
							setIsEditMode(false);
							onGetSampleSourceCode(documentId, Number(language));
						}}>
						<Tooltip title="Reset for getting Sample Code">
							<RestartAltOutlinedIcon />
						</Tooltip>
					</CustomOnlyIconButton>
				</Box>
				<Stack justifyContent="center" alignItems="center" paddingLeft="10px">
					<Typography variant="subtitle1">Theme</Typography>
				</Stack>
				<Box width="40%">
					<FormControl fullWidth>
						<Select
							value={Theme}
							onChange={onThemeChange}
							sx={{ '.MuiSelect-select': { padding: '10px', paddingLeft: '5%' } }}
						>
							<MenuItem value={'vs'}>Visual Studio</MenuItem>
							<MenuItem value={'vs-dark'}>Visual Studio Dark</MenuItem>
							<MenuItem value={'hc-black'}>High Contrast Dark</MenuItem>
							<MenuItem value={'hc-light'}>High Contrast Light</MenuItem>
						</Select>
					</FormControl>
				</Box>
			</Stack>
			<Box sx={{ flex: 1, paddingTop: '5px' }}>
				<Editor
					className="code"
					options={{ readOnly: Read || readOnly, theme: Theme }}
					language={Language === '1' ? 'c' : 'cpp'}
					height={640}
					value={Value}
					onChange={onValueChange}
				/>
			</Box>
		</Stack>
	);
};
