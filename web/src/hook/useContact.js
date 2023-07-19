import { useState, useEffect } from "react";
import axios from "axios";

const useContact = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}contact.json`);
      setMessages(Object.values(response.data));
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const handleSubmit = async (email, sujet, text) => {
    try {
      // Envoyer les données à Firebase via une requête POST avec Axios
      await axios.post(`${import.meta.env.VITE_API}contact.json`, {
        email,
        sujet,
        text,
      });

      // Réinitialiser les champs du formulaire
      setIsSuccess(true);
    } catch (error) {
      setIsSuccess(false);
      setError(error.message);
      console.error(error);
    }
  };

  return { isSuccess, error, handleSubmit, messages };
};

export default useContact;
