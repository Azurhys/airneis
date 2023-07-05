import { useState } from 'react';
import axios from 'axios';
import { VITE_API } from '@env';

const useContact = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (email, sujet, text) => {
    try {
      // Send data to Firebase via a POST request with Axios
      await axios.post(`${VITE_API}contact.json`, {
        email,
        sujet,
        text,
      });

      // Reset the form fields
      setIsSuccess(true);
    } catch (error) {
      setIsSuccess(false);
      setError(error.message);
      console.error(error);
    }
  };

  return { isSuccess, error, handleSubmit };
};

export default useContact;
