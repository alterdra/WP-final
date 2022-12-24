import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import * as fs from 'fs';
import img1 from '../Japan-photo/pexels-chelsea-tey-706976.jpg';

const SliderSlick = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    // const files = fs.readdirSync();
    // console.log(files)
    const dirName = '../../Japan-photo/';
    return (
        <div className="reactSlick">
            <Slider {...settings}>
                <div>
                <   h3>1</h3>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <img 
                        width={'50%'}
                        src={img1}
                    />
                </div>
            </Slider>
        </div>
    );
};

export default SliderSlick;