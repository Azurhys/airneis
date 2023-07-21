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
  const [paymentOptions, setPaymentOptions] = useState([]);    
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');


  useEffect(() => {
    if (!isAuthenticated) {
        navigate("/connexion");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (
    firstName,
    email,
    password,
    cardName,
    cardNumber,
    expiryDate,
    cvv,
    shipping_adresse1,
    shipping_adresse2,
    shipping_codePostal,
    shipping_nom,
    shipping_pays,
    shipping_prenom,
    shipping_telephone,
    shipping_ville,
    billing_adresse1,
    billing_adresse2,
    billing_codePostal,
    billing_nom,
    billing_pays,
    billing_prenom,
    billing_telephone,
    billing_ville
  ) => {
    try {
      // ...

      const updatedData1 = {
        firstName: firstName || undefined,
        email: email || undefined,
        password: password || undefined,
        user_Id: userIdFromStorage ||undefined
      };
      const updatedData2 = {
        cardName: cardName || undefined,
        cardNumber: cardNumber || undefined,
        cvv: cvv || undefined,
        expiryDate: expiryDate || undefined,
        user_Id: userIdFromStorage ||undefined
      };
      const updatedData3 = {
        adresse1: billing_adresse1 || undefined,
        adresse2: billing_adresse2 || undefined,
        codePostal: billing_codePostal || undefined,
        nom: billing_nom || undefined,
        pays: billing_pays || undefined,
        prenom: billing_prenom || undefined,
        telephone: billing_telephone || undefined,
        ville: billing_ville || undefined,
        user_Id: userIdFromStorage ||undefined
      };

      const updatedData4 = {
        adresse1: shipping_adresse1 || undefined,
        adresse2: shipping_adresse2 || undefined,
        codePostal: shipping_codePostal || undefined,
        nom: shipping_nom || undefined,
        pays: shipping_pays || undefined,
        prenom: shipping_prenom || undefined,
        telephone: shipping_telephone || undefined,
        ville: shipping_ville || undefined,
        user_Id: userIdFromStorage ||undefined
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