import React, { useState } from 'react';
import axios from 'axios';
import useEmailValidation from '../../verif/useEmailExiste';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: '',
  });

  const isEmailValid = useEmailValidation(formData.email);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isEmailValid) {
      setErrorMessage("L'adresse e-mail est déjà utilisée.");
      return;
    } else {
      setErrorMessage("Inscription réussie !");
      setTimeout(() => {
        window.location.href = "/";// A revoir car pas opti
      }, 1400); // Temps d'attente de 1.4 secondes avant la redirection
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_API}clients.json`, formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <div>
        <div className='my-3 text-center'>
          <h1>Inscription</h1>
        </div>
        <br />
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <form onSubmit={handleSubmit}>
          <div>
            
            <label>
              <h6>Nom Complet:</h6>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
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