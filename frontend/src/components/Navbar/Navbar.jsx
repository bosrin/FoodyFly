import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  // ✅ Check login status on load
  useEffect(() => {
    const savedLogin = localStorage.getItem("foodyfly_loggedIn");
    if (savedLogin === "true") setUserLoggedIn(true);
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const handleLockedClick = (e) => {
    e.preventDefault();
    alert("⚠️ Please log in first to access this section!");
  };

  // ✅ Wrapper for links that require login
  const ProtectedLink = ({ to, children }) => {
    if (userLoggedIn) {
      return (
        <Link to={to} onClick={handleLinkClick}>
          {children}
        </Link>
      );
    }
    return (
      <span className="locked" onClick={handleLockedClick}>
        {children}
      </span>
    );
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo" onClick={() => navigate("/")}>
        <span className="chef-hat">👨‍🍳</span>
        <h1 className="logo-text">FoodyFly</h1>
      </div>

      {/* Hamburger menu */}
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Nav links */}
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li>
          <Link to="/" onClick={handleLinkClick}>
            Home
          </Link>
        </li>
        <li>
          <ProtectedLink to="/menu">Menu</ProtectedLink>
        </li>
        <li>
          <ProtectedLink to="/about">About</ProtectedLink>
        </li>
        <li>
          <ProtectedLink to="/contact">Contact</ProtectedLink>
        </li>
      </ul>

      {/* Right icons */}
      <div className="nav-actions">
        {/* Cart */}
        <Link
          to={userLoggedIn ? "/cart" : "#"}
          className={`cart-link ${!userLoggedIn ? "disabled" : ""}`}
          onClick={(e) => {
            if (!userLoggedIn) handleLockedClick(e);
            else handleLinkClick();
          }}
        >
          🛒
        </Link>

        {/* Profile dropdown */}
        <div
          className="profile-container"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <FaUserCircle className="profile-icon" />
          {profileOpen && userLoggedIn && (
            <div className="profile-dropdown" onClick={(e) => e.stopPropagation()}>
              <Link to="/profile" onClick={handleLinkClick}>
                Profile
              </Link>
              <Link to="/admin/profile" onClick={handleLinkClick}>
                Admin Profile
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
