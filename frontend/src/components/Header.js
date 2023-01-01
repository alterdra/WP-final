import { Box, Typography } from '@mui/material';
import '../css/Header.css'
import LoginBar from './LoginBar';
import Logo from './Japan.svg';

const Header = () => {
    return (
        <div className='Header'>
            <Box>
                <Typography className='text'>BJK 大家來學日本語</Typography>
            </Box>
            <div className='LoginBarWrapper'>
				<LoginBar />
			</div>
        </div>
    );
}

export default Header;