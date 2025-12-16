import React, { useState } from 'react';

const DestinationSearch = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]); 
  const [loading, setLoading] = useState(false); 

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 2) {
      setLoading(true);
      
     
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