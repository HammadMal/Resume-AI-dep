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
    const loadUser = async () => {
      // First check: traditional login
      let localUser = authService.getCurrentUser();
  
      if (localUser) {
        setUser(localUser);
      } else {
        // If no user object but a token exists, check Google login
        const token = localStorage.getItem('userToken');
        if (token) {
          const googleUser = await authService.getGoogleUser();
          if (googleUser) {
            setUser(googleUser);
            // Optional: save full user for consistency
            localStorage.setItem('user', JSON.stringify(googleUser));
          }
        }
      }
  
      setLoading(false);
    };
  
    loadUser();
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