// src/components/Work/TripPage.jsx
import React, { useState } from 'react';
import ItineraryCard from './Card';  // FIXED THIS LINE

const TripsPage = () => {
  const [trips, setTrips] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTrip, setNewTrip] = useState({
    title: '',
    location: '',
    startDate: '',
    endDate: '',
  });

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
      id: trips.length + 1,
      ...newTrip
    };
    setTrips([...trips, tripToAdd]);
    setNewTrip({ title: '', location: '', startDate: '', endDate: '' });
    setShowForm(false);
  };

  const deleteTrip = (id) => {
    setTrips(trips.filter(trip => trip.id !== id));
  };

  return (
    <div className="trips-page">
      <h2>My Travel Trips</h2>
      
      <button 
        className="add-trip-btn"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Cancel' : '+ Add New Trip'}
      </button>

      {showForm && (
        <form className="trip-form" onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Trip Name"
            value={newTrip.title}
            onChange={handleInputChange}
            required
          />
          <input
            name="location"
            placeholder="Destination"
            value={newTrip.location}
            onChange={handleInputChange}
            required
          />
          <input
            type="date"
            name="startDate"
            value={newTrip.startDate}
            onChange={handleInputChange}
            required
          />
          <input
            type="date"
            name="endDate"
            value={newTrip.endDate}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="submit-btn">Save Trip</button>
        </form>
      )}

      <div className="trips-list">
        {trips.length > 0 ? (
          trips.map(trip => (
            <ItineraryCard
              key={trip.id}
              trip={trip}
              onDelete={deleteTrip}
            />
          ))
        ) : (
          <p className="no-trips">No trips planned yet. Add your first one!</p>
        )}
      </div>
    </div>
  );
};

export default TripsPage;