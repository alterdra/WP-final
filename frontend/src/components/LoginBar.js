import { useState } from 'react';
import { useUserName } from '../container/hook/useUserName';
import { Box, InputAdornment, TextField, IconButton, Button } from '@mui/material'
import { AccountCircle, VisibilityOff , Visibility } from '@mui/icons-material'
import RegisterModal from './modals/RegisterModal';

const LoginBar = () => {
    const { user, setUser, password, setPassword, 
        signedIn, handleLogin, handleLogout, 
        handleRegister, showModal, setShowModal } = useUserName();
    const [showPassword, setShowPassword] = useState(false);

    //Register Modal
    const handleOpen = () => {
        setShowModal(true);
        setUser("");
        setPassword("");
    }
    const handleClose = () => setShowModal(false);
    const changeUserName = e => setUser(e.target.value);
    const changeUserPassword = e => setPassword(e.target.value);

    // Password
    const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = event => event.preventDefault();
	
    return (
        <>
            <div>請註冊帳號</div>
            <Button onClick={() => handleOpen()}>註冊帳號</Button>
            <RegisterModal 
                showModal={showModal}
                userName={user} changeUserName={changeUserName}
                userPassword={password} changeUserPassword={changeUserPassword}
                handleCreateUser={handleRegister} handleClose={handleClose}
            />
            {!signedIn ? 
            (<>
                <div>請登入帳號密碼</div>
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <TextField
                    id="input-with-icon-textfield1"
                    label="Username"
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <AccountCircle />
                        </InputAdornment>
                    ),
                    }}
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    variant="standard"
                />
                <TextField
                    type={showPassword ? 'text' : 'password'}
                    id="input-with-icon-textfield2"
                    label="Password"
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <AccountCircle />
                        </InputAdornment>
                    ),
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="standard"
                />
                <Button onClick={() => handleLogin()}>登入</Button>
                </Box>
            </>) : 
            (<div>
                歡迎回來, {user}
                <Button onClick={() => handleLogout()}>登出</Button>
            </div>)
        }</>
    );
}

export default LoginBar;