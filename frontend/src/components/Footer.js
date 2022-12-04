import React from 'react'
import { Box, Stack, Paper } from '@mui/material';
import '../css/Footer.css'

const Footer = () => {
    return (
        <Stack direction='row' className='Footer'>
            <Paper className='Paper'>Contact Information:</Paper>
            <Paper className='Paper'>Web programming Team:</Paper>
        </Stack>
    );
}

export default Footer;