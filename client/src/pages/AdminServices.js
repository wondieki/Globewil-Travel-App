import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminServices.css';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const axiosConfig = { withCredentials: true }; // ✅ Required for cookie-based JWT auth

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get('/services'); // ✅ Relative URL, proxy handles base
      setServices(res.data);
    } catch (err) {
      console.error('Fetch services error:', err);
      setError('Failed to load services');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/services/${editingId}`, formData, axiosConfig);
      } else {
        await axios.post('/services', formData, axiosConfig);
      }
      setFormData({ name: '', description: '' });
      setEditingId(null);
      fetchServices();
    } catch (err) {
      console.error('Save error:', err);
      setError(err?.response?.data?.error || 'Error saving service');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await axios.delete(`/services/${id}`, axiosConfig);
      fetchServices();
    } catch (err) {
      console.error('Delete error:', err);
      setError(err?.response?.data?.error || 'Error deleting service');
    }
  };

  const handleEdit = (service) => {
    setFormData({ name: service.name, description: service.description });
    setEditingId(service.id);
  };

  return (
    <div className="admin-services">
      <h2>Admin Services</h2>

      {error && <p className="error" style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} className="service-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Service Name"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Service Description"
        />
        <button type="submit">{editingId ? 'Update' : 'Add'} Service</button>
      </form>

      <ul className="service-list">
        {services.map((s) => (
          <li key={s.id}>
            <strong>{s.name}</strong> — {s.description}
            <br />
            <button onClick={() => handleEdit(s)}>Edit</button>
            <button onClick={() => handleDelete(s.id)} className="danger">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminServices;
