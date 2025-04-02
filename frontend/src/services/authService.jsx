import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/';

// Register user
const register = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('userToken', response.data.token); // store token
    }

    return response.data;
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();

    throw new Error(message);
  }
};

// Login user
const login = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'login', userData);

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('userToken', response.data.token); // store token
    }

    return response.data;
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();

    throw new Error(message);
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('userToken');
};

// Get current user from localStorage
const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// ✅ Get user info from token (Google login or otherwise)
const getGoogleUser = async () => {
  const token = localStorage.getItem('userToken');
  if (!token) return null;

  try {
    const res = await axios.get(API_URL + 'me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    logout(); // clear invalid token
    return null;
  }
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  getGoogleUser, // ✅ added for Google login
};

export default authService;
