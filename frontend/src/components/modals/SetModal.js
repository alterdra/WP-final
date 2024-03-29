import { TextField, Button, Modal, Typography, Stack, Box } from '@mui/material';
import '../../css/Modal.css';

const SetModal = ({ label, description, createFunc, name, changeName, showCreate, handleClose }) => {
    return (
        <Modal
            className='model-container'
            open={showCreate}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            hideBackdrop
        >
            <Box className='modal'>
                <Box className='content'>
                    <Typography sx={{paddingLeft: '6px'}} id="modal-modal-title" variant="h6" component="h2">
                        {description}
                    </Typography>
                    <TextField 
                        id="outlined-basic" 
                        label={label} 
                        variant="outlined" 
                        value={name} 
                        onChange={changeName} 
                    />
                    <Stack direction='row' className='button-container'>
                        <Button variant="contained" color="success" onClick={createFunc} >確定</Button>
                        <Button variant="contained" color="error" onClick={handleClose} >取消</Button>
                    </Stack>
                </Box>
            </Box>
        </Modal>
    )
}

export default SetModal;