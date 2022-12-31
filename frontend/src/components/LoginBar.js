import { useState, useNavigate } from 'react';
import { useUserName } from '../container/hook/useUserName';
import { Box, InputAdornment, TextField, IconButton, Button, Fab } from '@mui/material'
import { AccountCircle, VisibilityOff , Visibility } from '@mui/icons-material'
import RegisterModal from './modals/RegisterModal';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import InputIcon from '@mui/icons-material/Input';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

import '../css/LoginBar.css'

const LoginBar = () => {
    const { user, setUser, password, setPassword, 
        signedIn, handleLogin, handleLogout, 
        handleRegister, showModal, setShowModal, handleOpen,
        newUser, setNewUser, newPassword, setNewPassword } = useUserName();
    const [showPassword, setShowPassword] = useState(false);

    //Register Modal
    const handleClose = () => setShowModal(false);
    const changeNewUser = e => setNewUser(e.target.value);
    const changeNewUserPassword = e => setNewPassword(e.target.value);

    // Password switch: seen & unseen
    const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = event => event.preventDefault();

    return (
        <List className='List'> 
            <RegisterModal 
                showModal={showModal}
                userName={newUser} changeUserName={changeNewUser}
                userPassword={newPassword} changeUserPassword={changeNewUserPassword}
                handleCreateUser={handleRegister} handleClose={handleClose}
            />
            {!signedIn ? 
            (<>
                {/* <ListItem className='ListItem'>
                    <ListItemAvatar>
                    <Avatar>
                        <InputIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="請輸入帳號密碼" />
                </ListItem> */}
                <ListItem>
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
                </ListItem>
                <ListItem>
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
                </ListItem>
                <ListItem>
                    <Fab variant="extended"  onClick={() => handleLogin()}>
                        <LoginIcon sx={{ mr: 1 }} />
                        登入
                    </Fab>
                </ListItem>
            </>) : 
            (<>
                <ListItem className='welcome'>
                    <ListItemAvatar>
                    <Avatar>
                        <ThumbUpAltIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`歡迎回來, ${user}!`} />
                </ListItem>
                <ListItem className='logout'>
                    <Fab variant="extended"  onClick={() => handleLogout()}>
                        <LogoutIcon sx={{ mr: 1 }} />
                        登出
                    </Fab>
                </ListItem>
            </>)}
            <ListItem className='register'>
                <Fab variant="extended"  onClick={() => handleOpen()}>
                    <HowToRegIcon sx={{ mr: 1 }} />
                    註冊帳號
                </Fab>
            </ListItem>
        </List>
    );
}

export default LoginBar;