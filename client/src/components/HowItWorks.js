import React from "react";
import "../styles/HowItWorks.css";
import {
  FaRegHandshake,
  FaClipboardList,
  FaFileAlt,
  FaComments,
  FaPaperPlane,
  FaGlobeAmericas,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaRegHandshake />,
      title: "1. Initial Consultation",
      description:
        "Schedule a one-on-one session to understand your travel goals and eligibility.",
    },
    {
      icon: <FaClipboardList />,
      title: "2. Application Intake",
      description:
        "Fill out our secure form to provide essential personal and travel details.",
    },
    {
      icon: <FaFileAlt />,
      title: "3. Document Review & Guidance",
      description:
        "We review your documents, provide feedback, and ensure everything is in order.",
    },
    {
      icon: <FaComments />,
      title: "4. Visa Interview Preparation",
      description:
        "Practice with mock interviews and receive tips to confidently face consular officers.",
    },
    {
      icon: <FaPaperPlane />,
      title: "5. Submission & Follow-up",
      description:
        "We help submit your application and monitor progress, keeping you updated.",
    },
    {
      icon: <FaGlobeAmericas />,
      title: "6. Travel Readiness & Support",
      description:
        "Once approved, we assist with ticketing, packing tips, and settling-in support.",
    },
  ];

  return (
    <section className="how-it-works">
      <h2>How It Works</h2>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div className="step-card" key={index}>
            <div className="icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
