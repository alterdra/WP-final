import { Typography, Stack, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import Logo from './Footer.svg';
import '../css/Footer.css';

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