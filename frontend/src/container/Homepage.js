import { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring'; 
import { Box, Card, Paper, Typography, Button } from '@mui/material';
import Slider from '../components/ImageSlider';
import NavBar from '../components/NavBar';
import Data from '../mottos.json';
import '../css/Homepage.css';

import { styled } from '@mui/material/styles';
import { Stack } from '@mui/system';
import LoginBar from '../components/LoginBar';

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
	const [isFlip, setIsFlip] = useState(false);
	// 大吉(0-5)、中吉(6-18)、小吉(19-38)、吉(39-60)、末吉(61-80)、凶(81-95)、大凶(96-100)
	const [result, setResult] = useState("吉");
	const { opacity, transform } = useSpring({
		opacity: isFlip ? 1 : 0,
		transform: `perspective(1200px) rotateY(${isFlip ? 0 : 180}deg)`
	})

	const lottery = () => {
		let random = Math.floor(Math.random() * 101)
		if(random >= 0 && random <=5)
			setResult("大吉");
		else if(random >= 6 && random <= 18)
			setResult("中吉");
		else if(random >= 19 && random <= 38)
			setResult("小吉");
		else if(random >= 39 && random <= 60)
			setResult("吉");
		else if(random >= 61 && random <= 80)
			setResult("末吉");
		else if(random >= 81 && random <= 95)
			setResult("凶");
		else if(random >= 96 && random <= 100)
			setResult("大凶");
	}

	const handleFlip = () => {
		setIsFlip(prev => !prev);
		if(!isFlip)
			lottery();
	}
	
	useEffect(() => {
		setInterval(() => {	
			setMottoIndex(prev => prev + 1);
		}, 5000);
	}, []);

	useEffect(() => {
		if(mottoIndex >= newData.length - 1 )	
			setMottoIndex(0);
	}, [mottoIndex]);
	console.log(mottoIndex)

	return (
		<Box sx={{ display: 'flex' }}>
			<NavBar />
			<div className="loginBar">
				<LoginBar />
			</div>	
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
				<Stack direction='row' position='relative'>
					<div onClick={() => handleFlip()}>
						<animated.div className='fortune' style={{ opacity, transform }}>
							<Typography sx={{ fontSize: '30px' }}>{result}</Typography>
						</animated.div>
						<animated.div className='fortune' style={{
							opacity: opacity.to(o => 1 - o),
							transform: transform.to(t => `${t} rotateY(180deg)`)
						}}>
							<Typography sx={{ fontSize: '30px' }}>今日の運勢</Typography>
						</animated.div>
					</div>
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
				</Stack>
			</Box>
		</Box>
	);
};

export default Homepage;