import React, { createContext, useState, useEffect } from 'react';


export const AuthContext = createContext({});
export function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setUserName(localStorage.getItem('userName'));
    }
  }, []);

  const login = (firstName, categoryId) => {
    console.log(categoryId)
    localStorage.setItem('token', '123456789');
    localStorage.setItem('userName', firstName);
    localStorage.setItem('categoryID', categoryId)
    setIsAuthenticated(true);
    setUserName(firstName);
    setCategoryId(categoryId);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    setUserName(null);
    setCategoryId(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, login, logout, categoryId }}>
      {children}
    </AuthContext.Provider>
  );
}
