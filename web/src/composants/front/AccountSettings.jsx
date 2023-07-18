import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import useConfigsetting from "../../hook/useConfigsetting";
import './AccountSettings.css';
import { AuthContext } from '../../context/Authcontext';

const AccountSettings = () => {
    const { handleSubmit } = useConfigsetting();    
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const [paymentMethods, setPaymentMethods] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');

    const [paymentOptions, setPaymentOptions] = useState([]);
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const [useAddress, setUseAddress] = useState(false);
    const [billingAddresses, setBillingAdresses] = useState([]);
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/connexion", { state: { from: "/settings" } });
        }
      }, [isAuthenticated, navigate]);
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
        shippingAddress,
        billingAddress,
        paymentMethods
      );

      setFullName('');
      setEmail('');
      setPassword('');
      setCardName('');
      setCardNumber('');
      setExpiryDate('');
      setCvv('');
      setPassword('');
      setPassword('');
      setConfPassword('');
      setShippingAddress('');
      setBillingAddress('');
      setPaymentMethods('');
    };

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

  const [billingDetails, setBillingDetails] = useState(initialBillingAddress);

  const handleBillingDetailsChange = (e) => {
    setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
  };

  const handlePaymentSelect = (payment) => {
    setSelectedPayment(payment);
    setCardName(payment.cardName);
    setCardNumber(payment.cardNumber);
    setExpiryDate(payment.expiryDate);
    setCvv(payment.cvv);
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
              <Dropdown.Toggle variant='info' id='dropdown-basic1'>
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
                <Dropdown.Toggle variant='info' id='dropdown-basic2'>
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
              <form className=''>
                <label htmlFor='billing_prenom' className='fw-bold'>Prénom</label>
                <br />
                <input
                  type='text'
                  name='billing_prenom'
                  id = ''
                  className='mb-3'
                  value={billingDetails.prenom_un}
                  onChange={handleBillingDetailsChange}
                />
                <br />
                <label htmlFor='billing_nom' className='fw-bold'>Nom</label>
                <br />
                <input
                  type='text'
                  name='billing_nom'
                  id='billing_nom'
                  className='mb-3'
                  value={billingDetails.nom_un}
                  onChange={handleBillingDetailsChange}
                />
                <br />
                <label htmlFor='billing_addresse1' className='fw-bold'>Adresse 1</label>
                <br />
                <input
                  type='text'
                  name='billing_addresse1'
                  id='billing_addresse1'
                  className='mb-3'
                  value={billingDetails.adresse1_un}
                  onChange={handleBillingDetailsChange}
                />
                <br/>
                <label htmlFor='billing_addresse2' className='fw-bold'>Adresse 2</label>
                <br />
                <input
                  type='text'
                  name='billing_addresse2'
                  id='billing_addresse2'
                  className='mb-3'
                  value={billingDetails.adresse2_un}
                  onChange={handleBillingDetailsChange}
                />
                <br/>
                <label htmlFor='billing_ville' className='fw-bold'>Ville</label>
                <br/>
                <input
                  type='text'
                  name='billing_ville'
                  id='billing_ville'
                  className='mb-3'
                  value={billingDetails.ville_un}
                  onChange={handleBillingDetailsChange}
                />
                <br />
                <label htmlFor='billing_codePostal' className='fw-bold'>Code Postal</label>
                <br />
                <input
                  type='number'
                  name='billing_codePostal'
                  id='billing_codePostal'
                  className='mb-3'
                  value={billingDetails.codePostal_un}
                  onChange={handleBillingDetailsChange}
                />
                <br />
                <label htmlFor='billing_pays' className='fw-bold'>Pays</label>
                <br />
                <input
                  type='text'
                  name='billing_pays'
                  id='billing_pays'
                  className='mb-3'
                  value={billingDetails.pays_un}
                  onChange={handleBillingDetailsChange}
                />
                <br />
                <label htmlFor='billing_telephone' className='fw-bold'>Numéro de téléphone</label>
                <br />
                <input
                  type='tel'
                  name='billing_telephone'
                  id='billing_telephone'
                  className='mb-3'
                  value={billingDetails.telephone_un}
                  maxLength={10}
                  onChange={handleBillingDetailsChange}
                />
                <br />
              </form>

          </div>
          <div className='w-50'>
            <div className=''>
              <Dropdown>
                <Dropdown.Toggle variant='info' id='dropdown-basic3'>
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
              <form className=''>
                <label htmlFor='shipping_prenom' className='fw-bold'>Prénom</label>
                <br />
                <input
                  type='text'
                  name='shipping_prenom'
                  id='shipping_prenom'
                  className='mb-3'
                  value={billingDetails.prenom_deux}
                  onChange={handleBillingDetailsChange}
                />
                <br />
                <label htmlFor='shipping_nom' className='fw-bold'>Nom</label>
                <br />
                <input
                  type='text'
                  name='shipping_nom'
                  id='shipping_nom'
                  className='mb-3'
                  value={billingDetails.nom_deux}
                  onChange={handleBillingDetailsChange}
                />
                <br />
                <label htmlFor='shipping_adresse1' className='fw-bold'>Adresse 1</label>
                <br />
                <input
                  type='text'
                  name='shipping_adresse1'
                  id='shipping_adresse1'
                  className='mb-3'
                  value={billingDetails.adresse_deux}
                  onChange={handleBillingDetailsChange}
                />
                <br />
                <label htmlFor='shipping_adresse2' className='fw-bold'>Adresse 2</label>
                <br />
                <input
                  type='text'
                  name='shipping_adresse2'
                  id='shipping_adresse2'
                  className='mb-3'
                  value={billingDetails.adresse2_deux}
                  onChange={handleBillingDetailsChange}
                />
                <br />
                <label htmlFor='shipping_ville' className='fw-bold'>Ville</label>
                <br />
                <input
                  type='text'
                  name='shipping_ville'
                  id='shipping_ville'
                  className='mb-3'
                  value={billingDetails.ville_deux}
                  onChange={handleBillingDetailsChange}
                />
                <br />
                <label htmlFor='shipping_codePostal' className='fw-bold'>Code Postal</label>
                <br />
                <input
                  type='number'
                  name='shipping_codePostal'
                  id='shipping_codePostal'
                  className='mb-3'
                  value={billingDetails.codePostal_deux}
                  onChange={handleBillingDetailsChange}
                />
                <br />
                <label htmlFor='shipping_pays' className='fw-bold'>Pays</label>
                <br />
                <input
                  type='text'
                  name='shipping_pays'
                  id='shipping_pays'
                  className='mb-3'
                  value={billingDetails.pays_deux}
                  onChange={handleBillingDetailsChange}
                />
                <br />
                <label htmlFor='shipping_telephone' className='fw-bold'>Numéro de téléphone</label>
                <br />
                <input
                  type='tel'
                  name='shipping_telephone'
                  id='shipping_telephone'
                  className='mb-3'
                  value={billingDetails.telephone_deux}
                  maxLength={10}
                  onChange={handleBillingDetailsChange}
                />
                <br />
              </form>
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