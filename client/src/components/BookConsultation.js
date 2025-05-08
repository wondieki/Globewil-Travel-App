import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/BookConsultation.css';

const BookConsultation = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    type: '',
    country: '',
    notes: '',
    referral: '',
  });

  const [serviceIds, setServiceIds] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const loggedInUser = JSON.parse(localStorage.getItem('user')) || null;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/services', {
          withCredentials: true,
        });
        setAvailableServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Failed to load services.');
      }
    };

    fetchServices();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceToggle = (id) => {
    setServiceIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitted(false);

    const payload = {
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      booking_type: formData.type,
      country: formData.country,
      notes: formData.notes,
      referral: formData.referral,
      service_ids: serviceIds,
      user_ids: loggedInUser ? [loggedInUser.id] : []
    };

    console.log('📦 Booking payload:', payload);

    try {
      const response = await axios.post('/bookings', payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('✅ Booking successful:', response.data);
      setSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        type: '',
        country: '',
        notes: '',
        referral: '',
      });
      setServiceIds([]);
    } catch (error) {
      console.error('❌ Booking error:', error);
      const backendError = error?.response?.data?.error;
      setError(backendError || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="consultation-page">
      <h1>Book a Consultation</h1>
      <p>Please fill out the form below to schedule a consultation with us.</p>

      {submitted && (
        <p className="success-message">✅ Thank you! We'll get in touch shortly.</p>
      )}

      {error && <p className="error-message">{error}</p>}

      <form className="consultation-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number (with country code)"
          value={formData.phone}
          onChange={handleChange}
        />

        <label>Preferred Consultation Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label>Preferred Time Slot:</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <label>Type of Consultation:</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">-- Select --</option>
          <option value="Visa Support">Visa Support</option>
          <option value="Study Abroad Advice">Study Abroad Advice</option>
          <option value="Interview Coaching">Interview Coaching</option>
          <option value="Travel Planning">Travel Planning</option>
          <option value="Other">Other</option>
        </select>

        <label>Country of Interest:</label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Country --</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Canada">Canada</option>
          <option value="Germany">Germany</option>
          <option value="Netherlands">Netherlands</option>
          <option value="France">France</option>
          <option value="Italy">Italy</option>
          <option value="Australia">Australia</option>
          <option value="Sweden">Sweden</option>
          <option value="Other">Other</option>
        </select>

        <label>Select Services:</label>
        <div className="service-options">
          {availableServices.map((service) => (
            <label key={service.id} className="checkbox-label">
              <input
                type="checkbox"
                value={service.id}
                checked={serviceIds.includes(service.id)}
                onChange={() => handleServiceToggle(service.id)}
              />
              {service.name}
            </label>
          ))}
        </div>

        <textarea
          name="notes"
          placeholder="Additional Notes or Questions"
          value={formData.notes}
          onChange={handleChange}
        ></textarea>

        <label>How did you hear about us?</label>
        <select
          name="referral"
          value={formData.referral}
          onChange={handleChange}
        >
          <option value="">-- Select --</option>
          <option value="Google">Google</option>
          <option value="Instagram">Instagram</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="Friend/Referral">Friend/Referral</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit">Book Consultation</button>
      </form>
    </div>
  );
};

export default BookConsultation;
