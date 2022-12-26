import Slider from '../components/ImageSlider'
import LoginBar from '../components/LoginBar';
import { useState } from 'react';
import { useUserName } from './hook/useUserName';
import React from 'react';

const Homepage = () => {
	return (
		<div>
			<LoginBar />
			<Slider />
		</div>
	);
};

export default Homepage;