import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useUpdatePassword from '../../hook/useUpdatePassword';

const UpdatePasswordPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user_Id = searchParams.get('user_id');

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const { isLoading, errorMessage, successMessage, updatePassword } = useUpdatePassword();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        setError("Les mots de passe ne correspondent pas.");
        return;
      }
      else {
        console.log(user_Id)
        await updatePassword(user_Id, formData.password);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du mot de passe :', error);
      setError('Une erreur s\'est produite lors de la mise à jour du mot de passe. Veuillez réessayer plus tard.');
    }
  };

  return (
    <>
      <div>
        <div className='my-3 text-center'>
          <h1>Mettre à jour le mot de passe</h1>
        </div>
        <br />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                <h6>Nouveau mot de passe:</h6>
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
            <div>
              <label>
                <h6>Confirmer le mot de passe:</h6>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <br />
            <div className='mt-3 text-center'>
              <button style={{ maxWidth: '100%', maxHeight: '100%' }} type="submit">Mettre à jour le mot de passe</button>
            </div>
          </form>
        </div>
        {errorMessage && (
          <div id="error-message-container" className="text-center">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div id="success-message-container" className="text-center">
            {successMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default UpdatePasswordPage;
