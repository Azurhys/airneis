import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({});

export function AuthContextProvider ({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setUserEmail(localStorage.getItem('userEmail'));
    }
  }, []);

  const login = (email) => {
    // simulating a successful login by setting a token in localStorage
    localStorage.setItem('token', '123456789');
    localStorage.setItem('userEmail', email);
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
