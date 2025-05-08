import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminMessages.css'; // optional styling

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/messages', {
          withCredentials: true
        });
        setMessages(response.data);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError("You must be an admin to view messages.");
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="admin-messages-page">
      <h2>Inbox Messages</h2>
      {error && <p className="error">{error}</p>}
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <div className="message-list">
          {messages.map(msg => (
            <div className="message-card" key={msg.id}>
              <h4>{msg.subject}</h4>
              <p><strong>From:</strong> {msg.name} ({msg.email})</p>
              {msg.phone_number && <p><strong>Phone:</strong> {msg.phone_number}</p>}
              <p><strong>Message:</strong><br />{msg.content}</p>
              <p className="timestamp"><em>Received: {new Date(msg.createdAt).toLocaleString()}</em></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
