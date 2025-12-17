import React from 'react';
import { useNavigate } from 'react-router-dom';

const ItineraryCard = ({ trip, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{trip.title}</h3>
          <p className="text-black-600 mt-1">📍 {trip.location}</p>
        </div>
        <button 
          onClick={() => onDelete(trip.id)}
          className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
        >
          Remove
        </button>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-700">
          <span className="font-medium">📅 Dates:</span> {trip.startDate} to {trip.endDate}
        </p>
        {trip.budget && (
          <p className="text-gray-700 mt-2">
            <span className="font-medium">💰 Budget:</span> ${trip.budget}
          </p>
        )}
      </div>
      
      <div className="flex gap-2">
        <button 
          onClick={() => navigate(`/trip/${trip.id}`)}
          className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
        >
          View Details
        </button>
        <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
          Edit
        </button>
      </div>
    </div>
  );
};

export default ItineraryCard;