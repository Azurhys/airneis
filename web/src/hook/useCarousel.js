import { useState, useEffect } from 'react';
import axios from 'axios';

export function useCarouselImages() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API}caroussel.json`);
        setImages(res.data.img);
      } catch (err) {
        console.error(err);
      }
    };

    fetchImages();
  }, []);

  const updateImage = async (index, newImage) => {
    let newImages = [...images];
    newImages[index] = newImage;

    try {
      const res = await axios.put(`${import.meta.env.VITE_API}caroussel.json`, { img: newImages });
      if (res.status === 200) {
        setImages(newImages);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return [images, updateImage];
};
