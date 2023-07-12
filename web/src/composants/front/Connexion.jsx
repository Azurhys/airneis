import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLoginValidation from '../../verif/useLoginValidation';
import { AuthContext } from '../../context/Authcontext';
import { cartContext } from '../../context/CartContext';

const ConnexionPage = () => {
  const navigate = useNavigate();
  const { checkoutInProgress }= useContext(cartContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const isLoginValid = useLoginValidation(formData.email, formData.password);
  const { isValid, firstName, categorie_user_Id, user_Id} = isLoginValid;
  const { isAuthenticated, login} = useContext(AuthContext);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValid) {
      setErrorMessage("L'adresse e-mail ou le mot de passe est incorrect.");
    } else {
      login(firstName, categorie_user_Id, user_Id);
    }
  };

  useEffect(() => {
    if (checkoutInProgress && isAuthenticated) {
        navigate('/livraison');
    } else if (!checkoutInProgress && isAuthenticated) {
        navigate('/');
    }
}, [checkoutInProgress, isAuthenticated, navigate]);

  return (
    <>
      <div>
        <div className='my-3 text-center'>
          <h1>Connexion</h1>
        </div>
        <br />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <form onSubmit={handleSubmit}>
            <div>
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
              <button style={{ maxWidth: '100%', maxHeight: '100%' }} type="submit">Se connecter</button>
            </div>
          </form>
        </div>
        {errorMessage && (
          <div id="message-container" className="error-message text-center">
            {errorMessage}
          </div>
        )}
        <div className='text-center'>
          <br />
          <h6>Pas de compte ? <Link to="/Inscription">Inscrivez-vous.</Link></h6>
        </div>
      </div>
    </>
  );
};

export default ConnexionPage;
