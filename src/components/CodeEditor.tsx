import Editor, { loader } from '@monaco-editor/react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSampleSourceCode } from '@/selectors/document.selector';
import { GetDocumentByIdResponse } from '@/types/document.type';

interface CodeEditorProps {
	document?: GetDocumentByIdResponse;
	onGetSampleSourceCode: Function;
	isCreator: boolean;
	getSource: Function;
}
export const CodeEditor = (props: CodeEditorProps) => {
	const { document, isCreator, onGetSampleSourceCode, getSource } = props;

	const initial = '// Input your code here';
	const loading = 'Loading...';

	loader.init().then((monaco) => {
		// Monaco Editor is initialized and ready to use
	});

	const dispatch = useDispatch();
	const sourceCode = useSelector(getSampleSourceCode);

	const [Language, setLanguage] = useState('1');
	const [Theme, setTheme] = useState('vs');
	const [Value, setValue] = useState('');
	const [Read, setRead] = useState(false);

	const onChange = (event: SelectChangeEvent) => {
		let type = event.target.value;
		setLanguage(type as string);
		onGetSampleSourceCode(document?.Id, Number(type));
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
		onGetSampleSourceCode(document?.Id, Number(Language));
	}, []);

	useEffect(() => {
		if (sourceCode && Object.keys(sourceCode).length > 0) {
			setRead(false);
			setValue(sourceCode.sourceCode);
			getSource(sourceCode.sourceCode, sourceCode.programmingLanguageId);
		} else if (sourceCode === null) {
			setValue(loading);
			setRead(true);
		} else if (sourceCode === undefined) {
			setValue(initial);
			getSource(initial, Language);
			setRead(false);
		}
	}, [sourceCode]);

	return (
		<Stack minHeight="inherit">
			<Stack flexDirection="row" columnGap={1} justifyContent="space-around">
				<Stack justifyContent="center" alignItems="center" paddingLeft="10px">
					<Typography variant="subtitle1">Language</Typography>
				</Stack>
				<Box width="40%">
					<FormControl fullWidth>
						<Select
							value={Language}
							onChange={onChange}
							sx={{ '.MuiSelect-select': { padding: '10px', paddingLeft: '5%' } }}
						>
							<MenuItem value={'1'}>C</MenuItem>
							<MenuItem value={'2'}>C++</MenuItem>
						</Select>
					</FormControl>
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
					options={{ readOnly: Read, theme: Theme }}
					language={Language === '1' ? 'c' : 'cpp'}
					height={640}
					value={Value}
					onChange={onValueChange}
				/>
			</Box>
		</Stack>
	);
};
