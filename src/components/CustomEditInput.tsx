import React from 'react'
import PropTypes from 'prop-types'
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CancelIcon from '@mui/icons-material/Cancel';

import { styled } from '@mui/material/styles';
import { CustomInput } from './CustomInput'

export const CustomEditIcon = styled(EditIcon)(({ theme }) => ({
    color: theme.palette.primary.main,
    cursor: 'pointer'
}));

export const CustomSaveAsIcon = styled(SaveAsIcon)(({ theme }) => ({
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
        <Grid container >
            <Grid item xs={11}>
                {
                    isEdit ?
                        <CustomInput onChange={props.onChange} /> :
                        <div>{props.value}</div>
                }
            </Grid>
            <Grid item xs={1}>
                {
                    isEdit ?
                        <React.Fragment>
                            <CustomSaveAsIcon onClick={props.onSave} />
                            <CustomCancelIcon onClick={() => { setIsEdit(false) }} />
                        </React.Fragment>
                        :
                        <CustomEditIcon onClick={() => { setIsEdit(true) }} />
                }

            </Grid>
        </Grid>

    )
}

CustomEditInput.propTypes = {
    onChange: PropTypes.func,
    onSave: PropTypes.func,
    value: PropTypes.string
}

export default CustomEditInput

