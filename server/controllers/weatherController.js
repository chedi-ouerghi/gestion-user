const axios = require('axios');

const getWeatherByCity = async (req, res) => {
  const { city } = req.params;

  try {
    const apiKey = '51dc6ba13cd003bf6a7e78fa33094048';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    res.status(200).json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Error fetching weather data' });
  }
};

module.exports = { getWeatherByCity };
