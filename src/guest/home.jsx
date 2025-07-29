import { useState, useEffect } from "react";
import rider from "../assets/rider.png";
import rider2 from "../assets/rider-bg-removed.png";
import store from "../assets/store.png";
import delievery from "../assets/delievery.png";
import AppH1 from "../shared/h1-component.jsx";
import ServiceIcon from "../shared/service-icon.jsx";
import maps from "../assets/maps.png";

const Home = () => {
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

  const freightOptions = [
    {
      label: "Warehousing Services",
      icon: <i className="fa-solid fa-warehouse" />,
      description:
        "A pay-as-you-go solution for: pallet storage, inventory management, fulfillment (e.g. pick and pack), in/out-bound solutions, and more.",
    },
    {
      label: "Global Freight",
      icon: <i className="fa-solid fa-plane-departure"></i>,
      description:
        "We handle international cargo shipments via sea or air, offering cost-effective, end-to-end freight forwarding and customs coordination.",
    },
    {
      label: "Packaging Solutions",
      icon: <i className="fa-solid fa-box-open" />,
      description:
        "Customized, secure, and eco-friendly packaging designed to protect your goods throughout the logistics journey — from source to destination.",
    },
  ];

  // Add this to your Home component

  const operationsModes = [
    {
      id: 1,
      title: "Connect",
      description:
        "Seamlessly connect with your team and clients through our integrated communication platform. Real-time collaboration made simple and efficient.",
      image: rider, // or your connect image
      position: "right", // image position relative to text
      imageStyles: {
        top: "10%",
        right: "5%",
        transform: "rotate(5deg)",
        width: "300px",
        height: "auto",
      },
    },
    {
      id: 2,
      title: "Store",
      description:
        "Securely store and organize all your important data with our cloud-based storage solution. Access your files anywhere, anytime.",
      image: store,
      position: "left",
      imageStyles: {
        top: "15%",
        left: "8%",
        transform: "scale(1.1)",
        width: "250px",
        height: "auto",
      },
    },
    {
      id: 3,
      title: "Ship",
      description:
        "Deploy and ship your products with confidence using our automated deployment pipeline. Fast, reliable, and scalable delivery.",
      image: delievery,
      position: "right",
      imageStyles: {
        bottom: "10%",
        right: "10%",
        transform: "rotate(-3deg)",
        width: "280px",
        height: "auto",
      },
    },
  ];
  return (
    <>
      <div className="theme-toggle">
        <button className="theme-btn" onClick={() => toggleDarkMode()}>
          <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
        </button>
      </div>
      <div className="content-wrapper">
        <div className="hero-section container-fluid mt-4">
          <div className="row">
            <div id="first-content" className="col-md-6">
              <div className="content-container">
                <h1 className="title-text">
                  Quick and Reliable{" "}
                  <span>Warehousing And Logistics Solution</span>
                </h1>
                <p className="description-text">
                  ShipUp delivers an unparalleled customer service through
                  dedicated customer teams, engaged people working in an agile
                  culture, and a global footprint
                </p>
                <div className="button-group">
                  <button className="btn filled">Get Started</button>
                  <button className="btn outline">Learn More</button>
                </div>
              </div>
            </div>
            <div id="second-content" className="col-md-6">
              <img src={rider2} alt="rider-img" />
            </div>
          </div>
        </div>
        {/* <div className="price-wrapper">
          <div className="price-checker-wrapper">
            <div className="input-group">
              <label htmlFor="origin">Origin</label>
              <div className="input-icon">
                <i className="fas fa-map-marker-alt"></i>
                <input id="origin" placeholder="Enter Location" />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="destination">Destination</label>
              <div className="input-icon">
                <i className="fas fa-map-marker-alt"></i>
                <input id="destination" placeholder="Enter Location" />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="weight">Weight</label>
              <div className="input-icon">
                <i className="fas fa-weight-hanging"></i>
                <input id="weight" placeholder="Weight (KG)" type="number" />
              </div>
            </div>
            <button className="check-price-btn">Check Price</button>
          </div>
        </div> */}
      </div>
      <div className="services-container">
        <div className="service-heading">
          <AppH1 text="Services" childeren="We Offer" />
          <div className="icon-container">
            <ServiceIcon iconClass="fas fa-truck" />
          </div>
        </div>
      </div>

      <div className="freight-options">
        {freightOptions.map((option, index) => (
          <div className="freight-option" key={index}>
            <div className="freight-icon">{option.icon}</div>
            <h2 className="option-label">{option.label}</h2>
            <p>{option.description}</p>
          </div>
        ))}
      </div>

      <div className="operations-mode-section">
        <div className="icon-container">
          <ServiceIcon iconClass="fas fa-cogs" />
        </div>
        <div className="operations-heading">
          <AppH1 text="Operation" childeren="Mode" />
        </div>

        <div className="operations-container">
          {operationsModes.map((mode, index) => (
            <div
              key={mode.id}
              className={`operation-item ${
                mode.position === "left" ? "reverse" : ""
              }`}
            >
              <div className="operation-content">
                <div className="operation-number">{mode.id}</div>
                <h3 className="operation-title">{mode.title}</h3>
                <p className="operation-description">{mode.description}</p>
              </div>

              <div className="operation-image-container">
                <img
                  src={mode.image}
                  alt={`${mode.title} illustration`}
                  className="operation-image"
                  style={mode.imageStyles}
                />
                {/* Background decorative elements */}
                <div className="image-bg-decoration"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="map-section">
        <AppH1 text="Warehouse" childeren="Onsite" />

        <div className="img-container">
          <img src={maps} alt="map" className="map-image img-fluid" />
        </div>
      </div>
    </>
  );
};

export default Home;
