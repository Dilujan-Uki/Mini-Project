
import React, { useState } from 'react';
import DestinationSearch from './Search';  
import WeatherWidget from './Weather';     

const HomePage = () => {
  const [selectedDestination, setSelectedDestination] = useState('');

  return (
    <div className="home-page">
      <div className="hero">
        <h2>Plan Your Perfect Trip</h2>
        <p>Search destinations and check weather before you travel</p>
      </div>

      <div className="search-area">
        <DestinationSearch onSelect={setSelectedDestination} />
      </div>

      <div className="weather-area">
        {selectedDestination && <WeatherWidget city={selectedDestination} />}
      </div>

      <div className="cta-area">
        <button 
          className="cta-button"
          onClick={() => window.location.href = '/trips'}
        >
          View My Trips →
        </button>
      </div>
    </div>
  );
};

export default HomePage;