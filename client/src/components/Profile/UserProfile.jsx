import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, Modal, Box, TextField } from '@mui/material';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
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

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const storedUserId = localStorage.getItem('userId');

      if (token && storedUserId) {
        const userId = parseInt(storedUserId, 10);

        if (!isNaN(userId)) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const response = await axios.get(`http://localhost:5625/user/user/${userId}`, config);
          setUser(response.data);
        } else {
          setError('Invalid user ID');
        }
      } else {
        setError('User ID or token not found in local storage');
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error.message);
      setError('Failed to fetch user data');
    }
  };

  useEffect(() => {
    fetchUserData(); // Chargement initial des données utilisateur
  }, []);

const handleEdit = () => {
    setIsModalOpen(true);
    setEditSuccessMessage(null);
    setEditErrorMessage(null);

    // Initialiser le formulaire avec les données utilisateur actuelles
    setEditFormData({
      firstName: user?.FirstName || '',
      lastName: user?.LastName || '',
      Email: user?.Email || '',
      country: user?.Country || '',
      city: user?.City || '',
      dateOfBirth: user?.DateOfBirth || '',
      gender: user?.Gender || '',
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
    if (!editFormData.firstName || !editFormData.lastName || !editFormData.Email || !editFormData.country || !editFormData.city || !editFormData.dateOfBirth || !editFormData.gender) {
      setEditErrorMessage('Please fill in all fields');
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.put(`http://localhost:5625/user/user/${userId}`, editFormData);

      if (response.data && response.data.message) {
        setEditSuccessMessage(response.data.message);
        // Mise à jour du state local avec les nouvelles données utilisateur
        setUser(response.data.user);
        // Fermer le modal après la mise à jour réussie
        handleCloseModal();
      } else {
        setEditErrorMessage('Error updating profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error.message);
      setEditErrorMessage('Error updating profile');
    }
  };
  
  if (!user) {
    return <Typography variant="body1">Loading user data...</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <>
    <Typography variant="h6">FirstName: {user?.FirstName}</Typography>
          <Typography variant="h6">LastName: {user?.LastName}</Typography>
          <Typography variant="h6">Email: {user?.Email}</Typography>
          <Typography variant="h6">Country: {user?.Country}</Typography>
          <Typography variant="h6">City: {user?.City}</Typography>
          <Typography variant="h6">Date de naissance: {user?.DateOfBirth}</Typography>
          <Typography variant="h6">Genre: {user?.Gender}</Typography>
        </>
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
            type="date"
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
