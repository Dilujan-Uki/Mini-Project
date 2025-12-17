import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});


function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const MapComponent = ({ city = "Paris", lat = 48.8566, lng = 2.3522 }) => {
  const [mapCenter, setMapCenter] = useState([lat, lng]);
  const [mapZoom, setMapZoom] = useState(13);
  
  const cityCoordinates = {
    'Paris': { coords: [48.8566, 2.3522], zoom: 13, emoji: '🗼' },
    'Tokyo': { coords: [35.6762, 139.6503], zoom: 13, emoji: '🗼' },
    'New York': { coords: [40.7128, -74.0060], zoom: 13, emoji: '🗽' },
    'London': { coords: [51.5074, -0.1278], zoom: 13, emoji: '🇬🇧' },
    'Dubai': { coords: [25.2048, 55.2708], zoom: 13, emoji: '🌇' },
    'Sydney': { coords: [-33.8688, 151.2093], zoom: 13, emoji: '🇦🇺' },
    'Singapore': { coords: [1.3521, 103.8198], zoom: 13, emoji: '🇸🇬' },
    'Bangkok': { coords: [13.7563, 100.5018], zoom: 13, emoji: '🇹🇭' },
    'Hawwai': { coords: [19.8968, -155.5828], zoom: 13, emoji: '🌺' },
    'World': { coords: [20, 0], zoom: 2, emoji: '🌍' },
  };

  const handleCityClick = (cityName) => {
    const cityData = cityCoordinates[cityName];
    if (cityData) {
      setMapCenter(cityData.coords);
      setMapZoom(cityData.zoom);
    }
  };

  
  useEffect(() => {
    const cityData = cityCoordinates[city] || cityCoordinates['Paris'];
    setMapCenter(cityData.coords);
    setMapZoom(cityData.zoom);
  }, [city]);

  return (
    <div className="map-container">
      <div className="w-full h-96 rounded-xl overflow-hidden border-2 border-white/30 shadow-2xl">
        <MapContainer 
          center={mapCenter} 
          zoom={mapZoom}
          style={{ height: '100%', width: '100%', borderRadius: '12px' }}
          scrollWheelZoom={true}
        >
          <ChangeView center={mapCenter} zoom={mapZoom} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={mapCenter}>
            <Popup>
              <div className="text-center p-2">
                <strong className="text-lg text-black-600">📍 {city}</strong><br />
                <p className="text-sm text-black-600 mt-1">Coordinates:</p>
                <p className="text-sm">{mapCenter[0].toFixed(4)}, {mapCenter[1].toFixed(4)}</p>
                <div className="mt-2 p-2 bg-gray-100 rounded">
                  <p className="text-xs text-gray-600">Drag map to explore • Scroll to zoom</p>
                </div>
              </div>
            </Popup>
          </Marker>
          <Circle
            center={mapCenter}
            pathOptions={{ color: '#667eea', fillColor: '#667eea' }}
            radius={500}
            fillOpacity={0.3}
          />
        </MapContainer>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {Object.entries(cityCoordinates).map(([cityName, data]) => (
          <button
            key={cityName}
            onClick={() => handleCityClick(cityName)}
            className={`px-4 py-2 rounded-full text-sm hover:shadow-lg transition-all duration-300 backdrop-blur-sm ${
              city === cityName 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                : 'bg-gradient-to-r from-purple-500/50 to-pink-500/50 hover:from-purple-500 hover:to-pink-500 text-white/90 hover:text-white'
            }`}
          >
            {data.emoji} {cityName}
          </button>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
          <span className="text-black text-sm"> {city}</span>
          <span className="text-black/70">•</span>
          <span className="text-black text-sm">Zoom: {mapZoom}x</span>
          <span className="text-black/70">•</span>
          <span className="text-black text-sm">Lat: {mapCenter[0].toFixed(2)}</span>
          <span className="text-black/70">•</span>
          <span className="text-black text-sm">Lng: {mapCenter[1].toFixed(2)}</span>
        </div>
        <p className="text-white/70 text-xs mt-3">
          Interactive map with real-time navigation • Powered by Leaflet
        </p>
      </div>
    </div>
  );
};

export default MapComponent;