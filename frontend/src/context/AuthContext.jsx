import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Register new user
  const register = async (userData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', userData);
      if (!res?.data?.token) throw new Error('No token received');
      
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user ?? null);
      navigate('/');
      return res.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
      throw new Error(errorMessage);
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      if (!res?.data?.token) throw new Error('No token received');
      
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user ?? null);
      navigate('/');
      return res.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      throw new Error(errorMessage);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  // Get current user
  const getMe = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;
      
      const res = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res?.data ?? null;
    } catch (err) {
      localStorage.removeItem('token');
      return null;
    }
  };

  // Check auth state on load
  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await getMe();
        setUser(userData);
      } catch (err) {
        console.error("Auth load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}