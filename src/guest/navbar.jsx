import "./styles/navbar.scss";
import { Link } from "react-router-dom";

const GuestBar = () => {
  const navLinks = [
    { label: "Home", href: "/home" },
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
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
              <Link to={link.href} className="nav-link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="btn-con">
          <Link to="/login" className="btn btn-outline">
            Login
          </Link>
          <Link to="/register" className="btn btn-filled">
            Register
          </Link>
        </div>
      </header>
    </>
  );
};

export default GuestBar;
