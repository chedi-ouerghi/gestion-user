// authenticateUser.js

const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  // Vérifiez si le jeton d'authentification est présent dans les en-têtes
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Vérifiez et décryptez le jeton
    const decodedToken = jwt.verify(authToken, 'app123acbdefijklmnopqrstuwxyz');

    // Ajoutez les informations du jeton décodé à l'objet de demande pour un accès ultérieur
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authenticateUser;
