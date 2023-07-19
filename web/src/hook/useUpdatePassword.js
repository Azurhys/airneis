import { useState } from 'react';
import axios from 'axios';

const useUpdatePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const updatePassword = async (user_ID, newPassword) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    const number_userID = parseInt(user_ID);
    console.log('User Id to update:', number_userID);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}clients.json`);
      const clients = response.data;

      let clientKey = null;
      for (const key in clients) {
          if (clients[key].user_Id === number_userID) {
            console.log(clients[key].user_Id)
            console.log("ICI")
            clientKey = key;
            break;
        }
      }
      console.log('Client Key:', clientKey);
      if (clientKey) {
        const updateResponse = await axios.patch(
          `${import.meta.env.VITE_API}clients/${clientKey}.json`,
          { password: newPassword }
        );

        if (updateResponse.data) {
          setSuccessMessage('Le mot de passe a été mis à jour avec succès.');
        } else {
          setError('Une erreur s\'est produite lors de la mise à jour du mot de passe. Veuillez réessayer plus tard.');
        }
      } else {
        setError('Le client avec l\'identifiant fourni n\'existe pas.');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du mot de passe :', error);
      setError('Une erreur s\'est produite lors de la mise à jour du mot de passe. Veuillez réessayer plus tard.');
    }

    setIsLoading(false);
  };

  return { isLoading, error, successMessage, updatePassword };
};

export default useUpdatePassword;
