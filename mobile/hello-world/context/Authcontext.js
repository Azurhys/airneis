import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});
export function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);
  const [categorie_user_Id, setCategoryId] = useState(null);
  const [user_Id, setuser_Id] = useState(null);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let token;
      try {
        token = await AsyncStorage.getItem('token');
        const userName = await AsyncStorage.getItem('userName');
        const categoryID = await AsyncStorage.getItem('categoryID');
        const userID = await AsyncStorage.getItem('userID');
        if (token !== null) {
          setIsAuthenticated(true);
          setUserName(userName);
          setCategoryId(categoryID);
          setuser_Id(userID);
        }
      } catch (e) {
        // Restoring token failed
      }
    };
    bootstrapAsync();
  }, []);

  const login = async (firstName, categorie_user_Id, user_Id) => {
    try {
      await AsyncStorage.setItem('token', '123456789');
      await AsyncStorage.setItem('userName', firstName);
      await AsyncStorage.setItem('categoryID', categorie_user_Id.toString());
      await AsyncStorage.setItem('userID', user_Id.toString());
      setIsAuthenticated(true);
      setUserName(firstName);
      setCategoryId(categorie_user_Id);
      setuser_Id(user_Id);
  
      console.log('Connexion réussie');
      // Effectuer d'autres actions après la connexion réussie
    } catch (e) {
      console.log('Erreur lors de la connexion');
      // Gérer les erreurs lors de la connexion
    }
  };
  

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userName');
      await AsyncStorage.removeItem('categoryID');
      await AsyncStorage.removeItem('userID');
      setIsAuthenticated(false);
      setUserName(null);
      setCategoryId(null);
      setuser_Id(null);
    } catch (e) {
      // remove error
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, login, logout, categorie_user_Id, user_Id }}>
      {children}
    </AuthContext.Provider>
  );
}
