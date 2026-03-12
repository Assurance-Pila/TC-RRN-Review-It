/* src/components/Navbar.jsx */
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import "../styles/navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo always navigates home */}
      <Link to="/" className="nav-brand" onClick={() => setOpen(false)}>
        <img src={logo} alt="Review It" className="logo" />
        <span className="brand-text">Review It</span>
      </Link>

      <button
        className={`nav-hamburger ${open ? "open" : ""}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      <div className={`nav-right ${open ? "nav-open" : ""}`}>
        <a href="#sellers" onClick={() => setOpen(false)}>For Sellers</a>
        <a href="#buyers"  onClick={() => setOpen(false)}>For Buyers</a>
        <a href="#trust"   onClick={() => setOpen(false)}>Trust System</a>
        <a href="#faq"     onClick={() => setOpen(false)}>FAQ</a>
        <Link to="/login"         className="nav-btn"               onClick={() => setOpen(false)}>Sign In</Link>
        <Link to="/signup"        className="nav-btn nav-btn--primary" onClick={() => setOpen(false)}>Create Account</Link>
      </div>
    </nav>
  );
}