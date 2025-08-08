import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

const UserSidebar = ({ onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSignningOut, setIsSigningOut] = useState(false);

  const LogOut = () => {
    setIsSigningOut(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      toast.success("Logged out successfully!");
      window.location.href = "/";
    }, 1500);
  };

  const navLinks = [
    { name: "Dispatches", path: "/user/", icon: "fas fa-truck" },
    {
      name: "Add Dispatch",
      path: "/user/add-dispatch",
      icon: "fas fa-plus-circle",
    },
    {
      name: "Track Dispatch",
      path: "/user/track-dispatch",
      icon: "fas fa-map-marker-alt",
    },
    { name: "History", path: "/dispatch-history", icon: "fas fa-history" },
  ];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    if (onToggle) {
      onToggle(newCollapsed);
    }
  };

  const openSidebar = () => {
    setIsCollapsed(false);
    if (onToggle) {
      onToggle(false);
    }
  };

  return (
    <div className={`user-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div
          className="logo"
          onClick={openSidebar}
          {...(isCollapsed ? { role: "button" } : {})}
        >
          <i className="fas fa-shipping-fast"></i>
          {!isCollapsed && <span>ShipUp</span>}
        </div>
        <button
          className="toggle-btn"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          {!isCollapsed && (
            <i className={`fas ${isCollapsed ? "fa-bars" : "fa-times"}`}></i>
          )}
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {navLinks.map((link, index) => (
            <li key={index} className="nav-item">
              <NavLink
                to={link.path}
                end={link.path === "/user/"}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                <i className={link.icon}></i>
                {!isCollapsed && <span className="nav-text">{link.name}</span>}
              </NavLink>
            </li>
          ))}
          <li className="nav-item mt-5" onClick={LogOut}>
            <Link className="nav-link">
              {isSignningOut ? (
                <FaSpinner className="spinner spin" />
              ) : (
                <i className="fas fa-sign-out-alt"></i>
              )}
              {!isCollapsed && (
                <span className="nav-text">
                  {isSignningOut ? "Signing out..." : "Logout"}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <i className="fas fa-user-circle"></i>
          {!isCollapsed && (
            <div className="user-details">
              <span className="user-name">John Doe</span>
              <span className="user-role">Dispatcher</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
