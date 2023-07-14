import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/Authcontext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useConfigsetting = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const userIdFromStorage = localStorage.getItem('userID');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [billingAddresses, setBillingAddresses] = useState([]);
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [selectedPayment, setPaymentOptions] = useState(null);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');


  useEffect(() => {
    if (!isAuthenticated) {
        navigate("/connexion");
    }
    fetchPaymentOptions();
    fetchBillingAddresses();
    fetchShippingAddresses();
  }, [isAuthenticated, navigate]);

  const fetchPaymentOptions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}facturation.json`);
      const paymentCards = Object.values(response.data).filter(card => card.user_Id === userIdFromStorage);
      setPaymentOptions(paymentCards);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBillingAddresses = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}billingAddress.json`);
      const addresses = Object.values(response.data).filter(address => address.user_Id === userIdFromStorage);
      setBillingAddresses(addresses);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchShippingAddresses = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}adresses.json`);
      const addresses = Object.values(response.data).filter(address => address.user_Id === userIdFromStorage);
      setShippingAddresses(addresses);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (
    firstName,
    email,
    password,
    paymentMethods,
    billingAddress,
    shippingAddress
  ) => {
    try {;


      if (!selectedPayment) {
        const data = {
            user_Id: userIdFromStorage,
            cardName: cardName,
            cardNumber: cardNumber,
            expiryDate: expiryDate,
            cvv: cvv,
        };
      }

      await axios.put(`${import.meta.env.VITE_API}clients/${userIdFromStorage}.json`, {
        fullname: firstName,
        email: email,
        password: password
      });
      
      console.log(userIdFromStorage)

      setIsSuccess(true);
    } catch (error) {
      setIsSuccess(false);
      setError(error.message);
      console.error(error);
    }
  };

  return {
    isSuccess,
    error,
    handleSubmit
  };
};

export default useConfigsetting;