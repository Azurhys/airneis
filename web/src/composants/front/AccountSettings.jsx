import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import useConfigsetting from "../../hook/useConfigsetting";

const AccountSettings = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [paymentMethods, setPaymentMethods] = useState('');
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [useDeliveryAddress, setUseDeliveryAddress] = useState(false);
  const [useAddress, setUseAddress] = useState(false);
  const [billingAddresses, setBillingAddresses] = useState([]);
  const { isSuccess, error, handleSubmit } = useConfigsetting();
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(
      fullName,
      email,
      password,
      shippingAddress,
      billingAddress,
      paymentMethods
    );

    setFullName('');
    setEmail('');
    setPassword('');
    setConfPassword('');
    setShippingAddress('');
    setBillingAddress('');
    setPaymentMethods('');
  };
  
  const handleUseDeliveryAddressChange = (event) => {
    setUseDeliveryAddress(event.target.checked);
    if (event.target.checked) {
      const deliveryAddress = JSON.parse(localStorage.getItem('deliveryAddress'));
      setBillingAddress(deliveryAddress);
    } else {
      setBillingAddress(billingAddresses[0]); // Utilisez une valeur par défaut appropriée pour billingAddresses
    }
  };
  
  const handleUseAddressChange = (event) => {
    setUseAddress(event.target.checked);
    if (event.target.checked) {
      const deliveryAddress = JSON.parse(localStorage.getItem('deliveryAddress'));
      setBillingAddress(deliveryAddress);
    } else {
      setBillingAddress(billingAddresses[0]); // Utilisez une valeur par défaut appropriée pour billingAddresses
    }
  };

  const initialBillingAddress = {
    prenom: '',
    nom: '',
    adresse1: '',
    adresse2: '',
    ville: '',
    codePostal: '',
    pays: '',
    telephone: '',
  };

  const [billingDetails, setBillingDetails] = useState(initialBillingAddress);

  const handleBillingDetailsChange = (e) => {
    setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className='m-5'>
      <h2>Paramètres du compte</h2>
      <form onSubmit={handleFormSubmit}>
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
              <Dropdown.Toggle variant='info' id='dropdown-basic'>
                Choisissez une option de paiement
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {paymentOptions.map((payment) => (
                  <Dropdown.Item
                    key={payment.cardNumber}
                    onClick={() => handlePaymentSelect(payment)}
                  >
                    {payment.cardName} - {payment.cardNumber}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <br />

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
            <div className=''>
              <Dropdown>
                <Dropdown.Toggle variant='info' id='dropdown-basic'>
                  Choisissez une adresse de facturation
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {billingAddresses.map((address, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => setBillingDetails(address)}
                    >
                      {address.prenom} {address.nom} - {address.adresse1}, {address.ville}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {!useDeliveryAddress && (
              <form className=''>
                <label htmlFor='fname' className='fw-bold'>Prénom</label>
                <br />
                <input
                  type='text'
                  name='prenom'
                  className='mb-3'
                  value={billingDetails.prenom}
                  onChange={handleBillingDetailsChange}
                />
                <br />
                <label htmlFor='fname' className='fw-bold'>Nom</label>
                <br />
                <input
                  type='text'
                  name='nom'
                  className='mb-3'
                  value={billingDetails.nom}
                  onChange={handleBillingDetailsChange}
                />
                <br />
                <label htmlFor='fname' className='fw-bold'>Adresse 1</label>
                <br />
                <input
                  type='text'
                  name='adresse1'
                  className='mb-3'
                  value={billingDetails.adresse1}
                  onChange={handleBillingDetailsChange}
                />
                <br />
                <label htmlFor='fname' className='fw-bold'>Adresse 2</label>
                <br />
                <input
                  type='text'
                  name='adresse2'
                  className='mb-3'
                  value={billingDetails.adresse2}
                  onChange={handleBillingDetailsChange}
                />
                <br />
                <label htmlFor='fname' className='fw-bold'>Ville</label>
                <br />
                <input
                  type='text'
                  name='ville'
                  className='mb-3'
                  value={billingDetails.ville}
                  onChange={handleBillingDetailsChange}
                />
                <br />
                <label htmlFor='fname' className='fw-bold'>Code Postal</label>
                <br />
                <input
                  type='number'
                  name='codePostal'
                  className='mb-3'
                  value={billingDetails.codePostal}
                  onChange={handleBillingDetailsChange}
                />
                <br />
                <label htmlFor='pays' className='fw-bold'>Pays</label>
                <br />
                <input
                  type='text'
                  name='pays'
                  className='mb-3'
                  value={billingDetails.pays}
                  onChange={handleBillingDetailsChange}
                />
                <br />
                <label htmlFor='telephone' className='fw-bold'>Numéro de téléphone</label>
                <br />
                <input
                  type='tel'
                  name='telephone'
                  className='mb-3'
                  value={billingDetails.telephone}
                  maxLength={10}
                  onChange={handleBillingDetailsChange}
                />
                <br />
              </form>
            )}
          </div>
          <div className='w-50'>
            <div className=''>
              <Dropdown>
                <Dropdown.Toggle variant='info' id='dropdown-basic'>
                  Choisissez une adresse de délivraison
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {billingAddresses.map((address, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => setBillingDetails(address)}
                    >
                      {address.prenom} {address.nom} - {address.adresse1}, {address.ville}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {!useAddress && (
              <form className=''>
                <label htmlFor='fname' className='fw-bold'>Prénom</label>
                <br />
                <input
                  type='text'
                  name='prenom'
                  className='mb-3'
                  value={billingDetails.prenom}
                  onChange={handleBillingDetailsChange}
                />
                <br />
                <label htmlFor='fname' className='fw-bold'>Nom</label>
                <br />
                <input
                  type='text'
                  name='nom'
                  className='mb-3'
                  value={billingDetails.nom}
                  onChange={handleBillingDetailsChange}
                />
                <br />
                <label htmlFor='fname' className='fw-bold'>Adresse 1</label>
                <br />
                <input
                  type='text'
                  name='adresse1'
                  className='mb-3'
                  value={billingDetails.adresse1}
                  onChange={handleBillingDetailsChange}
                />
                <br />
                <label htmlFor='fname' className='fw-bold'>Adresse 2</label>
                <br />
                <input
                  type='text'
                  name='adresse2'
                  className='mb-3'
                  value={billingDetails.adresse2}
                  onChange={handleBillingDetailsChange}
                />
                <br />
                <label htmlFor='fname' className='fw-bold'>Ville</label>
                <br />
                <input
                  type='text'
                  name='ville'
                  className='mb-3'
                  value={billingDetails.ville}
                  onChange={handleBillingDetailsChange}
                />
                <br />
                <label htmlFor='fname' className='fw-bold'>Code Postal</label>
                <br />
                <input
                  type='number'
                  name='codePostal'
                  className='mb-3'
                  value={billingDetails.codePostal}
                  onChange={handleBillingDetailsChange}
                />
                <br />
                <label htmlFor='pays' className='fw-bold'>Pays</label>
                <br />
                <input
                  type='text'
                  name='pays'
                  className='mb-3'
                  value={billingDetails.pays}
                  onChange={handleBillingDetailsChange}
                />
                <br />
                <label htmlFor='telephone' className='fw-bold'>Numéro de téléphone</label>
                <br />
                <input
                  type='tel'
                  name='telephone'
                  className='mb-3'
                  value={billingDetails.telephone}
                  maxLength={10}
                  onChange={handleBillingDetailsChange}
                />
                <br />
              </form>
            )}
          </div>
        </div>

        <div className='d-flex justify-content-center'>
          <button className='btn btn-brown' type='submit'>Enregistrer les modifications</button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
