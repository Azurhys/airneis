import React from 'react';
import { Image, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: viewportWidth } = Dimensions.get('window');

const Caroussel = ({ images }) => {
  const renderItem = ({ item }) => {
    return (
      <Image 
        source={{ uri: item }} 
        style={{ width: viewportWidth, height: viewportWidth*0.5 }} // Ajustez la taille de l'image ici
      />
    );
  };

  return (
    <Carousel
      loop
      autoplay
      autoplayDelay={0}
      autoplayInterval={5000}
      inactiveSlideScale={1}
      inactiveSlideOpacity={1}
      activeSlideAlignment='center'
      sliderWidth={viewportWidth}
      itemWidth={viewportWidth}
      data={images}
      renderItem={renderItem}
    />
  );
};

export default Caroussel;
