import React from 'react';
import { Container, Paper, Typography } from '@mui/material';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        <RegisterForm />
      </Paper>
    </Container>
  );
};

export default RegisterPage;
