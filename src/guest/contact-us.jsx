import { useState, useEffect } from "react";
import AppH1 from "../shared/h1-component.jsx";
import ServiceIcon from "../shared/service-icon.jsx";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle("dark-mode", newMode);
    localStorage.setItem("darkMode", newMode);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    };

    emailjs
      .send(
        "service_6tprcqf", // replace with your actual service ID
        "template_br9mx9m", // replace with your template ID
        templateParams,
        "z_rz1HBDj-dGUXvCL" // replace with your EmailJS public key
      )
      .then(
        (response) => {
          toast.success(
            "Message sent successfully! We'll get back to you soon."
          );

          setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
          });
          setIsSubmitting(false);
        },
        (error) => {
          toast.error("Something went wrong. Please try again.");
          setIsSubmitting(false);
        }
      );
  };

  const contactInfo = [
    {
      title: "Call Us",
      value: "+234 803 123 4567",
      icon: "fas fa-phone",
      description: "Monday to Friday, 8AM - 6PM",
    },
    {
      title: "Email Us",
      value: "hello@shipup.ng",
      icon: "fas fa-envelope",
      description: "We'll respond within 24 hours",
    },
    {
      title: "Visit Us",
      value: "123 Victoria Island, Lagos, Nigeria",
      icon: "fas fa-map-marker-alt",
      description: "Our main office location",
    },
    {
      title: "Live Chat",
      value: "Available 24/7",
      icon: "fas fa-comments",
      description: "Instant support when you need it",
    },
  ];

  const offices = [
    {
      city: "Lagos",
      address: "123 Victoria Island, Lagos State",
      phone: "+234 803 123 4567",
      email: "lagos@shipup.ng",
    },
    {
      city: "Abuja",
      address: "456 Central Business District, Abuja",
      phone: "+234 809 987 6543",
      email: "abuja@shipup.ng",
    },
    {
      city: "Port Harcourt",
      address: "789 GRA Phase 2, Rivers State",
      phone: "+234 807 555 1234",
      email: "portharcourt@shipup.ng",
    },
  ];

  const faqs = [
    {
      question: "What are your operating hours?",
      answer:
        "We operate Monday to Friday from 8AM to 6PM, and Saturdays from 9AM to 2PM. Our customer support is available 24/7 through live chat.",
    },
    {
      question: "How can I track my shipment?",
      answer:
        "You can track your shipment using our tracking page with your tracking number, or through our mobile app for real-time updates.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we provide international shipping services to over 50 countries worldwide with customs handling and door-to-door delivery.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, bank transfers, mobile money, and cash on delivery for eligible locations.",
    },
  ];

  return (
    <>
      <div className="theme-toggle">
        <button className="theme-btn" onClick={() => toggleDarkMode()}>
          <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
        </button>
      </div>

      <div className="contact-page">
        {/* Hero Section */}
        <div className="contact-hero">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">
                Get In <span className="highlight">Touch</span>
              </h1>
              <p className="hero-subtitle">
                We're here to help! Reach out to us for any questions, support,
                or partnership opportunities
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="contact-info-section">
          <div className="container">
            <div className="contact-info-grid">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-info-card">
                  <div className="info-icon">
                    <i className={info.icon}></i>
                  </div>
                  <h3>{info.title}</h3>
                  <p className="info-value">{info.value}</p>
                  <p className="info-description">{info.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form & Map */}
        <div className="contact-form-section">
          <div className="container">
            <div className="contact-form-grid">
              <div className="form-container">
                <div className="form-header">
                  <AppH1 text="Send Us A" childeren="Message" />
                  <p>
                    Fill out the form below and we'll get back to you as soon as
                    possible
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="input-group">
                      <label htmlFor="name">Full Name</label>
                      <div className="input-wrapper">
                        <i className="fas fa-user"></i>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                    </div>
                    <div className="input-group">
                      <label htmlFor="email">Email Address</label>
                      <div className="input-wrapper">
                        <i className="fas fa-envelope"></i>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="input-group">
                      <label htmlFor="phone">Phone Number</label>
                      <div className="input-wrapper">
                        <i className="fas fa-phone"></i>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                    <div className="input-group">
                      <label htmlFor="subject">Subject</label>
                      <div className="input-wrapper">
                        <i className="fas fa-tag"></i>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="shipping">Shipping Question</option>
                          <option value="support">Customer Support</option>
                          <option value="partnership">Partnership</option>
                          <option value="complaint">Complaint</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="input-group">
                    <label htmlFor="message">Message</label>
                    <div className="input-wrapper">
                      <i className="fas fa-comment"></i>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us how we can help you..."
                        rows="5"
                        required
                      ></textarea>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`submit-btn ${isSubmitting ? "loading" : ""}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i>
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>

              <div className="map-container">
                <div className="map-placeholder">
                  <i className="fas fa-map-marked-alt"></i>
                  <p>Interactive Map</p>
                  <span>Lagos, Nigeria Office Location</span>
                </div>
                {/* Replace with actual map integration */}
              </div>
            </div>
          </div>
        </div>

        {/* Office Locations */}
        <div className="offices-section">
          <div className="container">
            <div className="section-header">
              <AppH1 text="Our" childeren="Offices" />
              <ServiceIcon iconClass="fas fa-building" />
            </div>

            <div className="offices-grid">
              {offices.map((office, index) => (
                <div key={index} className="office-card">
                  <div className="office-header">
                    <h3>{office.city}</h3>
                    <div className="office-icon">
                      <i className="fas fa-building"></i>
                    </div>
                  </div>
                  <div className="office-details">
                    <div className="detail-item">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{office.address}</span>
                    </div>
                    <div className="detail-item">
                      <i className="fas fa-phone"></i>
                      <span>{office.phone}</span>
                    </div>
                    <div className="detail-item">
                      <i className="fas fa-envelope"></i>
                      <span>{office.email}</span>
                    </div>
                  </div>
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
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <div className="faq-question">
                    <h4>{faq.question}</h4>
                    <i className="fas fa-chevron-down"></i>
                  </div>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="newsletter-section">
          <div className="container">
            <div className="newsletter-content">
              <h2>Stay Updated</h2>
              <p>
                Subscribe to our newsletter for the latest updates, shipping
                tips, and exclusive offers
              </p>
              <div className="newsletter-form">
                <div className="newsletter-input">
                  <i className="fas fa-envelope"></i>
                  <input type="email" placeholder="Enter your email address" />
                </div>
                <button className="newsletter-btn">
                  <i className="fas fa-bell"></i>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
