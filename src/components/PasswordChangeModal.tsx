import React from 'react'
import PropTypes from 'prop-types'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CustomButton } from './CustomButton';

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
                <Typography  variant="h4" component="h2">
                    Your password
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
                <br></br>
                <CustomButton  content="Cancel" onClick = {props.onClose}/>
            </Box>           
        </Modal>
    )
}

PasswordChangeModal.propTypes = {
    open : PropTypes.bool,
    onClose: PropTypes.func
}

export default PasswordChangeModal
