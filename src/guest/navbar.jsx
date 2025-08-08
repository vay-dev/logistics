import "./styles/navbar.scss";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const GuestBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Track Order", href: "/track" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle("dark-mode", newMode);
    localStorage.setItem("darkMode", newMode);
  };

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header>
        <h1 className="logo">
          Ship<span>Up</span>
        </h1>

        {/* Desktop Navigation */}
        <ul className="nav-links desktop-nav">
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="btn-con desktop-buttons">
          <button className="theme-btn" onClick={toggleDarkMode}>
            <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
          </button>
          <NavLink to="/login" className="btn btn-outline">
            Login
          </NavLink>
          <NavLink to="/signup" className="btn btn-filled">
            Register
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`mobile-menu-overlay ${isMenuOpen ? "open" : ""}`}
          onClick={closeMenu}
        ></div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
          <ul className="mobile-nav-links">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mobile-buttons">
            <button
              className="theme-btn mobile-theme-btn"
              onClick={toggleDarkMode}
            >
              <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
              <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
            <NavLink
              to="/login"
              className="btn btn-outline"
              onClick={closeMenu}
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="btn btn-filled"
              onClick={closeMenu}
            >
              Register
            </NavLink>
          </div>
        </div>
      </header>
    </>
  );
};

export default GuestBar;
