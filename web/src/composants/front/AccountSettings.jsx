import React, { useState, useContext, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import useConfigsetting from "../../hook/useConfigsetting";
import './AccountSettings.css';
import { AuthContext } from '../../context/Authcontext';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AccountSettings = () => {
  const navigate = useNavigate();
  const userIdFromStorage = localStorage.getItem('userID');

  const initialBillingAddress = {
    prenom: '',
    nom: '',
    adresse1: '',
    adresse2: '',
    ville: '',
    codePostal: '',
    pays: '',
    telephone: ''
  };

  const initialPayment = {
    cardName:'',
    cardNumber:'',
    cvv:'',
    expiryDate:''
  };

  const { handleSubmit } = useConfigsetting();
  const { isAuthenticated} = useContext(AuthContext);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const [billing_prenom, setbilling_prenom] = useState('');
  const [billing_nom, setbilling_nom] = useState('');
  const [billing_adresse1, setbilling_addresse1] = useState('');
  const [billing_adresse2, setbilling_addresse2] = useState('');
  const [billing_ville, setbilling_ville] = useState('');
  const [billing_codePostal, setbilling_codePostal] = useState('');
  const [billing_pays, setbilling_pays] = useState('');
  const [billing_telephone, setbilling_telephone] = useState('');

  const [shipping_prenom, setshipping_prenom] = useState('');
  const [shipping_nom, setshipping_nom] = useState('');
  const [shipping_adresse1, setshipping_addresse1] = useState('');
  const [shipping_adresse2, setshipping_addresse2] = useState('');
  const [shipping_ville, setshipping_ville] = useState('');
  const [shipping_codePostal, setshipping_codePostal] = useState('');
  const [shipping_pays, setshipping_pays] = useState('');
  const [shipping_telephone, setshipping_telephone] = useState('');

  const [paymentOptions, setPaymentOptions] = useState([]);
  const [billingAddress, setBillingAddresses] = useState([]);
  const [adresses, setAdresses] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/connexion", { state: { from: "/settings" } });
    }
    // Appeler l'API pour obtenir les adresses
    fetchPaymentOptions();
    fetchBillingAddresses();
    fetchAdresses();
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

  const fetchAdresses = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}adresses.json`);
      const adressesData = response.data;
      const userAdresses = Object.values(adressesData).filter((adresse) => adresse.user_Id === userIdFromStorage);
      setAdresses(userAdresses);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(
      fullName,
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
    );

    setFullName('');
    setEmail('');
    setPassword('');
    setConfPassword('');

    setCardName('');
    setCardNumber('');
    setExpiryDate('');
    setCvv('');

    setbilling_prenom('');
    setbilling_nom('');
    setbilling_addresse1('');
    setbilling_addresse2('');
    setbilling_ville('');
    setbilling_codePostal('');
    setbilling_pays('');
    setbilling_telephone('');

    setshipping_prenom('');
    setshipping_nom('');
    setshipping_addresse1('');
    setshipping_addresse2('');
    setshipping_ville('');
    setshipping_codePostal('');
    setshipping_pays('');
    setshipping_telephone('');
  };

  const handlePaymentSelect = (payment) => {
    setCardName(payment.cardName);
    setCardNumber(payment.cardNumber);
    setExpiryDate(payment.expiryDate);
    setCvv(payment.cvv);
  };

  const handleAdresseSelect = (id) => {
    const selectedAdresse = adresses.find(adresse => adresse.id === id);
    setshipping_prenom(selectedAdresse.prenom);
    setshipping_nom(selectedAdresse.nom);
    setshipping_addresse1(selectedAdresse.adresse1);
    setshipping_addresse2(selectedAdresse.adresse2);
    setshipping_ville(selectedAdresse.ville);
    setshipping_codePostal(selectedAdresse.codePostal);
    setshipping_pays(selectedAdresse.pays);
    setshipping_telephone(selectedAdresse.telephone);
  };

  const handleBillingSelect = (id) => {
    const selectedBillingAddress = billingAddress.find(address => address.id === id);
    setbilling_prenom(selectedBillingAddress.prenom);
    setbilling_nom(selectedBillingAddress.nom);
    setbilling_addresse1(selectedBillingAddress.adresse1);
    setbilling_addresse2(selectedBillingAddress.adresse2);
    setbilling_ville(selectedBillingAddress.ville);
    setbilling_codePostal(selectedBillingAddress.codePostal);
    setbilling_pays(selectedBillingAddress.pays);
    setbilling_telephone(selectedBillingAddress.telephone);
  };

  return (
    <div className='m-5'>
      <h2>Paramètres du compte</h2>
      <form onSubmit={handleFormSubmit}>
        {/* ... Autres champs de formulaire ... */}
        <div className='my-3'>
          <label>Nom complet :</label>
          <br />
          <input
            className='form-control'
            type='text'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className='my-3'>
          <label>E-mail :</label>
          <br />
          <input
            className='form-control'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='my-3'>
          <label>Mot de passe :</label>
          <br />
          <input
            className='form-control'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='my-3'>
          <label>Confirmation de mot de passe :</label>
          <br />
          <input
            className='form-control'
            type='password'
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
          />
        </div>
        
        <div className='mb-3 mx-5 d-flex'>
          <div className='w-50'>
            <Dropdown>
              <Dropdown.Toggle variant="info" id="dropdown-basic1">
                Choisissez une option de paiement
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {paymentOptions.map(payment => (
                  <Dropdown.Item
                    key={payment.id}
                    onClick={() => handlePaymentSelect(payment)}
                  >
                    {payment.cardName} - {payment.cardNumber}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            {/* ... Autres champs pour les détails de paiement ... */}

            <form>
              <label className='fw-bold'>Nom sur la carte</label>
              <br />
              <input
                type='text'
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
              <br />
              <label className='fw-bold'>Numéro de carte</label>
              <br />
              <input
                type='text'
                pattern='\d*'
                maxLength='16'
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <br />
              <label className='fw-bold'>Date d'expiration</label>
              <br />
              <input
                type='text'
                pattern='(0[1-9]|1[0-2])\/\d{2}'
                maxLength='5'
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
              <br />
              <label className='fw-bold'>CVV</label>
              <br />
              <input
                type='text'
                pattern='\d{3}'
                maxLength='3'
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </form>

          </div>
          <div className='w-50'>
            <Dropdown>
              <Dropdown.Toggle variant='info' id='dropdown-basic2'>
                Choisissez une adresse de facturation
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {billingAddress.map(address => (
                  <Dropdown.Item
                    key={address.id}
                    onClick={() => handleBillingSelect(address.id)}
                  >
                    {address.prenom} {address.nom} - {address.adresse1}, {address.ville}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            {/* ... Autres champs pour les détails de facturation ... */}
            <form className=''>
                <label htmlFor='billing_prenom' className='fw-bold'>Prénom</label>
                <br />
                <input
                  type='text'
                  name='billing_prenom'
                  id = ''
                  className='mb-3'
                  value={billing_prenom}
                  onChange={(e) => setbilling_prenom(e.target.value)}
                />
                <br />
                <label htmlFor='billing_nom' className='fw-bold'>Nom</label>
                <br />
                <input
                  type='text'
                  name='billing_nom'
                  id='billing_nom'
                  className='mb-3'
                  value={billing_nom}
                  onChange={(e) => setbilling_nom(e.target.value)}
                />
                <br />
                <label htmlFor='billing_adresse1' className='fw-bold'>Adresse 1</label>
                <br />
                <input
                  type='text'
                  name='billing_adresse1'
                  id='billing_adresse1'
                  className='mb-3'
                  value={billing_adresse1}
                  onChange={(e) => setbilling_addresse1(e.target.value)}
                />
                <br/>
                <label htmlFor='billing_addresse2' className='fw-bold'>Adresse 2</label>
                <br />
                <input
                  type='text'
                  name='billing_addresse2'
                  id='billing_addresse2'
                  className='mb-3'
                  value={billing_adresse2}
                  onChange={(e) => setbilling_addresse2(e.target.value)}
                />
                <br/>
                <label htmlFor='billing_ville' className='fw-bold'>Ville</label>
                <br/>
                <input
                  type='text'
                  name='billing_ville'
                  id='billing_ville'
                  className='mb-3'
                  value={billing_ville}
                  onChange={(e) => setbilling_ville(e.target.value)}
                />
                <br />
                <label htmlFor='billing_codePostal' className='fw-bold'>Code Postal</label>
                <br />
                <input
                  type='number'
                  name='billing_codePostal'
                  id='billing_codePostal'
                  className='mb-3'
                  value={billing_codePostal}
                  onChange={(e) => setbilling_codePostal(e.target.value)}
                />
                <br />
                <label htmlFor='billing_pays' className='fw-bold'>Pays</label>
                <br />
                <input
                  type='text'
                  name='billing_pays'
                  id='billing_pays'
                  className='mb-3'
                  value={billing_pays}
                  onChange={(e) => setbilling_pays(e.target.value)}
                />
                <br />
                <label htmlFor='billing_telephone' className='fw-bold'>Numéro de téléphone</label>
                <br />
                <input
                  type='tel'
                  name='billing_telephone'
                  id='billing_telephone'
                  className='mb-3'
                  value={billing_telephone}
                  maxLength={10}
                  onChange={(e) => setbilling_telephone(e.target.value)}
                />
                <br />
              </form>
          </div>
          <div className='w-50'>
            <Dropdown>
              <Dropdown.Toggle variant='info' id='dropdown-basic3'>
                Choisissez une adresse de livraison
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {adresses.map(adresse => (
                  <Dropdown.Item
                    key={adresse.id}
                    onClick={() => handleAdresseSelect(adresse.id)}
                  >
                    {adresse.adresse1}, {adresse.ville}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            {/* ... Autres champs pour les détails de livraison ... */}
            <form className=''>
                <label htmlFor='shipping_prenom' className='fw-bold'>Prénom</label>
                <br />
                <input
                  type='text'
                  name='shipping_prenom'
                  id='shipping_prenom'
                  className='mb-3'
                  value={shipping_prenom}
                  onChange={(e) => setshipping_prenom(e.target.value)}
                />
                <br />
                <label htmlFor='shipping_nom' className='fw-bold'>Nom</label>
                <br />
                <input
                  type='text'
                  name='shipping_nom'
                  id='shipping_nom'
                  className='mb-3'
                  value={shipping_nom}
                  onChange={(e) => setshipping_nom(e.target.value)}
                />
                <br />
                <label htmlFor='shipping_addresse1' className='fw-bold'>Adresse 1</label>
                <br />
                <input
                  type='text'
                  name='shipping_addresse1'
                  id='shipping_addresse1'
                  className='mb-3'
                  value={shipping_adresse1}
                  onChange={(e) => setshipping_addresse1(e.target.value)}
                />
                <br />
                <label htmlFor='shipping_addresse2' className='fw-bold'>Adresse 2</label>
                <br />
                <input
                  type='text'
                  name='shipping_addresse2'
                  id='shipping_addresse2'
                  className='mb-3'
                  value={shipping_adresse2}
                  onChange={(e) => setshipping_addresse2(e.target.value)}
                />
                <br />
                <label htmlFor='shipping_ville' className='fw-bold'>Ville</label>
                <br />
                <input
                  type='text'
                  name='shipping_ville'
                  id='shipping_ville'
                  className='mb-3'
                  value={shipping_ville}
                  onChange={(e) => setshipping_ville(e.target.value)}
                />
                <br />
                <label htmlFor='shipping_codePostal' className='fw-bold'>Code Postal</label>
                <br />
                <input
                  type='number'
                  name='shipping_codePostal'
                  id='shipping_codePostal'
                  className='mb-3'
                  value={shipping_codePostal}
                  onChange={(e) => setshipping_codePostal(e.target.value)}
                />
                <br />
                <label htmlFor='shipping_pays' className='fw-bold'>Pays</label>
                <br />
                <input
                  type='text'
                  name='shipping_pays'
                  id='shipping_pays'
                  className='mb-3'
                  value={shipping_pays}
                  onChange={(e) => setshipping_pays(e.target.value)}
                />
                <br />
                <label htmlFor='shipping_telephone' className='fw-bold'>Numéro de téléphone</label>
                <br />
                <input
                  type='tel'
                  name='shipping_telephone'
                  id='shipping_telephone'
                  className='mb-3'
                  value={shipping_telephone}
                  maxLength={10}
                  onChange={(e) => setshipping_telephone(e.target.value)}
                />
                <br />
              </form>

          </div>
        </div>
        {/* ... Autres boutons, divs, etc. ... */}
        <div className='d-flex justify-content-center'>
          <button className='btn btn-brown' type='submit'>Enregistrer les modifications</button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
