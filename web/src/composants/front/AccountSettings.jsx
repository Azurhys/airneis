import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import useConfigsetting from "../../hook/useConfigsetting";
import './AccountSettings.css';

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
    

    <body>
      
    <link href="https://netdna.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"></link>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
    <div class="container bootstrap snippets bootdeys">
      <div class="row">
        <div class="col-xs-12 col-sm-9">
          <form class="form-horizontal" onSubmit={handleFormSubmit}>
            
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">Informations Utilisateur</h4>
              </div>
              <div class="panel-body">
                <div class="form-group">
                  <label class="col-sm-2 control-label">Nom complet</label>
                  <div class="col-sm-10">
                  <input
                    className='form-control'
                    type='text'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">E-mail</label>
                  <div class="col-sm-10">
                  <br />
                  <input
                    className='form-control'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  </div>
                </div>
                
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">informations livraison</h4>
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
              </div>
              <div class="panel-body">
                <div class="form-group">
                  <label class="col-sm-2 control-label">Prénom</label>
                  <div class="col-sm-10">
                  <br />
                  <input
                    type='text'
                    name='shipping_prenom'
                    id='shipping_prenom'
                    className='form-control'
                    value={billingDetails.prenom_deux}
                    onChange={handleBillingDetailsChange}
                  />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">Nom</label>
                  <div class="col-sm-10">
                  <br />
                  <input
                   type='text'
                   name='shipping_nom'
                   id='shipping_nom'
                   className='form-control'
                   value={billingDetails.nom_deux}
                   onChange={handleBillingDetailsChange}
                  />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">Adresse 1</label>
                  <div class="col-sm-10">
                  <br />
                  <input
                    type='text'
                    name='shipping_adresse1'
                    id='shipping_adresse1'
                    className='form-control'
                    value={billingDetails.adresse_deux}
                    onChange={handleBillingDetailsChange}
                  />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">Adresse 2</label>
                  <div class="col-sm-10">
                  <br />
                  <input
                    type='text'
                    name='shipping_adresse2'
                    id='shipping_adresse2'
                    className='form-control'
                    value={billingDetails.adresse2_deux}
                    onChange={handleBillingDetailsChange}
                  />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">Ville</label>
                  <div class="col-sm-10">
                  <br />
                  <input
                    type='text'
                    name='shipping_ville'
                    id='shipping_ville'
                    className='form-control'
                    value={billingDetails.ville_deux}
                    onChange={handleBillingDetailsChange}
                  />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">Code postal</label>
                  <div class="col-sm-10">
                  <br />
                  <input
                    type='number'
                    name='shipping_codePostal'
                    id='shipping_codePostal'
                    className='form-control'
                    value={billingDetails.codePostal_deux}
                    onChange={handleBillingDetailsChange}
                  />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">Pays</label>
                  <div class="col-sm-10">
                  <br />
                  <input
                     type='text'
                     name='shipping_pays'
                     id='shipping_pays'
                     className='form-control'
                     value={billingDetails.pays_deux}
                     onChange={handleBillingDetailsChange}
                  />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">Numéro de téléphone</label>
                  <div class="col-sm-10">
                  <br />
                  <input
                    type='tel'
                    name='shipping_telephone'
                    id='shipping_telephone'
                    className='form-control'
                    value={billingDetails.telephone_deux}
                    maxLength={10}
                    onChange={handleBillingDetailsChange}
                  />
                  </div>
                </div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  Informations facturation
                </h4>
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
      
                
              </div>
              <div class="panel-body">
                <div class="form-group">
                  <label class="col-sm-2 control-label">Prénom</label>
                  <div class="col-sm-10">
                  <br />
                  <input
                    type='text'
                    name='billing_prenom'
                    id = ''
                    className='form-control'
                    value={billingDetails.prenom_un}
                    onChange={handleBillingDetailsChange}
                  />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">Nom</label>
                  <div class="col-sm-10">
                  <br />
                  <input
                    type='text'
                    name='billing_nom'
                    id='billing_nom'
                    className='form-control'
                    value={billingDetails.nom_un}
                    onChange={handleBillingDetailsChange}
                  />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">Adresse 1</label>
                  <div class="col-sm-10">
                  <br />
                  <input
                    type='text'
                    name='billing_addresse1'
                    id='billing_addresse1'
                    className='form-control'
                    value={billingDetails.adresse1_un}
                    onChange={handleBillingDetailsChange}
                  />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">Adresse 2</label>
                  <div class="col-sm-10">
                  <br />
                  <input
                    type='text'
                    name='billing_addresse2'
                    id='billing_addresse2'
                    className='form-control'
                    value={billingDetails.adresse2_un}
                    onChange={handleBillingDetailsChange}
                  />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">Ville</label>
                  <div class="col-sm-10">
                  <br />
                  <input
                    type='text'
                    name='billing_ville'
                    id='billing_ville'
                    className='form-control'
                    value={billingDetails.ville_un}
                    onChange={handleBillingDetailsChange}
                  />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">Code postal</label>
                  <div class="col-sm-10">
                  <br />
                  <input
                    type='number'
                    name='billing_codePostal'
                    id='billing_codePostal'
                    className='form-control'
                    value={billingDetails.codePostal_un}
                    onChange={handleBillingDetailsChange}
                  />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">Pays</label>
                  <div class="col-sm-10">
                  <br />
                  <input
                    type='text'
                    name='billing_pays'
                    id='billing_pays'
                    className='form-control'
                    value={billingDetails.pays_un}
                    onChange={handleBillingDetailsChange}
                  />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">Numéro de téléphone</label>
                  <div class="col-sm-10">
                  <br />
                  <input
                    type='tel'
                    name='billing_telephone'
                    id='billing_telephone'
                    className='form-control'
                    value={billingDetails.telephone_un}
                    maxLength={10}
                    onChange={handleBillingDetailsChange}
                  />
                  </div>
                </div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  Informations carte
                </h4>
                <div className=''>
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
                </div>
      
                
              </div>
              <div class="panel-body">
                <div class="form-group">
                  <label class="col-sm-2 control-label">Nom sur la carte</label>
                  <div class="col-sm-10">
                  <br />
                  <input
                   type='text'
                   value={cardName}
                   onChange={(e) => setCardName(e.target.value)}
                    className='form-control'
                  />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">Numéro de carte</label>
                  <div class="col-sm-10">
                  <br />
                  <input
                    type='text'
                    pattern='\d*'
                    maxLength='16'
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className='form-control'
                    
                  />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">Date d'expiration</label>
                  <div class="col-sm-10">
                  <br />
                  <input
                    type='text'
                    pattern='(0[1-9]|1[0-2])/\d{2}'
                    maxLength='5'
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className='form-control'
                   
                  />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">CVV</label>
                  <div class="col-sm-10">
                  <br />
                  <input
                    type='text'
                    pattern='\d{3}'
                    maxLength='3'
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className='form-control'
                   
                  />
                  </div>
                </div>
                
                
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">securite</h4>
              </div>
              <div class="panel-body">
                <div class="form-group">
                  <label class="col-sm-2 control-label">Mot de passe :</label>
                  <div class="col-sm-10">
                  <input
                    className='form-control'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">nouveau mot de passe</label>
                  <div class="col-sm-10">
                  <input
                    className='form-control'
                    type='password'
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                  />
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-sm-10 col-sm-offset-2">
                    <button type="submit" class="btn btn-primary">Enregistrer les modifications</button>
                    
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
    <script src="https://netdna.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript"></script>
  </body>











    
  );
};

export default AccountSettings;