import { useState } from 'react';
import { useUserName } from '../container/hook/useUserName';
import { InputAdornment, TextField, IconButton, Fab, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { AccountCircle, VisibilityOff , Visibility } from '@mui/icons-material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import RegisterModal from './modals/RegisterModal';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import '../css/LoginBar.css';

const LoginBar = () => {
    const { user, setUser, password, setPassword, 
        signedIn, handleLogin, handleLogout, 
        handleRegister, showModal, setShowModal, handleOpen,
        newUser, setNewUser, newPassword, setNewPassword,
        focusElement, setFocusElement } = useUserName();

    const [showPassword, setShowPassword] = useState(false);
    console.log(focusElement);

    //Register Modal
    const handleClose = () => setShowModal(false);
    const changeNewUser = e => {
        setFocusElement("newUser");
        setNewUser(e.target.value);
    }
    const changeNewUserPassword = e => {
        setFocusElement("newPassword");
        setNewPassword(e.target.value);
    }
        
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
                focusElement={focusElement}
            />
            {!signedIn ? 
            (<>
                <ListItem className='username'>
                    <TextField
                        id="input-with-icon-textfield1"
                        label="Username"
                        // autoFocus={focusElement==="user"}
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <AccountCircle />
                            </InputAdornment>
                        ),
                        }}
                        value={user}
                        onChange={(e) => {
                            setFocusElement("user")
                            setUser(e.target.value);
                        }}
                        variant="standard"
                    />
                </ListItem>
                <ListItem className='password'>
                    <TextField
                        type={showPassword ? 'text' : 'password'}
                        id="input-with-icon-textfield2"
                        label="Password"
                        // autoFocus={focusElement==="password"}
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
                        onChange={(e) => {
                            setFocusElement(prev=>"password");
                            setPassword(e.target.value);
                        }}
                        variant="standard"
                    />
                </ListItem>
                <ListItem className='login'>
                    <Fab className='login' variant="extended"  onClick={() => handleLogin()}>
                        <LoginIcon sx={{ mr: 1 }} />
                        登入
                    </Fab>
                </ListItem>
            </>) : 
            (<>
                <ListItem className='welcome'>
                    <ListItemAvatar>
                    <Avatar>
                        <VerifiedUserIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`歡迎回來, ${user}!`} />
                </ListItem>
                <ListItem className='logout'>
                    <Fab className='logout' variant="extended"  onClick={() => handleLogout()}>
                        <LogoutIcon sx={{ mr: 1 }} />
                        登出
                    </Fab>
                </ListItem>
            </>)}
            <ListItem className='register'>
                <Fab className='register' variant="extended"  onClick={() => handleOpen()}>
                    <HowToRegIcon sx={{ mr: 1 }} />
                    註冊帳號
                </Fab>
            </ListItem>
        </List>
    );
}

export default LoginBar;