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

    setTimeout(() => {
      const weatherConditions = [
        { temp: 25, condition: 'Sunny', humidity: 65, icon: '☀️' },
        { temp: 18, condition: 'Cloudy', humidity: 75, icon: '☁️' },
        { temp: 22, condition: 'Partly Cloudy', humidity: 70, icon: '⛅' },
        { temp: 15, condition: 'Rainy', humidity: 85, icon: '🌧️' },
        { temp: 28, condition: 'Clear', humidity: 60, icon: '☀️' }
      ];
      
      const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
      setWeather({
        ...randomWeather,
        temp: Math.floor(Math.random() * 20) + 15 
      });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="weather-widget bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Weather in {city}</h3>
      
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
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
              <p className="font-bold text-lg">{weather.temp + 2}°C</p>
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