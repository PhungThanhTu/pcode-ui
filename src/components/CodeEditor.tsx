import Editor from '@monaco-editor/react';
import Box from '@mui/material/Box';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';

export const CodeEditor = () => {
	const [Language, setLanguage] = useState('CSharp');

	const onChange = (event: SelectChangeEvent) => {
		setLanguage(event.target.value as string);
	};

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
							<MenuItem value={'CSharp'}>C#</MenuItem>
							<MenuItem value={'Cpp'}>C++</MenuItem>
							<MenuItem value={'C'}>C</MenuItem>
							<MenuItem value={'Javascript'}>Javascript</MenuItem>
						</Select>
					</FormControl>
				</Box>
			</Stack>
			<Box sx={{ flex: 1, paddingTop: '5px' }}>
				<Editor language={Language.toLowerCase()} height={640} defaultValue="//some code" theme="light" />
			</Box>
		</Stack>
	);
};
