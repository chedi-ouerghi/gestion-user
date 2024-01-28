// authRouter.js

const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Route pour l'inscription (Register)
router.post('/register', authController.register);

// Route pour la connexion (Login)
router.post('/login', authController.login);

// Route pour la déconnexion (Logout)
router.post('/logout', authController.logout);

module.exports = router;
