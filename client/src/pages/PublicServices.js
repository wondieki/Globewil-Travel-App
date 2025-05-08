// src/pages/PublicServices.js

import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/PublicServices.css";

function PublicServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get("/services") // ✅ Use relative path — proxy will handle this
      .then(res => setServices(res.data))
      .catch(err => console.error("Error fetching services:", err));
  }, []);

  return (
    <div className="public-services-container">
      <h2>Our Services</h2>
      <div className="service-grid">
        {services.length === 0 ? (
          <p>No services available at the moment.</p>
        ) : (
          services.map((s) => (
            <div key={s.id} className="service-card">
              <h3>{s.name}</h3>
              <p>{s.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PublicServices;
