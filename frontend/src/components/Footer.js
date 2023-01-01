import { Typography, Stack, Paper } from '@mui/material';
import '../css/Footer.css'

const Footer = () => {
    return (
        <Stack direction='row' className='Footer'>
            <Typography className='contact'>聯絡資訊：jim20010112@gmail.com</Typography>
            <Typography className='team'>組別：1</Typography>
        </Stack>
    );
}

export default Footer;