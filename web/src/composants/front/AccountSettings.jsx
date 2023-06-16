import React, { useRef } from 'react';
import useConfigsetting from "../../hook/useConfigsetting";

const AccountSettings = () => {
  const fullNameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const shippingAddressRef = useRef('');
  const billingAddressRef = useRef('');
  const paymentMethodsRef = useRef([]);

  const userId = localStorage.getItem('userID');
  const { isSuccess, error, handleSubmit } = useConfigsetting();

  // Fonction pour gérer la soumission du formulaire
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(
      fullNameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value,
      shippingAddressRef.current.value,
      billingAddressRef.current.value,
      paymentMethodsRef.current.value,
      userId
    );
    // Réinitialiser les champs du formulaire
    fullNameRef.current.value = '';
    emailRef.current.value = '';
    passwordRef.current.value = '';
    shippingAddressRef.current.value = '';
    billingAddressRef.current.value = '';
    paymentMethodsRef.current.value = [];
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
            type="text"
            ref={fullNameRef}
          />
        </div>
        <div className='my-3'>
          <label>E-mail :</label>
          <br />
          <input
            className='form-control'
            type="email"
            ref={emailRef}
          />
        </div>
        <div className='my-3'>
          <label>Mot de passe :</label>
          <br />
          <input
            className='form-control'
            type="password"
            ref={passwordRef}
          />
        </div>
        <div className='my-3'>
          <label>Adresse de livraison :</label>
          <br />
          <textarea
            className='form-control'
            ref={shippingAddressRef}
          />
        </div>
        <div className='my-3'> 
          <label>Adresse de facturation :</label>
          <br />
          <textarea
            className='form-control'
            ref={billingAddressRef}
          />
        </div>
        <div className='my-3 '>
          <label>Méthodes de paiement :</label>
          <br />
          <input
            className='form-control'
            type="text"
            ref={paymentMethodsRef}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button className='btn btn-brown' type="submit">Enregistrer les modifications</button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
