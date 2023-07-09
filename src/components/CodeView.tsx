import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';

import Editor, { loader } from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { getProgrammingLanguages } from '@/selectors/config.selector';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProgrammingLanguages } from '@/slices/config.slice';


interface CodeViewProps {
    source: string;
    language: number;
}

const CodeView = (props: CodeViewProps) => {

    const { source, language } = props
    const dispatch = useDispatch()
    const ProgrammingLaguages = useSelector(getProgrammingLanguages)
    const [Theme, setTheme] = useState('vs');

    loader.init().then((monaco) => {
        // Monaco Editor is initialized and ready to use
    });

    const onThemeChange = (event: SelectChangeEvent) => {
        let type = event.target.value;
        setTheme(type as string);
    };

    const getLanguageName = (type: number) => {
        return ProgrammingLaguages && ProgrammingLaguages.length > 0 ? ProgrammingLaguages.filter(item => item.Id === type)[0].LanguageName : ''
    }
    const getLanguageDisplayName = (type: number) => {
        return ProgrammingLaguages && ProgrammingLaguages.length > 0 ? ProgrammingLaguages.filter(item => item.Id === type)[0].DisplayName.toUpperCase() : ''
    }


    useEffect(() => {
        if (ProgrammingLaguages === null) {
            dispatch(fetchProgrammingLanguages())
        }
    }, [])
    return (
        <Stack
            height='100%'
        >
            <Stack flexDirection="row" justifyContent="flex-start">
                <Box width="30%" sx={{ flexGrow: 1 }}>
                    <FormControl fullWidth size='small'>
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
                <Box width="20%" sx={{ flexGrow: 1, '> *': { height: '100% !important' } }}>
                    <FormControl fullWidth size='small'>
                        <TextField
                            sx={{ height: '100%' }}
                            disabled
                            variant="outlined"
                            defaultValue={getLanguageDisplayName(language)}
                            size='small'
                        />
                    </FormControl>
                </Box>
            </Stack>
            <Box sx={{ flex: 1 }}>
                <Editor
                    height="400px"
                    options={{ readOnly: true, theme: Theme }}
                    language={getLanguageName(language)}
                    value={source}
                />
            </Box>
        </Stack>
    )
}

export default CodeView
