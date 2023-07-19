import axios from 'axios';

const getUserByEmailAddress = async (email) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API}clients.json`);
    const clients = response.data;
    const existingClient = Object.values(clients).find((client) => client.email === email);
    if (existingClient) {
        console.log(existingClient.user_Id)
      return existingClient.user_Id;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getUserByEmailAddress;
