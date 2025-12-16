// src/components/DestinationSearch.jsx
import React, { useState } from 'react';

const DestinationSearch = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]); // ADD THIS LINE
  const [loading, setLoading] = useState(false); // Optional: for loading state

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 2) {
      setLoading(true);
      
      // TODO: Add Google Places API call here
      // Example:
      // const response = await fetch(
      //   `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&key=YOUR_KEY`
      // );
      // const data = await response.json();
      // setSuggestions(data.predictions || []);
      
      // Mock data for now - REMOVE THIS when adding real API
      const mockSuggestions = [
        { id: '1', name: 'Paris, France' },
        { id: '2', name: 'Tokyo, Japan' },
        { id: '3', name: 'New York, USA' },
        { id: '4', name: 'London, UK' },
        { id: '5', name: 'Sydney, Australia' }
      ].filter(item => 
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      
      setSuggestions(mockSuggestions);
      setLoading(false);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectDestination = (destinationName) => {
    setQuery(destinationName);
    onSelect(destinationName);
    setSuggestions([]);
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Where do you want to go?"
        value={query}
        onChange={handleSearch}
        className="search-input"
      />
      
      {loading && <p>Loading suggestions...</p>}
      
      {/* This will now work because suggestions is initialized as [] */}
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map(suggestion => (
            <div 
              key={suggestion.id} 
              className="suggestion-item"
              onClick={() => handleSelectDestination(suggestion.name)}
            >
              {suggestion.name}
            </div>
          ))}
        </div>
      )}
      
      <button 
        onClick={() => {
          if (query.trim()) {
            onSelect(query);
            setSuggestions([]);
          }
        }} 
        className="search-btn"
      >
        Search
      </button>
      
      <p className="api-note">[Google Places API integration area]</p>
    </div>
  );
};

export default DestinationSearch;