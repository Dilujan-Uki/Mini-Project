import React, { useEffect, useState } from 'react';

const WeatherWidget = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; 
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

  useEffect(() => {
    if (city) {
      fetchWeather();
    }
  }, [city]);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      
      const response = await fetch(
        `${API_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
      );

      const data = await response.json();

      if (response.status !== 200) {
        throw new Error(data.message || 'Failed to fetch weather data');
      }

      setWeather({
        temp: Math.round(data.main.temp),
        feels_like: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        condition: data.weather[0].main,
        icon: getWeatherIcon(data.weather[0].main),
      });
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return '☀️';
      case 'clouds':
        return '☁️';
      case 'rain':
        return '🌧️';
      case 'drizzle':
        return '🌦️';
      case 'thunderstorm':
        return '⛈️';
      case 'snow':
        return '❄️';
      case 'mist':
      case 'fog':
        return '🌫️';
      default:
        return '⛅';
    }
  };

  return (
    <div className="weather-widget bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Weather in {city}</h3>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 p-6">{error}</div>
      ) : weather ? (
        <div className="weather-info">
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl mr-4">{weather.icon}</span>
            <div>
              <p className="text-3xl font-bold text-gray-800">{weather.temp}°C</p>
              <p className="text-gray-600">{weather.condition}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Humidity</p>
              <p className="font-bold text-lg">{weather.humidity}%</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Feels Like</p>
              <p className="font-bold text-lg">{weather.feels_like}°C</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="weather-placeholder text-center p-6">
          <p className="text-gray-500">Weather data will appear here</p>
          <p className="text-sm text-gray-400 mt-2">
            Add your OpenWeather API key to get real data
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;

