import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/logo.jpeg";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={logo} alt="Review It Logo" className="logo" />
        <span className="brand-text">Review It</span>
      </div>

      {/* Hamburger */}
      <button className={`nav-hamburger ${open ? "open" : ""}`} onClick={() => setOpen(!open)} aria-label="Toggle menu">
        <span /><span /><span />
      </button>

      <div className={`nav-right ${open ? "nav-open" : ""}`}>
        <a href="#sellers"  onClick={() => setOpen(false)}>For Sellers</a>
        <a href="#buyers"   onClick={() => setOpen(false)}>For Buyers</a>
        <a href="#trust"    onClick={() => setOpen(false)}>Trust System</a>
        <a href="#faq"      onClick={() => setOpen(false)}>FAQ</a>
        <Link to="/login"     className="nav-btn" onClick={() => setOpen(false)}>Login</Link>
        <Link to="/SignUpPage" className="nav-btn nav-btn--primary" onClick={() => setOpen(false)}>Get Started</Link>
      </div>
    </nav>
  );
}

export default Navbar;