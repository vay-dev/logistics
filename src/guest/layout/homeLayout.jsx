import "../styles/home.scss";
import rider from "../../assets/rider.png";
import rider2 from "../../assets/rider-bg-removed.png";
import store from "../../assets/store.png";
import delievery from "../../assets/delievery.png";
import GuestBar from "../navbar.jsx";
import AppH1 from "../../shared/h1-component.jsx";
import ServiceIcon from "../../shared/service-icon.jsx";
import maps from "../../assets/maps.png";
import Footer from "../footer.jsx"; // Import the Footer component
import { useState, useEffect } from "react";
import Home from "../home.jsx";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
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

  return (
    <>
      <GuestBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeLayout;
