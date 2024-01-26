import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:5625/auth/login', formData);

    if (response.status === 200) {
      // Storing userId in localStorage
      localStorage.setItem('userId', response.data.user.UserID); // Utilisation de la bonne clé
      // ou localStorage.setItem('userId', response.data.user.userId); selon la structure de votre objet utilisateur

      // Login successful, navigate to profile page
      navigate('/profile');
    } else {
      console.error('Login failed:', response.data.error);
      // Handle login failure, display error message or take appropriate action
    }
  } catch (error) {
    console.error('Login failed:', error.message);
    // Handle login failure, display error message or take appropriate action
  }
};


  return (
    <form>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
