import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLogin = localStorage.getItem("foodyfly_loggedIn");
    if (savedLogin === "true") setUserLoggedIn(true);
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const handleLogin = () => {
    setUserLoggedIn(true);
    localStorage.setItem("foodyfly_loggedIn", "true");
    navigate("/account");
  };

  const handleLogout = () => {
    setUserLoggedIn(false);
    localStorage.removeItem("foodyfly_loggedIn");
    alert("🔒 Logged out successfully!");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        <span className="chef-hat">👨‍🍳</span>
        <h1 className="logo-text">FoodyFly</h1>
      </div>

      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li>
          <Link to="/" onClick={handleLinkClick}>
            Home
          </Link>
        </li>

        <li>
          <Link to="/menu" onClick={handleLinkClick}>
            Menu
          </Link>
        </li>

        <li>
          <Link to="/about" onClick={handleLinkClick}>
            About
          </Link>
        </li>

        <li>
          <Link to="/contact" onClick={handleLinkClick}>
            Contact
          </Link>
        </li>
      </ul>

      <div className="nav-actions">
        <Link
          to="/cart"
          className="cart-link"
          onClick={handleLinkClick}
        >
          🛒
        </Link>

        <div
          className="profile-container"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <FaUserCircle className="profile-icon" />
          {profileOpen && (
            <div className="profile-dropdown">
              <Link to="/profile" onClick={handleLinkClick}>
                Profile
              </Link>
              {userLoggedIn ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <button onClick={handleLogin}>Login</button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
