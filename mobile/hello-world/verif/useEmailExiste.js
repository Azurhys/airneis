import { useEffect, useState } from 'react';
import axios from 'axios';
import { VITE_API } from '@env';

const useEmailValidation = (email) => {
  const [isEmailValid, setIsEmailValid] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${VITE_API}clients.json`);
        const clients = response.data;
        const isEmailTaken = Object.values(clients).some((client) => client.email === email);
        setIsEmailValid(!isEmailTaken);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [email]);

  return isEmailValid;
};

export default useEmailValidation;
