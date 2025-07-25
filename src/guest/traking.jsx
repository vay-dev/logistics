import { useState, useEffect } from "react";
import AppH1 from "../shared/h1-component.jsx";
import ServiceIcon from "../shared/service-icon.jsx";

const TrackOrder = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle("dark-mode", newMode);
    localStorage.setItem("darkMode", newMode);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTrackingResult({
        trackingNumber: trackingNumber,
        status: "In Transit",
        estimatedDelivery: "Dec 28, 2024",
        currentLocation: "Lagos Distribution Center",
        progress: 75,
        timeline: [
          {
            status: "Order Placed",
            date: "Dec 20, 2024",
            time: "10:30 AM",
            location: "Lagos",
            completed: true,
            icon: "fas fa-check-circle",
          },
          {
            status: "Package Picked Up",
            date: "Dec 21, 2024",
            time: "2:15 PM",
            location: "Lagos Warehouse",
            completed: true,
            icon: "fas fa-truck",
          },
          {
            status: "In Transit",
            date: "Dec 22, 2024",
            time: "8:00 AM",
            location: "Distribution Center",
            completed: true,
            icon: "fas fa-shipping-fast",
            current: true,
          },
          {
            status: "Out for Delivery",
            date: "Dec 28, 2024",
            time: "9:00 AM",
            location: "Local Facility",
            completed: false,
            icon: "fas fa-truck-loading",
          },
          {
            status: "Delivered",
            date: "Dec 28, 2024",
            time: "Expected",
            location: "Destination",
            completed: false,
            icon: "fas fa-home",
          },
        ],
      });
      setIsLoading(false);
    }, 2000);
  };

  const trackingTips = [
    {
      title: "Track Multiple Orders",
      description:
        "You can track up to 10 packages at once by separating tracking numbers with commas",
      icon: "fas fa-list",
    },
    {
      title: "Real-time Updates",
      description:
        "Get instant notifications via SMS or email when your package status changes",
      icon: "fas fa-bell",
    },
    {
      title: "Delivery Preferences",
      description:
        "Set your delivery preferences and provide special instructions for drivers",
      icon: "fas fa-cog",
    },
  ];

  return (
    <>
      <div className="theme-toggle">
        <button className="theme-btn" onClick={() => toggleDarkMode()}>
          <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
        </button>
      </div>

      <div className="track-page">
        {/* Hero Section */}
        <div className="track-hero">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">
                Track Your <span className="highlight">Package</span>
              </h1>
              <p className="hero-subtitle">
                Enter your tracking number to get real-time updates on your
                shipment
              </p>
            </div>
          </div>
        </div>

        {/* Tracking Form */}
        <div className="tracking-form-section">
          <div className="container">
            <div className="tracking-form-wrapper">
              <form onSubmit={handleTrackOrder} className="tracking-form">
                <div className="input-group">
                  <div className="input-icon">
                    <i className="fas fa-search"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter tracking number (e.g., SU123456789)"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="tracking-input"
                  />
                  <button
                    type="submit"
                    className={`track-btn ${isLoading ? "loading" : ""}`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="spinner"></div>
                    ) : (
                      <>
                        <i className="fas fa-search"></i>
                        Track Package
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Tracking Result */}
        {trackingResult && (
          <div className="tracking-result-section">
            <div className="container">
              <div className="tracking-result">
                <div className="result-header">
                  <h2>Tracking Details</h2>
                  <div className="tracking-info">
                    <span className="tracking-number">
                      #{trackingResult.trackingNumber}
                    </span>
                    <span
                      className={`status-badge ${trackingResult.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {trackingResult.status}
                    </span>
                  </div>
                </div>

                <div className="delivery-summary">
                  <div className="summary-item">
                    <i className="fas fa-calendar-alt"></i>
                    <div>
                      <span className="label">Estimated Delivery</span>
                      <span className="value">
                        {trackingResult.estimatedDelivery}
                      </span>
                    </div>
                  </div>
                  <div className="summary-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <div>
                      <span className="label">Current Location</span>
                      <span className="value">
                        {trackingResult.currentLocation}
                      </span>
                    </div>
                  </div>
                  <div className="summary-item">
                    <i className="fas fa-chart-line"></i>
                    <div>
                      <span className="label">Progress</span>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${trackingResult.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tracking-timeline">
                  <h3>Tracking Timeline</h3>
                  <div className="timeline">
                    {trackingResult.timeline.map((item, index) => (
                      <div
                        key={index}
                        className={`timeline-item ${
                          item.completed ? "completed" : ""
                        } ${item.current ? "current" : ""}`}
                      >
                        <div className="timeline-icon">
                          <i className={item.icon}></i>
                        </div>
                        <div className="timeline-content">
                          <h4>{item.status}</h4>
                          <p className="timeline-location">{item.location}</p>
                          <p className="timeline-date">
                            {item.date} at {item.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tracking Tips */}
        <div className="tracking-tips-section">
          <div className="container">
            <div className="section-header">
              <AppH1 text="Tracking" childeren="Tips" />
              <ServiceIcon iconClass="fas fa-lightbulb" />
            </div>

            <div className="tips-grid">
              {trackingTips.map((tip, index) => (
                <div key={index} className="tip-card">
                  <div className="tip-icon">
                    <i className={tip.icon}></i>
                  </div>
                  <h3>{tip.title}</h3>
                  <p>{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <div className="container">
            <div className="section-header">
              <AppH1 text="Frequently Asked" childeren="Questions" />
            </div>

            <div className="faq-grid">
              <div className="faq-item">
                <h4>How long does it take for tracking to update?</h4>
                <p>
                  Tracking information is updated in real-time. However, it may
                  take up to 24 hours for the first scan to appear after your
                  package is picked up.
                </p>
              </div>
              <div className="faq-item">
                <h4>What if my tracking number doesn't work?</h4>
                <p>
                  Please check that you've entered the correct tracking number.
                  If the issue persists, contact our customer service team for
                  assistance.
                </p>
              </div>
              <div className="faq-item">
                <h4>Can I change my delivery address?</h4>
                <p>
                  Yes, you can modify your delivery address before the package
                  is out for delivery. Contact us or use our online portal to
                  make changes.
                </p>
              </div>
              <div className="faq-item">
                <h4>What happens if I'm not home during delivery?</h4>
                <p>
                  Our drivers will attempt delivery up to 3 times. You can also
                  schedule a convenient delivery time or redirect to a pickup
                  location.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="support-section">
          <div className="container">
            <div className="support-card">
              <h2>Need Help?</h2>
              <p>
                Can't find your package or need assistance? Our support team is
                here to help.
              </p>
              <div className="support-buttons">
                <button className="btn btn-filled">
                  <i className="fas fa-phone"></i>
                  Call Support
                </button>
                <button className="btn btn-outline">
                  <i className="fas fa-envelope"></i>
                  Email Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackOrder;
