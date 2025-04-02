import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleAuthHandler = () => {
  const navigate = useNavigate();
  const hasRedirected = useRef(false); // ✅ prevent double run

  useEffect(() => {
    if (hasRedirected.current || window.location.pathname !== '/auth/google') return;

    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    console.log('GoogleAuthHandler mounted 🚀');

    if (token) {
      console.log('Token from URL:', token);
      localStorage.setItem('userToken', token);
      hasRedirected.current = true; // ✅ lock further runs
      navigate('/homepage');
    } else {
      console.warn('No token found in URL!');
      hasRedirected.current = true;
      navigate('/login');
    }
  }, []);

  return <p style={{ color: 'white' }}>Redirecting from Google...</p>;
};

export default GoogleAuthHandler;
