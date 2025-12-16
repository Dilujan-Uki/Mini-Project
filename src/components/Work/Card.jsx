const ItineraryCard = ({ trip, onDelete }) => {
  return (
    <div className="trip-card">
      <div className="card-top">
        <h3>{trip.title}</h3>
        <button 
          className="delete-btn"
          onClick={() => onDelete(trip.id)}
        >
          Remove
        </button>
      </div>
      <p><strong>📍 Location:</strong> {trip.location}</p>
      <p><strong>📅 Dates:</strong> {trip.startDate} to {trip.endDate}</p>
      <div className="card-actions">
        <button className="view-btn">View Details</button>
      </div>
    </div>
  );
};

export default ItineraryCard;