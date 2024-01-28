const axios = require('axios');
const sql = require('mssql');
const dbConfig = require('../config/config');

const getWeatherByCity = async (req, res, city, country) => {
  try {
    console.log('Before axios request');
    const apiKey = '51dc6ba13cd003bf6a7e78fa33094048';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}${country ? ',' + country : ''}&appid=${apiKey}`;
       const response = await axios.get(apiUrl);
    console.log('After axios request');

    const weatherData = response.data;
    console.log('Weather data:', weatherData);
      res.status(200).json(weatherData);

    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    throw new Error('Error fetching weather data');
  }
};

const getWeatherByUser = async (req, res) => {
  try {
    const userId = req.params.userId;


    // Créer une instance du pool de connexion SQL Server
    const pool = await sql.connect(dbConfig);

    // Exécuter la vue pour obtenir les données météorologiques
    const result = await pool.request()
      .input('UserId', sql.Int, userId)
      .query('SELECT * FROM dbo.UserCityCountryView WHERE UserID = @UserId');

    // Vérifier si des données ont été trouvées
    if (result.recordset.length > 0) {
      // Les données météorologiques sont dans result.recordset

      const weatherData = result.recordset[0];

      res.status(200).json(weatherData);
    
    } else {
      res.status(404).json({ error: 'Weather data not found for the user' });
    }
  } catch (error) {
    console.error('Error fetching weather data by user:', error.message);
    res.status(500).json({ error: 'Error fetching weather data by user' });
  }
};

module.exports = { getWeatherByCity,getWeatherByUser };
