import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './Components/AuthForm/AuthForm';
import { getCurrentUser, logoutUser} from './Components/context/AuthLayout';
import { ToastContainer } from 'react-toastify';
import UserProfile from './Components/Userprofile/UserProfile';
//import Navbar from './Components/Navbar/Navbar';


const App = () => {
  const [user, setUser] = useState(null); // Initialize as null
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  // Initialize user on mount
  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const handleAuthSuccess = () => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Redirect to profile after login */}
        <Route 
          path="/" 
          element={user ? <Navigate to={`/profile/${user.id}`} /> : <Navigate to="/login" />} 
        />
        
        {/* Auth routes */}
        <Route 
          path="/login" 
          element={user ? <Navigate to="/" /> : (
            <AuthForm isLogin={true} onAuthSuccess={handleAuthSuccess} />
          )} 
        />
        <Route 
          path="/register" 
          element={user ? <Navigate to="/" /> : (
            <AuthForm isLogin={false} onAuthSuccess={handleAuthSuccess} />
          )} 
        />
        
        {/* Profile route */}
        <Route 
          path="/profile/:userId" 
          element={user ? <UserProfile /> : <Navigate to="/login" />} 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;