import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../context/AuthLayout.jsx';

const AuthForm = ({ isLogin, onAuthSuccess }) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    ...(!isLogin && { username: '', name: '' })
  });

  const validateForm = () => {
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setError('Please enter a valid email');
      return false;
    }

    if (!formData.password) {
      setError('Password is required');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    if (!isLogin && !formData.username) {
      setError('Username is required');
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      const result = isLogin 
        ? await loginUser(formData)
        : await registerUser(formData);

      if (result.success) {
        if (isLogin) {
          // Store user data and redirect on login
          localStorage.setItem('user', JSON.stringify(result.data));
          navigate('/');
        } else {
          // On successful registration, redirect to login
          navigate('/login', { 
            state: { 
              registeredEmail: formData.email,
              message: 'Registration successful! Please login' 
            } 
          });
        }
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const switchMode = () => {
    setFormData({
      email: '',
      password: '',
      ...(!isLogin && { username: '', name: '' })
    });
    setError('');
    navigate(isLogin ? '/register' : '/login');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{isLogin ? 'Login' : 'Register'}</h2>
      
      {error && <div style={styles.error}>{error}</div>}
      
      <form onSubmit={handleSubmit} style={styles.form}>
        {!isLogin && (
          <>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="text"
              name="name"
              placeholder="Full Name (optional)"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />
          </>
        )}
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />
        
        <button type="submit" style={styles.button}>
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <div style={styles.switchText}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button 
          onClick={switchMode}
          style={styles.switchButton}
        >
          {isLogin ? 'Register' : 'Login'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginTop: '50px'
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px'
  },
  button: {
    padding: '10px',
    backgroundColor: '#3f51b5',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px'
  },
  error: {
    color: 'red',
    marginBottom: '15px',
    textAlign: 'center'
  },
  switchText: {
    textAlign: 'center',
    marginTop: '20px'
  },
  switchButton: {
    background: 'none',
    border: 'none',
    color: '#3f51b5',
    textDecoration: 'underline',
    cursor: 'pointer',
    padding: '0',
    fontSize: 'inherit'
  }
};

export default AuthForm;