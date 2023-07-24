
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';

import Editor, { loader } from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSampleSourceCode } from '@/selectors/document.selector';
import { flexBox } from '@/style/Variables';
import { CustomOnlyIconButton } from './Custom/CustomButton';
import Tooltip from '@mui/material/Tooltip';
import { LocalStorageService } from '@/services/localStorageService';
import CountdownTimer from './Countdown';
import { getProgrammingLanguages } from '@/selectors/config.selector';
import { fetchProgrammingLanguages } from '@/slices/config.slice';

interface CodeEditorProps {
	documentId: string;
	onGetSampleSourceCode: Function;
	isCreator?: boolean;
	getSource: Function;
	source: string;
	language: number;
	resetTempSource?: Function;
	deadline?: number | null;
}
export const CodeEditor = (props: CodeEditorProps) => {

	const {
		documentId,
		onGetSampleSourceCode,
		getSource,
		source,
		isCreator,
		language,
		resetTempSource,
		deadline
	} = props;

	const initial = '// Input your code here';
	const loading = 'Loading...';

	loader.init().then((monaco) => {
		// Monaco Editor is initialized and ready to use
	});

	const dispatch = useDispatch()
	const ProgrammingLaguages = useSelector(getProgrammingLanguages)
	const SampleSourceCode = useSelector(getSampleSourceCode);

	const [Language, setLanguage] = useState(language);
	const [Theme, setTheme] = useState('vs');
	const [Value, setValue] = useState(source);


	const onLanguageChange = (event: SelectChangeEvent) => {

		let type = event.target.value;

		setLanguage(Number(type));
		if (!source)
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

	const getLanguageName = (type: number) => {
		return ProgrammingLaguages && ProgrammingLaguages.length > 0 ? ProgrammingLaguages.filter(item => item.Id === type)[0].LanguageName : ''
	}

	useEffect(() => {
		if (!source) {
		
			if (SampleSourceCode && Object.keys(SampleSourceCode).length > 0) {
				
				setValue(SampleSourceCode.sourceCode);
				setLanguage(Number(SampleSourceCode.programmingLanguageId))
				getSource(SampleSourceCode.sourceCode, SampleSourceCode.programmingLanguageId);
			} else if (SampleSourceCode === undefined) {
				setValue(loading);

			} else if (SampleSourceCode === null) {
				setValue(initial);
			}
		}
	}, [SampleSourceCode]);

	useEffect(() => {
		if (source) {
			setValue(source);
		}
		if (language) {
			setLanguage(language);
		}
	}, [source, language]);

	// useEffect(() => {
	// 	if (ProgrammingLaguages && ProgrammingLaguages.length > 0) {

	// 		setLanguage(ProgrammingLaguages[0].Id)
	// 	}
	// }, [ProgrammingLaguages])


	useEffect(() => {
		if (ProgrammingLaguages === null) {
			dispatch(fetchProgrammingLanguages())
		}
		if (SampleSourceCode === null)
			onGetSampleSourceCode(documentId, Number(Language));
	}, [])



	return (
		<Stack
			height='100%'
		>
			<Stack flexDirection="row" justifyContent="flex-start">
				<Box width="30%" sx={{ flexGrow: 1 }}>
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
				<Box width="20%" sx={{ display: 'flex', flexGrow: 1 }}>
					<FormControl fullWidth  >
						<Select

							value={ProgrammingLaguages && ProgrammingLaguages.length > 0 ? Language.toString() : ''}
							onChange={onLanguageChange}
							sx={{ '.MuiSelect-select': { padding: '10px', paddingLeft: '5%' } }}
						>
							{
								ProgrammingLaguages ?
									ProgrammingLaguages.length > 0 ?
										ProgrammingLaguages.map((item, index) => {
											return <MenuItem key={index} value={item.Id} >{item.DisplayName}</MenuItem>
										})
										: " "
									: " "
							}

						</Select>
					</FormControl>
					<Tooltip title="Reset for getting Sample Code" >
						<span>
							<CustomOnlyIconButton
								disabled={isCreator}
								onClick={() => {
									resetTempSource ? resetTempSource(Language) : null;
									LocalStorageService.clearCodeCache();
									onGetSampleSourceCode(documentId, Number(Language));
								}}
							>
								<RestartAltOutlinedIcon />
							</CustomOnlyIconButton>
						</span>
					</Tooltip>

				</Box>

				{!isCreator ? (
					deadline || deadline === 0 ? (
						<Box sx={{ flexGrow: 1 }}>
							<Box sx={flexBox('center', 'center', 'row')}>
								{/* <Box sx={flexBox('center', 'center', 'row')}>Deadline:</Box> */}
								<CountdownTimer targetDate={deadline} />
							</Box>
						</Box>
					) : null
				) : null}
			</Stack>
			<Box sx={{ flex: 1 }}>
				<Editor

					options={{ theme: Theme }}
					language={getLanguageName(Language)}
					value={Value}
					onChange={onValueChange}
				/>
			</Box>
		</Stack>
	);
};
