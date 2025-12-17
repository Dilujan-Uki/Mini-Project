
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MapComponent from './Map.jsx';

const TripDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState({
        id: id || '1',
        title: 'Paris Adventure',
        location: 'Paris, France',
        startDate: '2024-06-01',
        endDate: '2024-06-07',
        budget: 1500,
        description: 'A wonderful trip to the city of lights! Experience French culture, cuisine, and landmarks.',
        activities: [
            { id: 1, name: 'Eiffel Tower Visit', date: '2024-06-02', time: '10:00', completed: true },
            { id: 2, name: 'Louvre Museum', date: '2024-06-03', time: '14:00', completed: false },
            { id: 3, name: 'Seine River Cruise', date: '2024-06-04', time: '19:00', completed: false },
            { id: 4, name: 'Notre Dame Cathedral', date: '2024-06-05', time: '11:00', completed: false }
        ]
    });

    const [newActivity, setNewActivity] = useState({ name: '', date: '', time: '' });

    const handleAddActivity = (e) => {
        e.preventDefault();
        if (newActivity.name.trim()) {
            const activityToAdd = {
                id: trip.activities.length + 1,
                ...newActivity,
                completed: false
            };
            setTrip({
                ...trip,
                activities: [...trip.activities, activityToAdd]
            });
            setNewActivity({ name: '', date: '', time: '' });
        }
    };

    const toggleActivity = (activityId) => {
        setTrip({
            ...trip,
            activities: trip.activities.map(activity =>
                activity.id === activityId
                    ? { ...activity, completed: !activity.completed }
                    : activity
            )
        });
    };

    const gradients = {
        primary: 'from-blue-500 to-indigo-600',
        secondary: 'from-purple-500 to-violet-600',
        success: 'from-emerald-500 to-teal-600',
        info: 'from-cyan-500 to-blue-600',
        warning: 'from-amber-500 to-orange-600'
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/trips')}
                    className={`mb-6 px-5 py-3 bg-gradient-to-r ${gradients.secondary} text-white rounded-xl hover:shadow-xl transition-all flex items-center hover:scale-105`}
                >
                    <span className="mr-2">←</span> Back to Trips
                </button>

                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 mb-8 border border-slate-200">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start mb-10">
                        <div className="mb-6 md:mb-0">
                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                {trip.title}
                            </h1>
                            <div className="flex items-center mt-4 space-x-4">
                                <div className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200">
                                    <span className="font-semibold text-slate-800">{trip.location}</span>
                                </div>
                                <div className={`px-5 py-2 bg-gradient-to-r ${gradients.info} text-white rounded-full font-bold shadow-lg`}>
                                    ${trip.budget} Budget
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <button className={`px-5 py-3 bg-gradient-to-r ${gradients.primary} text-white rounded-xl hover:shadow-xl transition-all hover:scale-105`}>
                                Edit Trip
                            </button>
                            <button className={`px-5 py-3 bg-gradient-to-r ${gradients.success} text-white rounded-xl hover:shadow-xl transition-all hover:scale-105`}>
                                Share
                            </button>
                        </div>
                    </div>

                    {/* Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        <div className={`bg-gradient-to-br ${gradients.primary} p-6 rounded-2xl shadow-lg`}>
                            <h3 className="text-xl font-bold text-white mb-4">Trip Dates</h3>
                            <div className="flex items-center">
                                <div className="bg-white/20 p-4 rounded-xl">
                                    <p className="text-3xl font-bold text-white">
                                        {trip.startDate} - {trip.endDate}
                                    </p>
                                    <p className="text-white/90 mt-2">7 Days, 6 Nights</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className={`bg-gradient-to-br ${gradients.secondary} p-6 rounded-2xl shadow-lg`}>
                            <h3 className="text-xl font-bold text-white mb-4">Description</h3>
                            <p className="text-white/95 text-lg leading-relaxed">{trip.description}</p>
                        </div>
                    </div>

                    {/* Activities Section */}
                    <div className="mb-10">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                Trip Activities
                            </h2>
                            <div className={`px-5 py-2 bg-gradient-to-r ${gradients.warning} text-white rounded-full font-bold shadow-lg`}>
                                {trip.activities.length} Activities
                            </div>
                        </div>

                        {/* Add Activity Form */}
                        <form onSubmit={handleAddActivity} className="mb-8 bg-gradient-to-r from-slate-50 to-blue-50 p-6 rounded-2xl shadow-lg border border-slate-200">
                            <h3 className="text-2xl font-bold text-slate-800 mb-6">Add New Activity</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                <input
                                    type="text"
                                    placeholder="Activity name"
                                    value={newActivity.name}
                                    onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
                                    className="p-4 bg-white border-2 border-slate-300 rounded-xl text-slate-800 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    required
                                />
                                <input
                                    type="date"
                                    value={newActivity.date}
                                    onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
                                    className="p-4 bg-white border-2 border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                />
                                <input
                                    type="time"
                                    value={newActivity.time}
                                    onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                                    className="p-4 bg-white border-2 border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                />
                                <button 
                                    type="submit" 
                                    className={`p-4 bg-gradient-to-r ${gradients.success} text-white rounded-xl font-bold hover:shadow-xl transition-all hover:scale-105`}
                                >
                                    Add Activity
                                </button>
                            </div>
                        </form>

                        {/* Activities List */}
                        <div className="space-y-4">
                            {trip.activities.map(activity => (
                                <div
                                    key={activity.id}
                                    className={`p-6 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02] ${
                                        activity.completed 
                                            ? 'bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-500' 
                                            : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className={`relative mr-4 ${activity.completed ? 'text-emerald-500' : 'text-blue-500'}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={activity.completed}
                                                    onChange={() => toggleActivity(activity.id)}
                                                    className="h-7 w-7 rounded-xl border-3 border-slate-300 bg-white checked:bg-emerald-500 checked:border-emerald-500 cursor-pointer"
                                                />
                                                {activity.completed && (
                                                    <span className="absolute inset-0 flex items-center justify-center text-white text-sm">
                                                        ✓
                                                    </span>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className={`text-xl font-bold ${activity.completed ? 'text-emerald-700 line-through' : 'text-slate-800'}`}>
                                                    {activity.name}
                                                </h4>
                                                <div className="flex items-center mt-2 space-x-4">
                                                    <span className="flex items-center text-slate-600">
                                                        {activity.date}
                                                    </span>
                                                    <span className="text-slate-400">•</span>
                                                    <span className="flex items-center text-slate-600">
                                                        {activity.time}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className={`px-5 py-2 rounded-full text-sm font-bold ${
                                            activity.completed 
                                                ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white' 
                                                : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                                        }`}>
                                            {activity.completed ? 'Completed' : 'Pending'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="mt-12">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                    Interactive Map
                                </h2>
                                <p className="text-slate-600 mt-2">Explore {trip.location} on our interactive map</p>
                            </div>
                            <button className={`px-5 py-3 bg-gradient-to-r ${gradients.info} text-white rounded-xl hover:shadow-xl transition-all hover:scale-105 flex items-center`}>
                                Full Screen
                            </button>
                        </div>
                        
                        <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-6 shadow-2xl border border-slate-200">
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">{trip.location}</h3>
                                <p className="text-slate-600">Drag to navigate, scroll to zoom, click markers for details</p>
                            </div>
                            <div className="map-container">
                                <MapComponent city={trip.location} />
                            </div>
                            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-xl">
                                    <p className="text-sm text-slate-600">Map Type</p>
                                    <p className="font-bold text-slate-800">OpenStreetMap</p>
                                </div>
                                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
                                    <p className="text-sm text-slate-600">Zoom Level</p>
                                    <p className="font-bold text-slate-800">Interactive</p>
                                </div>
                                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl">
                                    <p className="text-sm text-slate-600">Features</p>
                                    <p className="font-bold text-slate-800">Markers + Circles</p>
                                </div>
                                <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-4 rounded-xl">
                                    <p className="text-sm text-slate-600">Provider</p>
                                    <p className="font-bold text-slate-800">Leaflet.js</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-white to-slate-50 p-6 rounded-2xl shadow-lg border border-slate-200">
                        <div className="text-3xl font-bold text-slate-800">7</div>
                        <p className="text-slate-600">Days Total</p>
                    </div>
                    <div className="bg-gradient-to-r from-white to-slate-50 p-6 rounded-2xl shadow-lg border border-slate-200">
                        <div className="text-3xl font-bold text-slate-800">{trip.activities.length}</div>
                        <p className="text-slate-600">Activities</p>
                    </div>
                    <div className="bg-gradient-to-r from-white to-slate-50 p-6 rounded-2xl shadow-lg border border-slate-200">
                        <div className="text-3xl font-bold text-slate-800">${trip.budget}</div>
                        <p className="text-slate-600">Total Budget</p>
                    </div>
                    <div className="bg-gradient-to-r from-white to-slate-50 p-6 rounded-2xl shadow-lg border border-slate-200">
                        <div className="text-3xl font-bold text-slate-800">4.8</div>
                        <p className="text-slate-600">Rating</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripDetails;