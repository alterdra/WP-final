import React, { lazy, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../Japan-photo/1.jpg';
import { v4 as uuidv4 } from 'uuid';
import useImage from '../container/hook/useImage';
import "../css/Slider.css"


const SliderSlick = () => {
    const {imgList, loading , error} = useImage();
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: false,
        // cssEase: "linear",
    };
    // useEffect(() => {
    //     console.log(imgList)
    // })
    
    return (
        <div className="reactSlick">
            <Slider {...settings}>
                {imgList.map((ele, index) =>
                    <div key={uuidv4()}>
                        <img 
                            width={'50%'}
                            src={loading?img1:ele}
                        />
                    </div>
                )}
            </Slider>
        </div>
    );
};

export default SliderSlick;