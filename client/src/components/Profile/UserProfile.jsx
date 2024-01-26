import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, Modal, Box, TextField } from '@mui/material';
import axios from 'axios';
// import { format } from 'date-fns';


const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    firstName: '',
      lastName: '',
     Email: '',
    country: '',
    city: '',
    dateOfBirth: '',
    gender: '',
  });
  const [editSuccessMessage, setEditSuccessMessage] = useState(null);
  const [editErrorMessage, setEditErrorMessage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
// const formattedDate = format(new Date(editFormData.dateOfBirth), 'yyyy-MM-dd');

  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:5625/user/user/${userId}`);
      console.log('Response:', response); // Log de la réponse
      if (response.status === 200) {
        setUserData(response.data);
      } else {
        console.error('Failed to fetch user data:', response.data.error);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error.message);
    } finally {
      setIsLoading(false); // Mettre isLoading à false une fois que la requête est terminée
    }
    };
      useEffect(() => {
    fetchUserData(); // Appeler fetchUserData directement lors du rendu initial
  }, []);

useEffect(() => {
  console.log('Inside useEffect');
  if (isModalOpen) {
    console.log('Inside isModalOpen condition'); // Ajout de ce log
    // Mettez à jour le formulaire avec les données utilisateur actuelles
    setEditFormData({
      firstName: userData?.FirstName || '',
        lastName: userData?.LastName || '',
        Email: userData?.Email || '',
      country: userData?.Country || '',
      city: userData?.City || '',
      dateOfBirth: userData?.DateOfBirth || '',
      gender: userData?.Gender || '',
    });
  }
}, [isModalOpen, userData]);


  const handleEdit = () => {
    setIsModalOpen(true);
    // Réinitialiser les messages de succès et d'erreur
    setEditSuccessMessage(null);
    setEditErrorMessage(null);

    // Si les données utilisateur ne sont pas encore chargées, les récupérer
    if (!userData) {
      fetchUserData();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Réinitialiser les messages de succès et d'erreur lors de la fermeture du modal
    setEditSuccessMessage(null);
    setEditErrorMessage(null);
  };

  const handleInputChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.put(`http://localhost:5625/user/user/${userId}`, editFormData);

      if (response.status === 200) {
        setEditSuccessMessage('Profile updated successfully');
        // Re-fetch user data after successful update
        fetchUserData();
      } else {
        setEditErrorMessage('Error updating profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error.message);
      setEditErrorMessage('Error updating profile');
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        {isLoading ? (
          <Typography variant="body1">Loading user data...</Typography>
        ) : (
          <>
            <Typography variant="h6">FirstName: {userData.FirstName}</Typography>
            <Typography variant="h6">LastName: {userData?.LastName}</Typography>
            <Typography variant="h6">Email: {userData?.Email}</Typography>
            <Typography variant="h6">Country: {userData?.Country}</Typography>
            <Typography variant="h6">City: {userData?.City}</Typography>
            <Typography variant="h6">Date de naissance: {userData?.DateOfBirth}</Typography>
            <Typography variant="h6">Genre: {userData?.Gender}</Typography>
          </>
        )}
      </Paper>
      <Button variant="contained" color="primary" onClick={handleEdit}>
        Edit Profile
      </Button>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Profile
          </Typography>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={editFormData.firstName}
            onChange={handleInputChange}
            sx={{ mb: 2 }}


          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={editFormData.lastName}
            onChange={handleInputChange}
                    sx={{ mb: 2 }}


                  />
                   <TextField
            fullWidth
            label="Email"
            name="Email"
            value={editFormData.Email}
            onChange={handleInputChange}
            sx={{ mb: 2 }}


          />
          <TextField
            fullWidth
            label="Country"
            name="country"
            value={editFormData.country}
            onChange={handleInputChange}
            sx={{ mb: 2 }}


          />
          <TextField
            fullWidth
            label="City"
            name="city"
            value={editFormData.city}
            onChange={handleInputChange}
            sx={{ mb: 2 }}


          />
          <TextField
            fullWidth
            label="Date of Birth"
            name="dateOfBirth"
            type="date" // Assuming dateOfBirth is a date field
            value={editFormData.dateOfBirth}
            onChange={handleInputChange}
            sx={{ mb: 2 }}


          />
          <TextField
            fullWidth
            label="Gender"
            name="gender"
            value={editFormData.gender}
            onChange={handleInputChange}
            sx={{ mb: 2 }}


          />
          <Button variant="contained" color="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
          {editSuccessMessage && <Typography color="success">{editSuccessMessage}</Typography>}
          {editErrorMessage && <Typography color="error">{editErrorMessage}</Typography>}
        </Box>
      </Modal>
    </div>
  );
};

export default UserProfile;
