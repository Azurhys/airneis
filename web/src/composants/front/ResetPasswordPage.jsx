import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import useEmailValidation from '../../verif/useEmailExiste';
import getUserByEmailAddress from '../../verif/getUserByEmailAddress';

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const isEmailValid = useEmailValidation(formData.email);
  //const user_Id = getUserByEmailAddress(formData.email);

  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!isEmailValid.isEmailValid) {
        const user_Id = await getUserByEmailAddress(formData.email);
        // Générer le lien de réinitialisation de mot de passe avec le user_Id reçu de useEmailValidation
        const resetLink = `http://localhost:5173/UpdatePassword?user_id=${user_Id}`;
        console.log(resetLink)
        const templateParams = {
          to_email: formData.email,
          from_name: 'Votre nom ou nom de l\'expéditeur',
          resetLink: resetLink,
        };
        await emailjs.send('service_ri1kv3q', 'template_4scscqo', templateParams, 'rit4hqMIVPN1n8NeD');
        setMessage('Un e-mail de réinitialisation de mot de passe a été envoyé à votre adresse e-mail.');
      }
      else {
        setErrorMessage("L'adresse e-mail n'est pas enregistrée.");
        return;
      }

    } catch (error) {
      console.error('Erreur lors de la réinitialisation du mot de passe :', error);
      setMessage('Une erreur s\'est produite lors de la réinitialisation du mot de passe. Veuillez réessayer plus tard.');
    }
  };

  return (
    <>
      <div>
        <div className='my-3 text-center'>
          <h1>Réinitialiser le mot de passe</h1>
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
                  required
                />
              </label>
            </div>
            <br />
            <div className='mt-3 text-center'>
              <button style={{ maxWidth: '100%', maxHeight: '100%' }} type="submit">Réinitialiser le mot de passe</button>
            </div>
          </form>
        </div>
        {message && (
          <div id="message-container" className="text-center">
            {message}
          </div>
        )}
        {errorMessage && (
          <div id="error-message-container" className="text-center">
            {errorMessage}
          </div>
        )}
      </div>
    </>
  );  
};

export default ResetPasswordPage;
