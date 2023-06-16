import { useState } from "react";
import axios from "axios";

const useConfigsetting = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const userIdFromStorage = localStorage.getItem('userID');
  const [billingAddresses, setBillingAddresses] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [client, setClient] = useState([]);



  const handleSubmit = async (
    fullName,
    email,
    password,
    shippingAddress,
    billingAddress,
    paymentMethods,
    userId
  ) => {
    try {
      // Modifier les données liées à l'ID de l'utilisateur
      const fetchBillingAddresses = async () => {
          try {
              const response = await axios.get(`${import.meta.env.VITE_API}billingAddress.json`);
              const addresses = Object.values(response.data).filter(address => address.user_Id === userIdFromStorage);
              setBillingAddresses(addresses);
          } catch (error) {
              console.error(error);
          }
      };

    const fetchPaymentOptions = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}facturation.json`);
            const paymentCards = Object.values(response.data).filter(card => card.user_Id === userIdFromStorage);
            setPaymentOptions(paymentCards);
        } catch (error) {
            console.error(error);
        }
    };


    const fetchClient = async () => {
      try {
          const response = await axios.get(`${import.meta.env.VITE_API}clients.json`);
          const paymentCards = Object.values(response.data).filter(card => card.user_Id === userIdFromStorage);
          setClient(paymentCards);
      } catch (error) {
          console.error(error);
      }
  };

      // Réinitialiser les champs du formulaire
      setIsSuccess(true);
    } catch (error) {
      setIsSuccess(false);
      setError(error.message);
      console.error(error);
    }
  };

  return { isSuccess, error, handleSubmit };
};

export default useConfigsetting;
