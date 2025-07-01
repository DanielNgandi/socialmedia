import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';


const CLIENT_URL = 'http://localhost:5000/api/auth';
axios.defaults.withCredentials = true;

// Add request interceptor to include token
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${CLIENT_URL}/register`, userData);
    if (response.data.token) {
     // localStorage.setItem('user', JSON.stringify(response.data));
      toast.success('Registration successful!');
    }
    return { success: true, data: response.data };
    
  } 
  catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    return { 
      success: false, 
      error: error.response?.data?.error || 
             error.response?.data?.message || 
             error.message || 
             'Registration failed' 
    };
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${CLIENT_URL}/login`, userData);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token); // Make sure this is set
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`; // Set default header
    toast.success('login successful!');
          
      return response.data.user;
    }
    throw new Error('No token received');
  } catch (error) {
    toast.error(error.response?.data?.error || 'Login failed');
    throw error;
  }
};


export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  delete axios.defaults.headers.common['Authorization'];
  return axios.post(`${CLIENT_URL}/logout`);
};
export const getCurrentUser = () => {
  const userJson = localStorage.getItem('user');
  return userJson ? JSON.parse(userJson) : null;
};