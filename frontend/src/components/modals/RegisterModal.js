import { TextField, Button, Modal, Typography, Stack, Box } from '@mui/material';
import '../../css/Modal.css';

const RegisterModal = ( { 
    showModal, 
    userName, changeUserName, 
    userPassword, changeUserPassword,
    handleCreateUser, handleClose,
    focusElement,
} ) => {
    return (
        <Modal
            open={showModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
        >
            <Box className='modal'>
                <Box className='content'>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        請輸入使用者資訊
                    </Typography>
                    <TextField 
                        id="outlined-basic" 
                        label="使用者名稱"
                        variant="outlined" 
                        value={userName} 
                        onChange={changeUserName} 
                        autoFocus={focusElement==="newUser"}
                    />
                    <TextField 
                        id="outlined-basic" 
                        label="密碼"
                        variant="outlined" 
                        value={userPassword} 
                        onChange={changeUserPassword} 
                        autoFocus={focusElement==="newPassword"}
                    />
                    <Stack direction='row'>
                        <Button onClick={handleCreateUser} >確定</Button>
                        <Button onClick={handleClose} >取消</Button>
                    </Stack>
                </Box>
            </Box>
        </Modal>
    )
}

export default RegisterModal;