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
    cardName,
    cardNumber,
    expiryDate,
    cvv,
    adresse1,
    adresse2,
    codePostal,
    nom,
    pays,
    prenom,
    telephone,
    ville 
  ) => {
    try {
      // ...

      const updatedData1 = {
        firstName: firstName || undefined, // Conserver la valeur existante ou utiliser undefined si le champ est vide
        email: email || undefined,
        password: password || undefined
      };
      const updatedData2 = {
        cardName: cardName || undefined,
        cardNumber: cardNumber || undefined,
        cvv: cvv || undefined,
        expiryDate: expiryDate || undefined,
      };
      const updatedData3 = {
        adresse1: adresse1 || undefined,
        adresse2: adresse2 || undefined,
        codePostal: codePostal || undefined,
        nom: nom || undefined,
        pays: pays || undefined,
        prenom: prenom || undefined,
        telephone: telephone || undefined,
        ville: ville || undefined
      };

      const updatedData4 = {
        adresse1: adresse1 || undefined,
        adresse2: adresse2 || undefined,
        codePostal: codePostal || undefined,
        nom: nom || undefined,
        pays: pays || undefined,
        prenom: prenom || undefined,
        telephone: telephone || undefined,
        ville: ville || undefined
      };

      console.log(userIdFromStorage)

      // Utiliser la méthode PATCH au lieu de PUT pour mettre à jour les données sans supprimer les champs existants
      await axios.patch(`${import.meta.env.VITE_API}clients/${userIdFromStorage}.json`, updatedData1);
      await axios.patch(`${import.meta.env.VITE_API}facturation/${userIdFromStorage}.json`, updatedData2);
      await axios.patch(`${import.meta.env.VITE_API}billingAddress/${userIdFromStorage}.json`, updatedData3);
      await axios.patch(`${import.meta.env.VITE_API}adresses/${userIdFromStorage}.json`, updatedData4);
      setIsSuccess(true);
      // ...
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