import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistration = async () => {
    try {
      const response = await axios.post('http://localhost:5625/auth/register', formData);

      if (response.status === 200) {
        navigate('/login');
      } else {
        console.error('Registration failed:', response.data.error);
      }
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <form>
      <Typography variant="h5" gutterBottom>
        Register
      </Typography>
      <TextField
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
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
      <Button variant="contained" color="primary" onClick={handleRegistration}>
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
