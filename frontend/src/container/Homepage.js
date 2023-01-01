import Slider from '../components/ImageSlider'
import NavBar from '../components/NavBar';
import { useState } from 'react';
import { useUserName } from './hook/useUserName';
import React from 'react';
import '../css/Homepage.css';
import { Button, Box } from '@mui/material';

import { styled } from '@mui/material/styles';
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

const Homepage = () => {
	return (
		<Box sx={{ display: 'flex' }}>
			<NavBar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
				<div className='container'>
					<div className='SliderWrapper'>
						<Slider />
					</div>
				</div>
			</Box>
		</Box>
	);
};

export default Homepage;