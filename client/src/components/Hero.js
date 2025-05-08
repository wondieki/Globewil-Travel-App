import React from 'react';
import { Link } from 'react-router-dom'; // 👈 Import Link
import '../styles/Hero.css';
import heroImg from '../assets/images/hero-image.png';

function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-content">
        <h1>Start Your Journey with GlobeWil Travels</h1>
        <p>Helping you travel, study, or explore the world with ease and expert support.</p>
        
        <Link to="/consultation" className="hero-button">
          Book Consultation
        </Link>
      </div>

      <div className="hero-image">
        <img src={heroImg} alt="Travel illustration" />
      </div>
    </section>
  );
}

export default Hero;
