import React  from 'react';
import { Container, Paper, Typography } from '@mui/material';
import Weather from '../components/Weather/Weather';

const WeatherPage = () => {


 

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Profile
        </Typography>
        <Weather />
        
      </Paper>

    </Container>
  );
};

export default WeatherPage;
