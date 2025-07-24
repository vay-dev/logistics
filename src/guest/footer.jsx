// Create a new file: components/Footer.jsx

import React from "react";
import "./styles/footer.scss";

const Footer = () => {
  const footerLinks = {
    explore: [
      { label: "About Us", href: "/about" },
      { label: "Our Warehouses", href: "/warehouses" },
      { label: "Blog", href: "/blog" },
      { label: "News and Media", href: "/news" },
    ],
    legal: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
    socialMedia: [
      { icon: "fab fa-facebook-f", href: "#", label: "Facebook" },
      { icon: "fab fa-twitter", href: "#", label: "Twitter" },
      { icon: "fab fa-linkedin-in", href: "#", label: "LinkedIn" },
      { icon: "fab fa-instagram", href: "#", label: "Instagram" },
    ],
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Info */}
        <div className="footer-section company-info">
          <div className="footer-logo">
            <span className="logo-text">
              Ship<span className="logo-highlight">Up</span>
            </span>
          </div>
          <p className="company-description">
            ShipUp delivers an unparalleled customer service through dedicated
            customer teams, engaged people working in an agile culture, and a
            global footprint.
          </p>
        </div>

        {/* Explore Links */}
        <div className="footer-section">
          <h4 className="footer-title">Explore</h4>
          <ul className="footer-links">
            {footerLinks.explore.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="footer-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Links */}
        <div className="footer-section">
          <h4 className="footer-title">Legal</h4>
          <ul className="footer-links">
            {footerLinks.legal.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="footer-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h4 className="footer-title">Social Media</h4>
          <div className="social-links">
            {footerLinks.socialMedia.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="social-link"
                aria-label={social.label}
              >
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="copyright">
            Ship<span className="logo-highlight">Up</span>.ng
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
