import { createContext, useContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

export function UserProvider({ children }) {
  // Get user profile
  const getUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    } catch (err) {
      throw err.response.data;
    }
  };

  // Update profile
  const updateUser = async (userData) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('http://localhost:5000/api/users', userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    } catch (err) {
      throw err.response.data;
    }
  };

  // Follow user
  const followUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/follow/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      throw err.response.data;
    }
  };

  // Unfollow user
  const unfollowUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/follow/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      throw err.response.data;
    }
  };

  return (
    <UserContext.Provider value={{ getUser, updateUser, followUser, unfollowUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  return useContext(UserContext);
}