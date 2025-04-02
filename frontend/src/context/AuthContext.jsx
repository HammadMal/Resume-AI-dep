import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on initial load
    const user = authService.getCurrentUser();
    
    if (user) {
      setUser(user);
    }
    
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    const response = await authService.login({
      email,
      password,
    });
    
    setUser(response);
    return response;
  };

  // Register function
  const register = async (name, email, password) => {
    const response = await authService.register({
      name,
      email,
      password,
    });
    
    setUser(response);
    return response;
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;