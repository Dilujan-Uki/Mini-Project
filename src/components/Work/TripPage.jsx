import React, { useState } from 'react';
import ItineraryCard from './Card';

const TripsPage = () => {
  const [trips, setTrips] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTrip, setNewTrip] = useState({
    title: '',
    location: '',
    startDate: '',
    endDate: '',
    budget: ''
  });

 
  const popularDestinations = [
    {
      name: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400&h=250&fit=crop',
      description: 'City of Lights & Romance'
    },
    {
      name: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h-250&fit=crop',
      description: 'Modern City & Ancient Culture'
    },
    {
      name: 'New York, USA',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h-250&fit=crop',
      description: 'The City That Never Sleeps'
    },
    {
      name: 'Dubai, UAE',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h-250&fit=crop',
      description: 'Desert Metropolis & Luxury'
    },
    {
      name: 'Sydney, Australia',
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h-250&fit=crop',
      description: 'Harbor City & Beaches'
    },
    {
      name: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h-250&fit=crop',
      description: 'Island Paradise & Temples'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrip({
      ...newTrip,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tripToAdd = {
      id: Date.now(),
      ...newTrip,
      image: popularDestinations.find(dest => dest.name === newTrip.location)?.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h-250&fit=crop'
    };
    setTrips([...trips, tripToAdd]);
    setNewTrip({ title: '', location: '', startDate: '', endDate: '', budget: '' });
    setShowForm(false);
  };

  const deleteTrip = (id) => {
    setTrips(trips.filter(trip => trip.id !== id));
  };

  const handleQuickAdd = (destination) => {
    const tripToAdd = {
      id: Date.now(),
      title: `My ${destination.name.split(',')[0]} Trip`,
      location: destination.name,
      startDate: '2024-07-01',
      endDate: '2024-07-07',
      budget: '1500',
      image: destination.image
    };
    setTrips([...trips, tripToAdd]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent mb-4">
            ✈️ My Travel Trips
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 max-w-3xl mx-auto mb-6 leading-relaxed">
            Plan, organize, and manage all your travel adventures in one place. Create detailed itineraries for your dream destinations.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full">
              <span className="text-slate-800 font-medium">🗺️ {trips.length} Trips Planned</span>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full">
              <span className="text-slate-800 font-medium">📅 {trips.reduce((acc, trip) => {
                const days = Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24));
                return acc + (days || 0);
              }, 0)} Total Days</span>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <div className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 transition-all duration-300 ${showForm ? 'border-2 border-blue-500' : 'border border-slate-200'}`}>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Create New Trip</h2>
                <p className="text-slate-600 text-lg">
                  Start planning your next adventure with our easy trip planner
                </p>
              </div>
              <button 
                onClick={() => setShowForm(!showForm)}
                className={`mt-4 md:mt-0 px-6 py-3 rounded-xl font-bold text-lg transition-all hover:scale-105 ${
                  showForm 
                    ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white hover:shadow-xl' 
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-xl'
                }`}
              >
                {showForm ? '✕ Cancel' : '+ Add New Trip'}
              </button>
            </div>

            {showForm && (
              <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-700 font-medium mb-2 text-lg">Trip Name</label>
                    <input
                      name="title"
                      placeholder="e.g., Summer Europe Adventure"
                      value={newTrip.title}
                      onChange={handleInputChange}
                      className="w-full p-4 text-lg bg-slate-50 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-2 text-lg">Destination</label>
                    <input
                      name="location"
                      placeholder="e.g., Paris, France"
                      value={newTrip.location}
                      onChange={handleInputChange}
                      className="w-full p-4 text-lg bg-slate-50 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-slate-700 font-medium mb-2 text-lg">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={newTrip.startDate}
                      onChange={handleInputChange}
                      className="w-full p-4 text-lg bg-slate-50 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-2 text-lg">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={newTrip.endDate}
                      onChange={handleInputChange}
                      className="w-full p-4 text-lg bg-slate-50 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-2 text-lg">Budget ($)</label>
                    <input
                      name="budget"
                      type="number"
                      placeholder="e.g., 1500"
                      value={newTrip.budget}
                      onChange={handleInputChange}
                      className="w-full p-4 text-lg bg-slate-50 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xl font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  🚀 Create Trip
                </button>
              </form>
            )}
          </div>

          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 flex items-center">
              <span className="mr-3">⚡</span> Quick Add Popular Destinations
            </h2>
            <p className="text-slate-700 text-lg mb-8 max-w-3xl leading-relaxed">
              Start planning instantly by choosing from our curated list of world-famous destinations. Click any card to add a sample itinerary.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularDestinations.map((destination, index) => (
                <div 
                  key={index}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  onClick={() => handleQuickAdd(destination)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={destination.image} 
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                      <p className="text-white/90 text-sm">{destination.description}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-center">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-medium">
                        Click to Add
                      </span>
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                        + Add Trip
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

       
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">My Travel Plans</h2>
              <p className="text-slate-600 text-lg">
                {trips.length === 0 
                  ? "You haven't planned any trips yet. Start by adding your first adventure!" 
                  : `You have ${trips.length} trip${trips.length === 1 ? '' : 's'} planned. Keep exploring!`}
              </p>
            </div>
            {trips.length > 0 && (
              <div className="mt-4 md:mt-0 px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold">
                {trips.length} Trip{trips.length === 1 ? '' : 's'}
              </div>
            )}
          </div>

          
          <div className="trips-list">
            {trips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trips.map(trip => (
                  <ItineraryCard
                    key={trip.id}
                    trip={trip}
                    onDelete={deleteTrip}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gradient-to-br from-white to-blue-50 rounded-3xl border-2 border-dashed border-slate-300">
                <div className="text-8xl mb-6">🌎</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">No trips planned yet</h3>
                <p className="text-slate-600 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                  Start your travel journey by creating your first trip plan. Use the form above or click on any popular destination to get started instantly.
                </p>
                <button 
                  onClick={() => setShowForm(true)}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xl font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  ✈️ Plan Your First Trip
                </button>
              </div>
            )}
          </div>
        </div>

       
        {trips.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-white to-slate-50 rounded-2xl p-8 shadow-lg border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
              <span className="mr-3">📊</span> Travel Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                <div className="text-3xl font-bold text-slate-800">{trips.length}</div>
                <p className="text-slate-600 text-lg">Total Trips</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl">
                <div className="text-3xl font-bold text-slate-800">
                  {new Set(trips.map(trip => trip.location.split(',')[0])).size}
                </div>
                <p className="text-slate-600 text-lg">Unique Destinations</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl">
                <div className="text-3xl font-bold text-slate-800">
                  ${trips.reduce((acc, trip) => acc + (parseInt(trip.budget) || 0), 0)}
                </div>
                <p className="text-slate-600 text-lg">Total Budget</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                <div className="text-3xl font-bold text-slate-800">
                  {trips.reduce((acc, trip) => {
                    const days = Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24));
                    return acc + (days > 0 ? days : 1);
                  }, 0)}
                </div>
                <p className="text-slate-600 text-lg">Travel Days</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripsPage;