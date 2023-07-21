import { useState } from "react";
import axios from "axios";

export function usePaymentOptions(userId) {
  const [paymentOptions, setPaymentOptions] = useState([]);

  const fetchPaymentOptions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}facturation.json`);
      const paymentCards = Object.values(response.data).filter(card => card.user_Id === userId);
      setPaymentOptions(paymentCards);
    } catch (error) {
      console.error(error);
    }
  };

  return { paymentOptions, fetchPaymentOptions };
}

export function useBillingAddresses(userId) {
  const [billingAddresses, setBillingAddresses] = useState([]);

  const fetchBillingAddresses = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}billingAddress.json`);
      const addresses = Object.values(response.data).filter(address => address.user_Id === userId);
      setBillingAddresses(addresses);
    } catch (error) {
      console.error(error);
    }
  };

  return { billingAddresses, fetchBillingAddresses };
}

export function useAddresses(userId) {
  const [addresses, setAddresses] = useState([]);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}adresses.json`);
      const adressesData = response.data;
      const userAdresses = Object.values(adressesData).filter((adresse) => adresse.user_Id === userId);
      setAddresses(userAdresses);
    } catch (error) {
      console.error(error);
    }
  };

  return { addresses, fetchAddresses };
}
