const express = require('express');
const weatherController = require('../controllers/weatherController');

const router = express.Router();

router.get('/weather/:city/:country?', async (req, res) => {
  try {
    const { city, country } = req.params;
    const weatherData = await weatherController.getWeatherByCity(req, res, city, country);
  } catch (error) {
    console.error('Error in /weather/:city/:country endpoint:', error.message);
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

router.get('/user/:userId/weather', weatherController.getWeatherByUser);


module.exports = router;
