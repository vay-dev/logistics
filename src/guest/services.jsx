import { useState, useEffect } from "react";
import AppH1 from "../shared/h1-component.jsx";
import ServiceIcon from "../shared/service-icon.jsx";

const Services = () => {
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

  const mainServices = [
    {
      title: "Express Delivery",
      description:
        "Fast and reliable same-day delivery services for urgent shipments across major cities.",
      icon: "fas fa-shipping-fast",
      features: [
        "Same-day delivery",
        "Real-time tracking",
        "24/7 support",
        "Insurance coverage",
      ],
    },
    {
      title: "International Shipping",
      description:
        "Global logistics solutions with customs handling and door-to-door delivery worldwide.",
      icon: "fas fa-globe-americas",
      features: [
        "Customs clearance",
        "Door-to-door service",
        "Multi-modal transport",
        "Export documentation",
      ],
    },
    {
      title: "Warehousing & Storage",
      description:
        "Secure storage solutions with inventory management and distribution services.",
      icon: "fas fa-warehouse",
      features: [
        "Climate controlled",
        "Inventory management",
        "Pick & pack",
        "Distribution services",
      ],
    },
    {
      title: "Supply Chain Management",
      description:
        "End-to-end supply chain optimization with advanced analytics and reporting.",
      icon: "fas fa-chart-line",
      features: [
        "Supply chain optimization",
        "Analytics & reporting",
        "Vendor management",
        "Cost reduction",
      ],
    },
  ];

  const additionalServices = [
    { name: "Freight Forwarding", icon: "fas fa-truck-loading" },
    { name: "Cold Chain Logistics", icon: "fas fa-thermometer-half" },
    { name: "E-commerce Fulfillment", icon: "fas fa-shopping-cart" },
    { name: "Last Mile Delivery", icon: "fas fa-route" },
    { name: "Packaging Solutions", icon: "fas fa-box" },
    { name: "Insurance Services", icon: "fas fa-shield-alt" },
  ];

  return (
    <>
      <div className="theme-toggle">
        <button className="theme-btn" onClick={() => toggleDarkMode()}>
          <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
        </button>
      </div>

      <div className="services-page">
        {/* Hero Section */}
        <div className="services-hero">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">
                Our <span className="highlight">Services</span>
              </h1>
              <p className="hero-subtitle">
                Comprehensive logistics solutions tailored to meet your business
                needs
              </p>
            </div>
            <div className="hero-image">
              {/* Add logistics/services hero image here */}
            </div>
          </div>
        </div>

        {/* Main Services */}
        <div className="main-services-section">
          <div className="container">
            <div className="section-header">
              <AppH1 text="Core" childeren="Services" />
              <ServiceIcon iconClass="fas fa-cogs" />
            </div>

            <div className="services-grid">
              {mainServices.map((service, index) => (
                <div key={index} className="service-card">
                  <div className="service-icon">
                    <i className={service.icon}></i>
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <ul className="service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>
                        <i className="fas fa-check"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="service-btn">Learn More</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Services */}
        <div className="additional-services-section">
          <div className="container">
            <div className="section-header">
              <AppH1 text="Additional" childeren="Services" />
            </div>

            <div className="additional-services-grid">
              {additionalServices.map((service, index) => (
                <div key={index} className="additional-service-item">
                  <div className="service-icon-mini">
                    <i className={service.icon}></i>
                  </div>
                  <span>{service.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="process-section">
          <div className="container">
            <div className="section-header">
              <AppH1 text="How It" childeren="Works" />
            </div>

            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <h4>Request Quote</h4>
                <p>Submit your shipping requirements and get instant pricing</p>
              </div>
              <div className="process-step">
                <div className="step-number">2</div>
                <h4>Schedule Pickup</h4>
                <p>Choose your preferred pickup time and location</p>
              </div>
              <div className="process-step">
                <div className="step-number">3</div>
                <h4>Track Shipment</h4>
                <p>Monitor your package in real-time until delivery</p>
              </div>
              <div className="process-step">
                <div className="step-number">4</div>
                <h4>Delivery Complete</h4>
                <p>Receive confirmation and delivery proof</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="services-cta">
          <div className="container">
            <h2>Ready to Get Started?</h2>
            <p>Contact us today for a customized logistics solution</p>
            <div className="cta-buttons">
              <button className="btn btn-filled">Get Quote</button>
              <button className="btn btn-outline">Contact Us</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
