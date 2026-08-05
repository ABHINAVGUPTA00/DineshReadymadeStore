import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, setCurrentUser as dbSetUser, logoutUser as dbLogout } from '../services/database';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const login = (user) => {
    dbSetUser(user);
    setCurrentUser(user);
  };

  const logout = () => {
    dbLogout();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
