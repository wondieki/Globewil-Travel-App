
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/AdminDashboard.css';
import { AuthContext } from '../../contexts/AuthContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [msgError, setMsgError] = useState('');

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/login');
    } else {
      fetchBookings();
      fetchMessages();
    }
  }, [currentUser, navigate]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.get('/bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError('Failed to load bookings.');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.get('/messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setMsgError('Failed to load messages.');
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {currentUser && (
        <div className="admin-profile">
          <h3>Admin Profile</h3>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>Role:</strong> {currentUser.role}</p>
        </div>
      )}

      <div className="booking-section">
        <h2>All Bookings</h2>
        {loading ? (
          <p>Loading bookings...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="bookings-list">
            {bookings.map((b) => (
              <div className="booking-card" key={b.id}>
                <p><strong>Name:</strong> {b.full_name}</p>
                <p><strong>Email:</strong> {b.email}</p>
                <p><strong>Type:</strong> {b.booking_type}</p>
                <p><strong>Country:</strong> {b.country}</p>
                <p><strong>Date:</strong> {b.date}</p>
                <p><strong>Time:</strong> {b.time}</p>
                <p><strong>Status:</strong> {b.status || 'Pending'}</p>
                <p><strong>Services:</strong> {b.services?.map(s => s.name).join(', ') || 'N/A'}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="messages-section">
        <h2>Inbox Messages</h2>
        {msgError ? (
          <p className="error">{msgError}</p>
        ) : messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          <div className="message-list">
            {messages.map((msg) => (
              <div className="message-card" key={msg.id}>
                <h4>{msg.subject}</h4>
                <p><strong>From:</strong> {msg.name} ({msg.email})</p>
                {msg.phone_number && <p><strong>Phone:</strong> {msg.phone_number}</p>}
                <p><strong>Message:</strong><br />{msg.content}</p>
                <p className="timestamp"><em>Received: {new Date(msg.created_at).toLocaleString()}</em></p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
