import React from 'react';
import Hero from '../components/Hero';
// import BookConsultation from '../components/BookConsultation';
import HowItWorks from '../components/HowItWorks';
import Testimonial from '../components/Testimonial';


function Home() {
  return (
    <div className="home-container">
      <section id="home">
        <Hero />
      </section>

      {/* <section id="book">
        <BookConsultation />
      </section> */}

      <section id="how">
        <HowItWorks />
      </section>

      <section id="testimonial">
        <Testimonial />
      </section>

    
    </div>
  );
}

export default Home;
