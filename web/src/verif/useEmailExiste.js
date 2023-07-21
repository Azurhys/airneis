import { useEffect, useState } from 'react';
import axios from 'axios';

const useEmailValidation = async (email) => {
  const [validationResult, setValidationResult] = useState({
    isEmailValid: true,
    user_Id: undefined,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API}clients.json`);
        const clients = response.data;
        const existingClient = Object.values(clients).find((client) => client.email === email);
        if (existingClient) {
          setValidationResult({
            isEmailValid: false,
            user_Id: existingClient.user_Id,
          });
        } else {
          setValidationResult({
            isEmailValid: true,
            user_Id: undefined,
          });
        }
      } catch (error) {
        console.error(error);
        setValidationResult({
          isEmailValid: false,
          user_Id: undefined,
        });
      }
    };

    fetchData();
  }, [email]);

  return validationResult;
};

export default useEmailValidation;
