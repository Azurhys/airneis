import { useEffect, useState } from 'react';
import axios from 'axios';

const useLoginValidation = (email, password) => {
  const [isValid, setIsValid] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API}clients.json`);
        const clients = response.data;
        const matchedClient = Object.values(clients).find((client) => client.email === email && client.password === password);
        if (matchedClient) {
          setIsValid(true);
          setFirstName(matchedClient.firstName);
          setCategoryId(matchedClient.category_id);
        } else {
          setIsValid(false);
          setFirstName('');
          setCategoryId('');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [email, password]);

  return { isValid, firstName, categoryId };
};

export default useLoginValidation;
