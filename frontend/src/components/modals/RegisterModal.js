import { useState } from 'react';
import { IconButton, TextField, Button, Modal, Typography, Stack, Box, InputAdornment } from '@mui/material';
import { VisibilityOff , Visibility } from '@mui/icons-material';
import '../../css/Modal.css';

const RegisterModal = ({ 
    showModal, 
    userName, changeUserName, 
    userPassword, changeUserPassword,
    handleCreateUser, handleClose,
    focusElement,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => { setShowPassword((show) => !show) };
	const handleMouseDownPassword = (event) => { event.preventDefault() };
    return (
        <Modal
            open={showModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            hideBackdrop
        >
            <Box className='modal'>
                <Box className='content'>
                    <Typography sx={{ paddingLeft: '16px' }} id="modal-modal-title" variant="h6" component="h2">
                        請輸入使用者資訊
                    </Typography>
                    <TextField 
                        className='username'
                        id="outlined-basic" 
                        label="使用者名稱"
                        variant="outlined" 
                        value={userName} 
                        onChange={changeUserName} 
                        // autoFocus={focusElement==="newUser"}
                    />
                    <TextField 
                        type={showPassword ? 'text' : 'password'}
                        className='password'
                        id="outlined-basic" 
                        label="密碼"
                        variant="outlined" 
                        value={userPassword} 
                        onChange={changeUserPassword} 
                        // autoFocus={focusElement==="newPassword"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Stack direction='row' className='button-container'>
                        <Button variant="contained" color="success" onClick={handleCreateUser} >確定</Button>
                        <Button variant="contained" color="error" onClick={handleClose} >取消</Button>
                    </Stack>
                </Box>
            </Box>
        </Modal>
    )
}

export default RegisterModal;