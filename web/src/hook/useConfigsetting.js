import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/Authcontext';
import { useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const useConfigsetting = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const userIdFromStorage = localStorage.getItem('userID');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [useDeliveryAddress, setUseDeliveryAddress] = useState(false);
  const [billingAddresses, setBillingAddresses] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentOptions, setPaymentOptions] = useState([]);
  
  useEffect(() => {
    fetchBillingAddresses();
    fetchPaymentOptions();
    fetchclient();
  }, []);

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
      console.log(userIdFromStorage);
      const response = await axios.get(`${import.meta.env.VITE_API}facturation.json`);
      const paymentCards = Object.values(response.data).filter(card => card.user_Id === userIdFromStorage);
      setPaymentOptions(paymentCards);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchclient = async () => {
    try {
      console.log(userIdFromStorage);
      const response = await axios.get(`${import.meta.env.VITE_API}client.json`);
      const paymentCards = Object.values(response.data).filter(card => card.user_Id === userIdFromStorage);
      setPaymentOptions(paymentCards);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (
    fullName,
    email,
    password,
    shippingAddress,
    billingAddress,
    paymentMethods
  ) => {
    try {
      if (!isAuthenticated) {
        navigate('/connexion');
        return;
      }
      
        // Créer l'objet de la commande
        const order = {
          orderId: orderNumberFromStorage,
          userId: userId,
          cartItems: cartItems,
          deliveryAddress: deliveryAddress,
          paymentMethod: paymentDetails,
          orderDate: formattedDate,
          billingAddress: billingAddressToUse,
          status: getRandomStatus()
      };

      // Mettre à jour uniquement les champs spécifiés
      const updatedUserData = {
        ...userData,
        fullName: fullName !== '' ? fullName : userData.fullName,
        email: email !== '' ? email : userData.email,
        password: password !== '' ? password : userData.password,
        shippingAddress: shippingAddress !== '' ? shippingAddress : userData.shippingAddress,
        billingAddress: billingAddress !== '' ? billingAddress : userData.billingAddress,
        paymentMethods: paymentMethods !== '' ? paymentMethods : userData.paymentMethods,
      };
      await axios.put(`${import.meta.env.VITE_API}${userIdFromStorage},facturation.json`, {email,
      sujet,
      text,
      });
      await axios.put(`${import.meta.env.VITE_API}${userIdFromStorage},billingAddress.json`, {email,
      sujet,
      text,
      });
      await axios.put(`${import.meta.env.VITE_API}${userIdFromStorage},client.json`, {email,
      sujet,
      text,
      });
      
      // Mettre à jour les données liées à userIdFromStorage
      // await axios.put(`${import.meta.env.VITE_API}${userIdFromStorage}`, updatedUserData);
      // Réinitialiser les champs du formulaire
      setIsSuccess(true);
      setError(null);
    } catch (error) {
      setIsSuccess(false);
      setError(error.message);
      console.error(error);
    }
  };
  return {
    isSuccess,
    error,
    handleSubmit,
    useDeliveryAddress,
    billingAddresses,
    selectedPayment,
    cardName,
    setCardName,
    cardNumber,
    setCardNumber,
    expiryDate,
    setExpiryDate,
    cvv,
    setCvv
  };
};

export default useConfigsetting;
