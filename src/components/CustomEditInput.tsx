import React from 'react'
import PropTypes from 'prop-types'
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from '@mui/material/TextField/TextField';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';


export const CustomEditIcon = styled(EditIcon)(({ theme }) => ({
    color: theme.palette.primary.main,
    cursor: 'pointer'
}));

export const CustomSaveIcon = styled(CheckCircleIcon)(({ theme }) => ({
    color: theme.palette.success.main,
    cursor: 'pointer'
}));
export const CustomCancelIcon = styled(CancelIcon)(({ theme }) => ({
    color: theme.palette.error.main,
    cursor: 'pointer'
}));

function CustomEditInput(props: any) {
    const [isEdit, setIsEdit] = React.useState(false)

    return (
        <Stack
            direction='row'
            spacing={1}
            height='100%'
            alignItems='center'
            justifyContent='center'
        >
            <Stack width='20%'>
                <Typography variant='subtitle1'>{props.label}</Typography>
            </Stack>
            <Stack flexGrow={1}>
                {
                    isEdit ?
                        <TextField fullWidth variant="standard" /> :
                        <Typography variant='body1'>{props.value ? props.value : "Field"}</Typography>
                }
            </Stack>
            <React.Fragment>
                {
                    <Stack
                        width='15%'
                        direction='row'
                        spacing={2}
                        height='100%'
                        alignItems='center'
                        justifyContent='center'
                    >
                        {
                            isEdit ?
                                <React.Fragment>
                                    <CustomSaveIcon onClick={props.onSave} />
                                    <CustomCancelIcon onClick={() => { setIsEdit(false) }} />
                                </React.Fragment>
                                :
                                <CustomEditIcon onClick={() => { setIsEdit(true) }} />
                        }

                    </Stack>

                }
            </React.Fragment>
        </Stack>

    )
}

CustomEditInput.propTypes = {
    onChange: PropTypes.func,
    onSave: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string
}

export default CustomEditInput

