import { useState } from 'react';
import { useUserName } from '../container/hook/useUserName';
import { Box, InputAdornment, TextField, IconButton, Button } from '@mui/material'
import { AccountCircle, VisibilityOff , Visibility, Password } from '@mui/icons-material'

const LoginBar = () => {
    const { user, setUser, password, setPassword } = useUserName();
    const [showPassword, setShowPassword] = useState(false);
	const [login, setLogin] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = event => event.preventDefault();
	const handleLogin = () => setLogin(true);
	const handleLogout = () => setLogin(false);
    return (
        !login ? 
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
    );
}

export default LoginBar;