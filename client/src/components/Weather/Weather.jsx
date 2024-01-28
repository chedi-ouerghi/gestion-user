import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './weather.css'; // Make sure to import your external stylesheet

const WeatherComponent = () => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [userData, setUserData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch weather data based on user ID from localStorage
    const storedUserId = localStorage.getItem('userId');

    if (storedUserId) {
      const userId = parseInt(storedUserId, 10);
      console.log('Fetching weather data for user with ID:', userId);
      fetchWeatherByUser(userId);
    }
  }, []); // Empty dependency array to ensure useEffect runs only once on component mount

  const fetchWeatherByUser = async (userId) => {
    try {
      console.log('Fetching weather data for user with ID:', userId);
      const response = await axios.get(`http://localhost:5625/weather/user/${userId}/weather`);
      console.log('Weather data response:', response.data);

      setUserData(response.data);
      setWeatherData(null); // Clear weather data when fetching user-specific data
    } catch (error) {
      console.error('Error fetching weather data by user:', error.message);
      setError('Error fetching weather data by user');
    }
  };

  const handleSearch = async () => {
    try {
      console.log('City:', city);
      console.log('Country:', country);

      const response = await axios.get(`http://localhost:5625/weather/weather/${city}/${country}`);
      console.log('After axios request in handleSearch');
      console.log('Weather data response:', response.data);

      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      setWeatherData(null);
      setError('Error fetching weather data');
    }
  };

  return (
    <div className="container">
      {userData && (
        <div className="user-info-box">
          <p>User Data:</p>
          <p>Country: {userData.Country}</p>
          <p>City: {userData.City}</p>
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="search-form">
        <label>
          City:
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
        <label>
          Country:
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
        </label>
        <button type="submit">Search</button>
      </form>

      {weatherData && (
        <div className="weather-info-box">
          <p>Weather Data:</p>
          <p>Temperature: {weatherData.main.temp}</p>
          <p>Description: {weatherData.weather[0].description}</p>
          {/* Add the following lines to display all properties of weatherData */}
          <p>All Weather Data: {JSON.stringify(weatherData, null, 2)}</p>
        </div>
      )}

      {error && <p className="error-message">Error: {error}</p>}
    </div>
  );
};

export default WeatherComponent;
