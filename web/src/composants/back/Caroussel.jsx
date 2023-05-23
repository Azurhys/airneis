import React, { useState } from 'react';
import Carousel from 'better-react-carousel';

const Caroussel = ({ images, style }) => {
  
  return (<div>
    <Carousel cols={1} rows={1} gap={0} loop autoplay={5000} hideArrow={true} showDots={true} dotColorActive={'#000000'} >
        {images.map((image, index) => (
            <Carousel.Item>
                <img key={index} src={image} height={style} classeName='' alt='Caroussel Slide'/>
            </Carousel.Item>
        ))}
    </Carousel>
  </div>);
};

export default Caroussel;
