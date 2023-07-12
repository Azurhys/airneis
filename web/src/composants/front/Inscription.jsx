import React, { useState } from 'react';
import axios from 'axios';
import useEmailValidation from '../../verif/useEmailExiste';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: '',
    user_Id : '', 
    categorie_user_Id : 0, // Champ pour la catégorie du client
  });

  const isEmailValid = useEmailValidation(formData.email);

  // Gère les modifications des champs de saisie
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [errorMessage, setErrorMessage] = useState('');

  // Soumet le formulaire d'inscription
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isEmailValid) {
      setErrorMessage("L'adresse e-mail est déjà utilisée.");
      return;
    } else {
      setErrorMessage("Inscription réussie !");
      //window.location.href = "/"; // Redirige vers la page d'accueil après une inscription réussie (à revoir pour une meilleure approche)
    }

    try {
      // Générer un ID aléatoire
      const clientId = Math.floor(Math.random() * 1000000);

      // Ajouter l'ID et la catégorie du client aux données du formulaire
      const clientData = { ...formData, id: clientId, CatégorieClientId: 0 };

      const response = await axios.post(`${import.meta.env.VITE_API}clients.json`, clientData);
      // Effectuer des actions supplémentaires après l'envoi du formulaire si nécessaire
    } catch (error) {
      // Gérer les erreurs de requête en cas d'échec de l'envoi du formulaire
    }
  };

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
                required/>
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
                required/>
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
                required/>
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
