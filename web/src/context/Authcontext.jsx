import React, { createContext, useState, useEffect } from 'react';


export const AuthContext = createContext({});
export function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);
  const [categorie_user_Id, setCategoryId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setUserName(localStorage.getItem('userName'));
    }
  }, []);

  const login = (firstName, categorie_user_Id) => {
    console.log(categorie_user_Id)
    localStorage.setItem('token', '123456789');
    localStorage.setItem('userName', firstName);
    localStorage.setItem('categoryID', categorie_user_Id)
    setIsAuthenticated(true);
    setUserName(firstName);
    setCategoryId(categorie_user_Id);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    setUserName(null);
    setCategoryId(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, login, logout, categorie_user_Id }}>
      {children}
    </AuthContext.Provider>
  );
}
