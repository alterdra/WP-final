import { useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import Slider from '../components/ImageSlider';
import NavBar from '../components/NavBar';
import Data from '../mottos.json';
import '../css/Homepage.css';

import { styled } from '@mui/material/styles';
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const newData = Data.filter(e => e['中文'].length <= 8 && e['日文'].length <= 8);

const Homepage = () => {
	const [mottoIndex, setMottoIndex] = useState(0);
	useEffect(() => {
		setInterval(() => {	
			setMottoIndex(prev => (prev + 1) % newData.length);
		}, 5000);
	}, []);
	
	return (
		<Box sx={{ display: 'flex' }}>
			<NavBar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
				<div className='container'>
					<div className='Text'>
						<Paper className='chinese' variant="outlined" elevation={2}>	
							{newData[mottoIndex]['中文']}
						</Paper>
					</div>
					<div className='SliderWrapper'>
						<Slider />
					</div>
					<div className='Text'>
						<Paper className='japanese' variant="outlined" elevation={2}>
							{newData[mottoIndex]['日文']}
						</Paper>
					</div>
				</div>
			</Box>
		</Box>
	);
};

export default Homepage;