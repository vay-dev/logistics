import { useState } from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "./components/sidebar";
import "./styles/userlayout.scss";

const UserLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.querySelector("body").classList.toggle("dark-mode");
    localStorage.setItem("darkMode", newTheme);
  };

  return (
    <div
      className={`user-layout ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}
    >
      <UserSidebar onToggle={(collapsed) => setSidebarCollapsed(collapsed)} />
      <main className="main-content">
        <div className="top-bar">
          <h1 className="page-title">Dashboard</h1>
          <div className="top-bar-actions">
            <div className="theme-changer">
              <button className="theme-btn" onClick={toggleTheme}>
                <i className={`fas ${isDarkMode ? "fa-sun" : "fa-moon"}`}></i>
              </button>
            </div>
          </div>
        </div>
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default UserLayout;
