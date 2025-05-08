import React, { useState } from 'react';
import axios from 'axios';
import '../styles/FAQ.css';

const FAQ = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    subject: '',
    content: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // ✅ Use proxy (no hardcoded localhost)
      await axios.post('/messages', formData, {
        withCredentials: true, // ✅ Required if backend uses JWT in cookies
      });
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone_number: '',
        subject: '',
        content: '',
      });
    } catch (err) {
      console.error(err);
      setError('❌ Failed to submit your message. Please try again.');
    }
  };

  return (
    <div className="faq-page">
      <h1>Frequently Asked Questions</h1>

      <div className="faq-list">
        <div className="faq-item">
          <h3>Do you help with all types of visas?</h3>
          <p>Yes! We support tourist, student, visit, and business visa applications.</p>
        </div>

        <div className="faq-item">
          <h3>What countries do you focus on?</h3>
          <p>We currently support clients traveling to the USA, UK, Canada, and Europe.</p>
        </div>

        <div className="faq-item">
          <h3>Can you help with filling the DS-160 form?</h3>
          <p>Absolutely. We assist in completing and reviewing the DS-160 and scheduling appointments.</p>
        </div>
      </div>

      <div className="faq-form-section">
        <h2>Still have a question? Ask us below</h2>
        {submitted && <p className="success-message">✅ Thank you! We'll get back to you shortly.</p>}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="faq-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
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
            name="phone_number"
            placeholder="Phone Number (optional)"
            value={formData.phone_number}
            onChange={handleChange}
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <textarea
            name="content"
            placeholder="Your message or question"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Submit Question</button>
        </form>
      </div>
    </div>
  );
};

export default FAQ;
