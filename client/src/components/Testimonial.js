import React from "react";
import "../styles/Testimonial.css";

const testimonials = [
  {
    name: "Sarah M.",
    text: "GlobeWil made the visa process smooth and stress-free. I got approved on my first attempt!",
  },
  {
    name: "John K.",
    text: "From documentation to interview prep, everything was handled professionally. Highly recommend!",
  },
  {
    name: "Linda A.",
    text: "The team really knows what they’re doing. I felt supported throughout the process.",
  },
  {
    name: "David N.",
    text: "I was skeptical at first, but GlobeWil exceeded my expectations. Thank you!",
  },
  {
    name: "Grace T.",
    text: "Their guidance helped me get a student visa to the UK with ease. A lifesaver!",
  },
  {
    name: "Brian O.",
    text: "Great service, friendly team, and super reliable. I’ll be referring my friends.",
  },
];

const Testimonial = () => {
  return (
    <section className="testimonials">
      <h2>What Our Clients Say</h2>
      <div className="testimonial-grid">
        {testimonials.map((client, index) => (
          <div className="testimonial-card" key={index}>
            <p className="testimonial-text">"{client.text}"</p>
            <h4 className="testimonial-name">– {client.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
