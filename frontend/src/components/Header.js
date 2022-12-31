import { Box, Stack, Paper } from '@mui/material';
import '../css/Header.css'
import LoginBar from './LoginBar';

const Header = () => {
    return (
        <div className='Header'>
            <Box>
                <div className='text'>大家來學日本語 出会いを大切に</div>
            </Box>
            <div className='LoginBarWrapper'>
				<LoginBar />
			</div>
        </div>
    );
}

export default Header;