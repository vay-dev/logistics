import "./styles/navbar.scss";
import { NavLink } from "react-router-dom";

const GuestBar = () => {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Track Order", href: "/track" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header>
        <h1 className="logo">
          Ship<span>Up</span>
        </h1>

        <ul className="nav-links">
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

        <div className="btn-con">
          <NavLink to="/login" className="btn btn-outline">
            Login
          </NavLink>
          <NavLink to="/signup" className="btn btn-filled">
            Register
          </NavLink>
        </div>
      </header>
    </>
  );
};

export default GuestBar;
