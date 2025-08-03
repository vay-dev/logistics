import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.scss";
import Home from "./guest/home";
import { ToastContainer, Bounce } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import BackToTop from "./shared/back-to-top";
import Signup from "./auth/signup";
import Login from "./auth/login";
import HomeLayout from "./guest/layout/homeLayout";
import Services from "./guest/services";
import TrackOrder from "./guest/traking";
import About from "./guest/about-us";
import Contact from "./guest/contact-us";
import UserLayout from "./user/layout";
import UserSidebar from "./user/components/sidebar";
import Dispatches from "./user/pages/dispatchlist";
import AddDispatch from "./user/pages/createdispatch";
import TrackDispatch from "./user/pages/trackdispatch";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="light"
      transition={Bounce}
    />
    <BrowserRouter>
      <BackToTop />
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/track" element={<TrackOrder />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Dispatches />} />
          <Route path="add-dispatch" element={<AddDispatch />} />
          <Route path="track-dispatch" element={<TrackDispatch />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
