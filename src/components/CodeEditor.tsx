import Editor from '@monaco-editor/react';
import Box from '@mui/material/Box';


import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSampleSourceCode } from '@/slices/document.slice';
import { getSampleSourceCode } from '@/selectors/document.selector';
import { GetDocumentByIdResponse } from '@/types/document.type';

interface CodeEditorProps {
	document?: GetDocumentByIdResponse,
	onGetSampleSourceCode: Function;
	isCreator: boolean
}
export const CodeEditor = (props: CodeEditorProps) => {

	const { document, isCreator, onGetSampleSourceCode } = props

	const dispatch = useDispatch();
	const sourceCode = useSelector(getSampleSourceCode)

	const [Language, setLanguage] = useState('1');
	const [Value, SetValue] = useState('');

	const onChange = (event: SelectChangeEvent) => {
		let type = event.target.value
		setLanguage(type as string);
		onGetSampleSourceCode(document?.Id, Number(type))
	}

	useEffect(() => {
		onGetSampleSourceCode(document?.Id, Number(Language))
	}, [])

	useEffect(() => {
		if (sourceCode && Object.keys(sourceCode).length > 0) {
			SetValue(sourceCode.sourceCode)
		}
	}, [sourceCode])

	return (
		<Stack minHeight="inherit">
			<Stack flexDirection="row" columnGap={1} justifyContent="space-around">
				<Stack justifyContent="center" alignItems="center" paddingLeft="10px">
					<Typography variant="subtitle1">Language Programming</Typography>
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
			</Stack>
			<Box sx={{ flex: 1, paddingTop: '5px' }}>
				<Editor language={Language.toLowerCase()} height={640} defaultValue="//some code" value={Value} theme="light" />
			</Box>
		</Stack>
	);
};
