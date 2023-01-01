import Slider from '../components/ImageSlider'
import NavBar from '../components/NavBar';
import { useEffect, useState } from 'react';
import React from 'react';
import '../css/Homepage.css';
import { Button, Box, Paper } from '@mui/material';
import Data from '../mottos.json'

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
	const [mottoIndex, setMottoIndex] = useState(0);
	useEffect(() => {
		setInterval(() => {	
			setMottoIndex(prev => prev + 1);
		}, 5000);
	}, []);

	useEffect(() =>{
		if(mottoIndex == Data.length - 1)
			setMottoIndex(0);
	}, [mottoIndex]);
	console.log(mottoIndex, Data.length);
	
	return (
		<Box sx={{ display: 'flex' }}>
			<NavBar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
				<div className='container'>
					<div className='Text'>
						<Paper className='chinese' variant="outlined" elevation={2}>	
							{Data[mottoIndex]['中文']}
						</Paper>
					</div>
					<div className='SliderWrapper'>
						<Slider />
					</div>
					<div className='Text'>
						<Paper className='japanese' variant="outlined" elevation={2}>
							{Data[mottoIndex]['日文']}
						</Paper>
					</div>
				</div>
			</Box>
		</Box>
	);
};

export default Homepage;