import { useEffect, useState } from 'react';
import axios from 'axios';
import { VITE_API } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

const useLoginValidation = (email, password) => {
  const [isValid, setIsValid] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [categorie_user_Id, setCategoryId] = useState('');
  const [user_Id, setuser_Id]=useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${VITE_API}clients.json`);
        const clients = response.data;
        const matchedClient = Object.values(clients).find((client) => client.email === email && client.password === password);
        if (matchedClient) {
          setIsValid(true);
          setFirstName(matchedClient.firstName);
          setCategoryId(matchedClient.categorie_user_Id);
          setuser_Id(matchedClient.user_Id);
          // Write to Async Storage
          await AsyncStorage.setItem('userID', matchedClient.user_Id.toString());
        } else {
          setIsValid(false);
          setFirstName('');
          setCategoryId('');
          setuser_Id('');
          await AsyncStorage.removeItem('userID'); // optional, remove userID if login is not successful
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [email, password]);

  return { isValid, firstName, categorie_user_Id, user_Id };
};

export default useLoginValidation;
