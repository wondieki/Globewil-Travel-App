import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import '../../styles/UserDashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'user') {
      navigate('/login');
    } else {
      fetchBookings();
    }
  }, [currentUser, navigate]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('/bookings', {
        withCredentials: true,
      });
      setBookings(res.data);
    } catch (err) {
      console.error("❌ Error fetching bookings:", err);
      setError('Failed to load bookings.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>

      {currentUser && (
        <div className="user-profile">
          <h3>My Profile</h3>
          <p><strong>Name:</strong> {currentUser.name}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>Role:</strong> {currentUser.role}</p>
        </div>
      )}

      <div className="user-bookings">
        <h2>My Bookings</h2>
        {loading ? (
          <p>Loading bookings...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : bookings.length === 0 ? (
          <p>You have no bookings yet.</p>
        ) : (
          <div className="bookings-list">
            {bookings.map((b) => (
              <div className="booking-card" key={b.id}>
                <p><strong>Type:</strong> {b.type}</p>
                <p><strong>Country:</strong> {b.country}</p>
                <p><strong>Date:</strong> {b.date}</p>
                <p><strong>Time:</strong> {b.time}</p>
                <p><strong>Referral:</strong> {b.referral}</p>
                <p><strong>Services:</strong> {b.services.map(s => s.name).join(', ') || 'N/A'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
