import React, { useState } from 'react';

const AccountSettings = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    // Effectuer des actions supplémentaires, telles que l'appel à une API pour mettre à jour les informations du compte
    console.log('Informations du compte mises à jour :', {
      fullName,
      email,
      password,
      shippingAddress,
      billingAddress,
      paymentMethods,
    });
  };

  return (
    <div className='m-5'>
      <h2>Paramètres du compte</h2>
      <form onSubmit={handleSubmit}>
        <div className='my-3'>
          <label>Nom complet :</label>
          <br />
          <input className='form-control'
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className='my-3'>
          <label>E-mail :</label>
          <br />
          <input className='form-control'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='my-3'>
          <label>Mot de passe :</label>
          <br />
          <input className='form-control'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='my-3'>
          <label>Adresse de livraison :</label>
          <br />
          <textarea className='form-control'
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
          />
        </div>
        <div className='my-3'> 
          <label>Adresse de facturation :</label>
          <br />
          <textarea className='form-control'
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
          />
        </div>
        <div className='my-3 '>
          <label>Méthodes de paiement :</label>
          <br />
          <input className='form-control'
            type="text"
            value={paymentMethods}
            onChange={(e) => setPaymentMethods(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-center"><button className='btn btn-brown ' type="submit">Enregistrer les modifications</button></div>
      </form>
    </div>
  );
};

export default AccountSettings;
