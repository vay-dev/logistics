import { useState, useEffect } from "react";
import AppH1 from "../shared/h1-component.jsx";
import ServiceIcon from "../shared/service-icon.jsx";

const About = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle("dark-mode", newMode);
    localStorage.setItem("darkMode", newMode);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const stats = [
    { number: "500+", label: "Happy Clients", icon: "fas fa-users" },
    { number: "10K+", label: "Deliveries Made", icon: "fas fa-shipping-fast" },
    { number: "50+", label: "Cities Covered", icon: "fas fa-map-marked-alt" },
    { number: "99.9%", label: "On-Time Delivery", icon: "fas fa-clock" },
  ];

  const team = [
    {
      name: "John Adebayo",
      position: "CEO & Founder",
      image: "", // Add team member image
      description:
        "20+ years experience in logistics and supply chain management",
    },
    {
      name: "Sarah Okafor",
      position: "Head of Operations",
      image: "", // Add team member image
      description:
        "Expert in streamlining delivery processes and customer satisfaction",
    },
    {
      name: "Michael Chukwu",
      position: "Technology Director",
      image: "", // Add team member image
      description:
        "Leading innovation in logistics technology and tracking systems",
    },
    {
      name: "Fatima Bello",
      position: "Customer Relations Manager",
      image: "", // Add team member image
      description:
        "Dedicated to ensuring exceptional customer service and support",
    },
  ];

  const values = [
    {
      title: "Reliability",
      icon: "fas fa-handshake",
      description:
        "We deliver on our promises with consistent, dependable service you can count on.",
    },
    {
      title: "Innovation",
      icon: "fas fa-lightbulb",
      description:
        "Continuously improving our technology and processes to serve you better.",
    },
    {
      title: "Customer First",
      icon: "fas fa-heart",
      description:
        "Your satisfaction is our priority. We go above and beyond for every customer.",
    },
    {
      title: "Sustainability",
      icon: "fas fa-leaf",
      description:
        "Committed to eco-friendly practices and reducing our environmental impact.",
    },
  ];

  return (
    <>
      <div className="theme-toggle">
        <button className="theme-btn" onClick={() => toggleDarkMode()}>
          <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
        </button>
      </div>

      <div className="about-page">
        {/* Hero Section */}
        <div className="about-hero">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">
                About <span className="highlight">ShipUp</span>
              </h1>
              <p className="hero-subtitle">
                Revolutionizing logistics with innovative technology and
                exceptional service since 2020
              </p>
            </div>
            <div className="hero-image">
              {/* Add about us hero image here - team/office/warehouse scene */}
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="story-section">
          <div className="container">
            <div className="story-content">
              <div className="story-text">
                <AppH1 text="Our" childeren="Story" />
                <p className="story-paragraph">
                  Founded in 2020 in Lagos, Nigeria, ShipUp began with a simple
                  mission: to make shipping and logistics accessible, reliable,
                  and efficient for businesses of all sizes. What started as a
                  small local delivery service has grown into a comprehensive
                  logistics platform serving customers across West Africa.
                </p>
                <p className="story-paragraph">
                  Today, we're proud to be at the forefront of logistics
                  innovation, combining cutting-edge technology with
                  personalized service to deliver exceptional results for our
                  clients. Our journey has been driven by our commitment to
                  solving real-world shipping challenges and creating value for
                  our customers.
                </p>
              </div>
              <div className="story-image">
                {/* Add company story/timeline image here */}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="container">
            <div className="section-header">
              <AppH1 text="Our" childeren="Impact" />
              <ServiceIcon iconClass="fas fa-chart-bar" />
            </div>

            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon">
                    <i className={stat.icon}></i>
                  </div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mission-vision-section">
          <div className="container">
            <div className="mission-vision-grid">
              <div className="mission-card">
                <div className="card-icon">
                  <i className="fas fa-bullseye"></i>
                </div>
                <h3>Our Mission</h3>
                <p>
                  To provide innovative, reliable, and cost-effective logistics
                  solutions that empower businesses to reach their customers
                  efficiently while maintaining the highest standards of service
                  quality.
                </p>
              </div>
              <div className="vision-card">
                <div className="card-icon">
                  <i className="fas fa-eye"></i>
                </div>
                <h3>Our Vision</h3>
                <p>
                  To become Africa's leading logistics platform, connecting
                  businesses and communities through seamless, technology-driven
                  shipping solutions that drive economic growth and development.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="values-section">
          <div className="container">
            <div className="section-header">
              <AppH1 text="Our" childeren="Values" />
            </div>

            <div className="values-grid">
              {values.map((value, index) => (
                <div key={index} className="value-card">
                  <div className="value-icon">
                    <i className={value.icon}></i>
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="team-section">
          <div className="container">
            <div className="section-header">
              <AppH1 text="Meet Our" childeren="Team" />
              <ServiceIcon iconClass="fas fa-users" />
            </div>

            <div className="team-grid">
              {team.map((member, index) => (
                <div key={index} className="team-card">
                  <div className="member-image">
                    {/* Add team member image here */}
                    <div className="image-placeholder">
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                  <div className="member-info">
                    <h3>{member.name}</h3>
                    <h4>{member.position}</h4>
                    <p>{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="timeline-section">
          <div className="container">
            <div className="section-header">
              <AppH1 text="Our" childeren="Journey" />
            </div>

            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-year">2020</div>
                <div className="timeline-content">
                  <h4>Company Founded</h4>
                  <p>
                    ShipUp was established in Lagos with a vision to transform
                    logistics in Nigeria
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2021</div>
                <div className="timeline-content">
                  <h4>First 1000 Deliveries</h4>
                  <p>
                    Reached our first major milestone and expanded to 5 cities
                    across Nigeria
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2022</div>
                <div className="timeline-content">
                  <h4>Technology Platform Launch</h4>
                  <p>
                    Launched our advanced tracking system and mobile application
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2023</div>
                <div className="timeline-content">
                  <h4>Regional Expansion</h4>
                  <p>
                    Extended services to Ghana, Senegal, and other West African
                    countries
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2024</div>
                <div className="timeline-content">
                  <h4>AI Integration</h4>
                  <p>
                    Implemented AI-powered route optimization and predictive
                    delivery systems
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="about-cta">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Ship with Us?</h2>
              <p>
                Join thousands of satisfied customers who trust ShipUp for their
                logistics needs
              </p>
              <div className="cta-buttons">
                <button className="btn btn-filled">Get Started Today</button>
                <button className="btn btn-outline">Contact Our Team</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
