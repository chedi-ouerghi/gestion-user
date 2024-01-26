import React  from 'react';
import UserProfile from '../components/Profile/UserProfile';
import { Container, Paper, Typography } from '@mui/material';

const ProfilePage = () => {


 

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Profile
        </Typography>
        <UserProfile />
        
      </Paper>

    </Container>
  );
};

export default ProfilePage;
