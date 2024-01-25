const express = require('express');
const userController = require('../controllers/userController');
const weatherController = require('../controllers/weatherController');

const router = express.Router();

// Routes pour les utilisateurs
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// Nouvelle route pour obtenir la météo par ville
router.get('/weather/:city', weatherController.getWeatherByCity);

module.exports = router;




