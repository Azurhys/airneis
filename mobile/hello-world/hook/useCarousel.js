import { useState, useEffect } from "react";
import axios from "axios";
import { Alert } from 'react-native';
import { VITE_API } from "@env";

export function useCarouselImages() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get(`${VITE_API}caroussel.json`)
      .then((res) => {
        setImages(res.data.img);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const updateImage = (index, newImage) => {
    let newImages = [...images];
    newImages[index] = newImage;

    axios.put(`${VITE_API}caroussel.json`, { img: newImages })
      .then((res) => {
        if (res.status === 200) {
          setImages(newImages);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return [images, updateImage];
}
