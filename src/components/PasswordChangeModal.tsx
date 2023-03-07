import React from 'react'
import PropTypes from 'prop-types'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
};
const PasswordChangeModal = (props: any) => {

    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
        >
            <Box sx={style}>
                <Typography variant="h4" component="h2">
                    Change your password
                </Typography>
                <Stack
                    direction='column'
                    spacing={2}
                    height='100%'
                    alignItems='center'
                    justifyContent='center'
                >
                    <TextField label='Current password' fullWidth variant="standard" />
                    <TextField label='New password' fullWidth variant="standard" />
                    <TextField label='Re-New password' fullWidth variant="standard" />

                    <Stack
                        direction='row'
                        spacing={2}
                        height='100%'
                        alignItems='center'
                        justifyContent='center'

                    >
                        <Button fullWidth variant='contained' onClick={props.onSave} >Save</Button>
                        <Button fullWidth onClick={props.onClose} >Cancel</Button>
                    </Stack>

                </Stack>
            </Box>
        </Modal>
    )
}

PasswordChangeModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onSave: PropTypes.func
}

export default PasswordChangeModal
