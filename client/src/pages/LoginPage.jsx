import React from 'react';
import { Container, Paper, Typography } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <LoginForm />
      </Paper>
    </Container>
  );
};

export default LoginPage;
