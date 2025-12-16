import React, { useEffect, useState } from 'react';

const WeatherWidget = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (city) {
      fetchWeather();
    }
  }, [city]);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_OPENWEATHER_API_KEY&units=metric`
      );
      const data = await response.json();
      
      if (data.cod === 200) {
        setWeather({
          temp: Math.round(data.main.temp),
          condition: data.weather[0].main,
          humidity: data.main.humidity,
          icon: data.weather[0].icon
        });
      } else {
        console.error('Weather API error:', data.message);
        setWeather(null);
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-widget">
      <h3>Weather in {city}</h3>
      
      {loading ? (
        <p>Loading weather data...</p>
      ) : weather ? (
        <div className="weather-info">
          <p>Temperature: {weather.temp}°C</p>
          <p>Condition: {weather.condition}</p>
          <p>Humidity: {weather.humidity}%</p>
        </div>
      ) : (
        <div className="weather-placeholder">
          <p>No weather data available</p>
          <p className="api-note">[OpenWeather API integration area]</p>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;