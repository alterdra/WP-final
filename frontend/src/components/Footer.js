import { Typography, Stack, Button, Box } from '@mui/material';
import '../css/Footer.css'
import Logo from './Footer.svg'
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
    return (
        <Stack direction='row' className='Footer'>
            <img className='icon' src={Logo} alt='logo'/>
            <Button className='contact' onClick={() => window.location = 'mailto:jim20010112@gmail.com'}><EmailIcon />Contact Us</Button>
            <Typography className='team'>Team 1</Typography>
        </Stack>
    );
}

export default Footer;