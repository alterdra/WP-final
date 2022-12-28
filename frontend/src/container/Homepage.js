import Slider from '../components/ImageSlider'
import LoginBar from '../components/LoginBar';
import { useState } from 'react';
import { useUserName } from './hook/useUserName';
import React from 'react';
import '../css/Homepage.css';

const Homepage = () => {
	return (
		<div>
			<div className='container'>
				<div className='LoginBarWrapper'>
					<LoginBar />
				</div>
				<div className='SliderWrapper' dir="rtl">
					<Slider />
				</div>
			</div>
			
				
		</div>
	);
};

export default Homepage;