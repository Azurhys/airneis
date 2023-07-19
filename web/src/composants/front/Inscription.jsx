import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import useEmailValidation from '../../verif/useEmailExiste';
import axios from 'axios';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: '',
    user_Id: '',
    categorie_user_Id: 0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!emailValidationResult.isEmailValid) {
      setErrorMessage("L'adresse e-mail est déjà utilisée.");
      return;
    } else {
      setErrorMessage("Inscription réussie !");
    }

    try {
      const clientId = Math.floor(Math.random() * 1000000);
      const clientData = { ...formData, user_Id : clientId};
      await axios.post(`${import.meta.env.VITE_API}clients.json`, clientData);

      // Envoyer l'e-mail de confirmation à l'utilisateur
      const templateParams = {
        to_email: formData.email,
        from_name: 'Votre nom ou nom de l\'expéditeur',
        message: `Bonjour ${formData.firstName},\n\nVotre inscription est confirmée. Bienvenue !`,
      };

      await emailjs.send('service_ri1kv3q', 'template_af5z69e', templateParams, 'rit4hqMIVPN1n8NeD');

      console.log('E-mail de confirmation envoyé !');
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail de confirmation:', error);
    }
  };

  const emailValidationResult = useEmailValidation(formData.email);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <>
      <div>
        <div className='my-3 text-center'>
          <h1>Inscription</h1>
        </div>
        <br />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                <h6>Nom Complet:</h6>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>

            <br />

            <div className='my-3'>
              <label>
                <h6>Email:</h6>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>

            <br />

            <div className='my-3'>
              <label>
                <h6>Mot de Passe:</h6>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <br />

            <div className='mt-3 text-center'>
              <button style={{ maxWidth: '100%', maxHeight: '100%' }} type="submit">S'inscrire</button>
            </div>
          </form>
        </div>
        <div id="message-container" className="error-message text-center">
          {errorMessage}
        </div>
        <div className='text-center'>
          <br />
          <h6>Déjà un compte ? <a href="/Connexion">Connectez-vous.</a></h6>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
