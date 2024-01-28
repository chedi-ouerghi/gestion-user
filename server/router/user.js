const express = require('express');
const userController = require('../controllers/userController');
// const weatherController = require('../controllers/weatherController');

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.get('/user/:userId', userController.getUserById);
// router.get('/user/:userId/weather', weatherController.getWeatherByUser); 
router.post('/users', userController.createUser);
router.put('/user/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);

module.exports = router;
