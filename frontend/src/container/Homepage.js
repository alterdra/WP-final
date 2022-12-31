import Slider from '../components/ImageSlider'
import NavBar from '../components/NavBar';
import { useState } from 'react';
import { useUserName } from './hook/useUserName';
import React from 'react';
import '../css/Homepage.css';

const Homepage = () => {
	return (
		<div>
			<div className='container'>
				<div className='SliderWrapper' dir="rtl">
					<Slider />
				</div>
			</div>
		</div>
	);
};

export default Homepage;