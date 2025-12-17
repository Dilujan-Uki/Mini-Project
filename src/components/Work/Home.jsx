import React, { useState } from 'react';
import DestinationSearch from './Search';  
import WeatherWidget from './Weather';     

const HomePage = () => {
  const [selectedDestination, setSelectedDestination] = useState('Paris');

  const popularDestinations = [
    { name: 'Paris', color: 'from-blue-500 to-indigo-600' },
    { name: 'Tokyo', color: 'from-cyan-500 to-blue-600' },
    { name: 'New York', color: 'from-emerald-500 to-teal-600' },
    { name: 'London', color: 'from-amber-500 to-orange-600' },
    { name: 'Dubai', color: 'from-yellow-500 to-amber-600' },
    { name: 'Sydney', color: 'from-violet-500 to-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
     
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
       
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent">JourneyCraft</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 max-w-3xl mx-auto mb-8">
            Design your dream vacation with real-time weather and smart planning tools
          </p>
          <div className="flex justify-center space-x-4">
            <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200">
              <span className="text-slate-700">Live Weather</span>
            </div>
            <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200">
              <span className="text-slate-700">Smart Planning</span>
            </div>
            <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200">
              <span className="text-slate-700">Trip Management</span>
            </div>
          </div>
        </div>

       
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
         
          <div className="space-y-8">
            
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                Discover Destinations
              </h2>
              <DestinationSearch onSelect={setSelectedDestination} />
              
            
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Popular Destinations</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {popularDestinations.map((dest) => (
                    <button
                      key={dest.name}
                      onClick={() => setSelectedDestination(dest.name)}
                      className={`bg-gradient-to-r ${dest.color} text-white p-4 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                    >
                      <div className="flex flex-col items-center">
                        <span className="font-medium text-lg">{dest.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

           
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                  Weather Forecast
                </h2>
                <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                  {selectedDestination || "Select City"}
                </div>
              </div>
              {selectedDestination ? (
                <WeatherWidget city={selectedDestination} />
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4 text-slate-300">🌎</div>
                  <p className="text-slate-500">Select a destination to view weather</p>
                </div>
              )}
            </div>
          </div>

          
          <div className="space-y-8">
           
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                Travel Insights
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-slate-200">
                  <p className="text-sm text-slate-600">Best Time to Visit</p>
                  <p className="text-2xl font-bold text-slate-800 mt-2">Spring</p>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-xl border border-slate-200">
                  <p className="text-sm text-slate-600">Avg. Temperature</p>
                  <p className="text-2xl font-bold text-slate-800 mt-2">22°C</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border border-slate-200">
                  <p className="text-sm text-slate-600">Travel Costs</p>
                  <p className="text-2xl font-bold text-slate-800 mt-2">$$$</p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-xl border border-slate-200">
                  <p className="text-sm text-slate-600">Tourist Rating</p>
                  <p className="text-2xl font-bold text-slate-800 mt-2">4.8★</p>
                </div>
              </div>
            </div>

           
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
              <div className="text-center">
                <div className="text-4xl mb-4 text-slate-300">🗺️</div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Interactive Maps Available</h3>
                <p className="text-slate-600 mb-6">
                  View detailed interactive maps for each destination in the trip details section
                </p>
                <button 
                  onClick={() => window.location.href = '/trip/1'}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-xl hover:shadow-lg transition-all hover:scale-105"
                >
                  View Sample Trip Map
                </button>
              </div>
            </div>
          </div>
        </div>

        
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-white">Ready to Plan Your Adventure?</h3>
              <p className="text-white/90 mt-2">Create detailed itineraries with our smart planning tools</p>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => window.location.href = '/trips'}
                className="px-8 py-3 bg-white text-blue-700 font-bold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Start Planning
              </button>
              <button 
                onClick={() => window.location.href = '/trips'}
                className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/30 hover:shadow-xl transition-all duration-300"
              >
                View My Trips
              </button>
            </div>
          </div>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="text-2xl mb-4 text-blue-500">☀️</div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">Live Weather</h4>
            <p className="text-slate-600">Real-time weather updates for any destination</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="text-2xl mb-4 text-emerald-500">📅</div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">Smart Planning</h4>
            <p className="text-slate-600">Create and manage your travel itineraries</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="text-2xl mb-4 text-purple-500">📍</div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">Destination Search</h4>
            <p className="text-slate-600">Find and explore your next travel destination</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;