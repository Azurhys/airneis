import { useEffect, useState } from 'react';
import axios from 'axios';

const useLoginValidation = (email, password) => {
  const [isValid, setIsValid] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [categorie_user_Id, setCategoryId] = useState('');
  const [user_Id, setuser_Id]=useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API}clients.json`);
        const clients = response.data;
        const matchedClient = Object.values(clients).find((client) => client.email === email && client.password === password);
        if (matchedClient) {
          setIsValid(true);
          setFirstName(matchedClient.firstName);
          setCategoryId(matchedClient.categorie_user_Id);
          setuser_Id(matchedClient.user_Id);
        } else {
          setIsValid(false);
          setFirstName('');
          setCategoryId('');
          setuser_Id('');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [email, password]);
  console.log(user_Id)
  return { isValid, firstName, categorie_user_Id, user_Id };
};

export default useLoginValidation;
