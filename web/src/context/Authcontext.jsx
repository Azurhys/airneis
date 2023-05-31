import React, { createContext, useState, useEffect } from 'react';
import useLoginValidation from '../verif/useLoginValidation';

export const AuthContext = createContext({});
export function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [user_Id, setuser_Id]=useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setUserName(localStorage.getItem('userName'));
    }
  }, []);

  const login = (firstName, categoryId, user_Id) => {
    localStorage.setItem('token', '123456789');
    localStorage.setItem('userName', firstName);
    localStorage.setItem('categoryID', categoryId);
    localStorage.setItem('userID', user_Id);
    setIsAuthenticated(true);
    setUserName(firstName);
    setCategoryId(categoryId);
    setuser_Id(user_Id);
    console.log(user_Id)
  };


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    setUserName(null);
    setCategoryId(null);
    setuser_Id(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, login, logout, categoryId, user_Id }}>
      {children}
    </AuthContext.Provider>
  );
}
