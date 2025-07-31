import { createContext, useEffect, useState } from 'react';
import axios from "axios";
//import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  //const navigate = useNavigate();
    useEffect(() => {
    // This ensures user info is restored on app reload
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      //console.log("📤 Logging in with:", email, password);
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      } , {
      headers: {
      'Content-Type': 'application/json'
   },
  withCredentials: true
});

     const token = res.data.token;
     const user = res.data.user;

      // Update user status to online
      await axios.put(`http://localhost:5000/api/users/${user.id}/online`, null, {
        headers: { Authorization: `Bearer ${token}` }
      });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    setCurrentUser(res.data.user);
    alert("login successful! welcome to Daniel's socialMedia App 🔥");
    return true;

  } catch (err) {
    console.error("🔥 Login error:", err.response?.data || err.message);
    console.error(err);
    alert("Login failed. Please check your credentials.");
    return false;
  }
};

  const register = async (username, email, name, password) => {
    try {
      await axios.post("http://localhost:5000/api/auth/register",{
        username, 
        email, 
        name, 
        password
      });
      alert("Registration successful! Please login.");
      return true; // Return success status
      //navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed. Please try again.");
        return false; // Return failure status
    }
  };

  const logout = async () => {
    try {
     const storedUser = currentUser || JSON.parse(localStorage.getItem("user"));
     const token = localStorage.getItem("token");

       if ( storedUser && token) {
        await axios.put(`http://localhost:5000/api/users/${storedUser.id}/offline`,
           null, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      await axios.post("http://localhost:5000/api/auth/logout", null, {
        withCredentials: true,
      });
      setCurrentUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
         return true; 
      
    } catch (err) {
      console.error("Logout error:",err);
        return false; 
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};