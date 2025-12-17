import React, { useState } from 'react';

const DestinationSearch = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 2) {
      setLoading(true);
      
      const mockSuggestions = [
        { id: '1', name: 'Paris, France', lat: 48.8566, lng: 2.3522 },
        { id: '2', name: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503 },
        { id: '3', name: 'New York, USA', lat: 40.7128, lng: -74.0060 },
        { id: '4', name: 'London, UK', lat: 51.5074, lng: -0.1278 },
        { id: '5', name: 'Sydney, Australia', lat: -33.8688, lng: 151.2093 },
        { id: '6', name: 'Dubai, UAE', lat: 25.2048, lng: 55.2708 },
        { id: '7', name: 'Singapore', lat: 1.3521, lng: 103.8198 },
        { id: '8', name: 'Bangkok, Thailand', lat: 13.7563, lng: 100.5018 }
      ].filter(item => 
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      
      setTimeout(() => {
        setSuggestions(mockSuggestions);
        setLoading(false);
      }, 500);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectDestination = (destination) => {
    setQuery(destination.name);
    onSelect(destination.name);
    setSuggestions([]);
    setShowMap(true);
  };

  return (
    <div className="search-box bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Find Your Destination</h3>
      
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Where do you want to go? (e.g., Paris, Tokyo)"
          value={query}
          onChange={handleSearch}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
        />
        
        {loading && (
          <div className="absolute right-3 top-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
      
      {suggestions.length > 0 && (
        <div className="suggestions bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto mb-4">
          {suggestions.map(suggestion => (
            <div 
              key={suggestion.id} 
              className="suggestion-item p-3 border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors"
              onClick={() => handleSelectDestination(suggestion)}
            >
              <div className="flex items-center">
                <span className="mr-3">📍</span>
                <div>
                  <p className="font-medium text-gray-800">{suggestion.name}</p>
                  <p className="text-sm text-gray-500">
                    Coordinates: {suggestion.lat.toFixed(4)}, {suggestion.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <button 
        onClick={() => {
          if (query.trim()) {
            onSelect(query);
            setSuggestions([]);
            setShowMap(true);
          }
        }} 
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
      >
        Search Destination
      </button>
      
      {showMap && query && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
          <h4 className="font-bold text-gray-700 mb-3">Map Preview for {query}</h4>
          <div className="bg-gray-200 rounded-lg h-48 flex flex-col items-center justify-center">
            <p className="text-gray-600 mb-2">🗺️ Interactive Map</p>
            <p className="text-sm text-gray-500 mb-3">
              [Leaflet Map API would show location here]
            </p>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Open Full Map
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Map API: Use Leaflet.js with OpenStreetMap for free interactive maps
          </p>
        </div>
      )}
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Try: Paris, Tokyo, New York, London, Sydney
        </p>
      </div>
    </div>
  );
};

export default DestinationSearch;