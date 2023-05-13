import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({});

export function AuthContextProvider ({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setUserName(localStorage.getItem('userName'));
    }
  }, []);

  const login = (firstName) => {
    // simulating a successful login by setting a token in localStorage
    localStorage.setItem('token', '123456789');
    localStorage.setItem('userName', firstName);
    setIsAuthenticated(true);
    setUserName(firstName);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    setUserName(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
