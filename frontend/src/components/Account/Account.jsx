import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaArrowLeft,
  FaUserPlus,
  FaUserShield,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Account.css";

export default function Account() {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [signinInfo, setSigninInfo] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");

  const API_URL = "http://localhost:5000/api"; // backend URL

  // ✅ Admin constants
  const ADMIN_USERNAME = "FoodyFlyAdmin";
  const ADMIN_EMAIL = "admin@foodyfly.com";
  const ADMIN_PASSWORD = "admin123";

  // 🧾 Handle Sign Up
  const handleSignUp = async () => {
    const { username, email, password, role } = signupInfo;

    if (!username || !email || !password || !role) {
      setError("All fields including role are required.");
      alert("⚠️ All fields including role are required.");
      return;
    }

    // ❌ Prevent admin signup
    if (role === "admin") {
      setError("Admin account cannot be created manually.");
      alert("🚫 Admin account cannot be created manually.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");

      setNotification(`✅ Signup successful as ${role}!`);
      setError("");
      alert(`✅ Signup successful as ${role}!`);
      setIsSignUp(false);
      setSignupInfo({ username: "", email: "", password: "", role: "" });
    } catch (err) {
      setError(err.message);
      alert(`❌ Signup failed: ${err.message}`);
    }
  };

  // 🔐 Handle Sign In
  const handleSignIn = async () => {
    const { email, password, role } = signinInfo;

    if (!email || !password || !role) {
      setError("Please fill all fields and select your role.");
      alert("⚠️ Please fill all fields and select your role.");
      return;
    }

    try {
      let endpoint = "";

      if (role === "admin") {
        // ✅ Verify admin credentials locally
        if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
          setError("Only FoodyFlyAdmin can log in as admin.");
          alert("🚫 Only FoodyFlyAdmin can log in as admin.");
          return;
        }
        if (password !== ADMIN_PASSWORD) {
          setError("Invalid admin credentials.");
          alert("❌ Invalid admin credentials.");
          return;
        }

        endpoint = `${API_URL}/admin/login`;
      } else {
        endpoint = `${API_URL}/user/login`;
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      // 🗝️ Save credentials
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", role);
      if (role === "admin") localStorage.setItem("adminName", ADMIN_USERNAME);

      setNotification(`Welcome back, ${role}!`);
      setError("");
      alert(`🎉 Welcome back, ${role}!`);

      setTimeout(() => {
        navigate(role === "admin" ? "/admin/dashboard" : "/");
      }, 1000);
    } catch (err) {
      setError(err.message);
      setNotification("");
      alert(`❌ Login failed: ${err.message}`);
    }
  };

  return (
    <div className="account-container">
      <div className="account-box">
        <h2 className="account-title">
          {isSignUp ? "Create Account" : "FoodyFly Login"}
        </h2>

        {error && <p className="error-msg">{error}</p>}
        {notification && <p className="notification-msg">{notification}</p>}

        {isSignUp ? (
          <>
            {/* Sign Up */}
            <div className="input-box">
              <FaUser className="icon" />
              <input
                type="text"
                placeholder="Username"
                value={signupInfo.username}
                onChange={(e) =>
                  setSignupInfo({ ...signupInfo, username: e.target.value })
                }
              />
            </div>

            <div className="input-box">
              <FaEnvelope className="icon" />
              <input
                type="email"
                placeholder="Email"
                value={signupInfo.email}
                onChange={(e) =>
                  setSignupInfo({ ...signupInfo, email: e.target.value })
                }
              />
            </div>

            <div className="input-box">
              <FaLock className="icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={signupInfo.password}
                onChange={(e) =>
                  setSignupInfo({ ...signupInfo, password: e.target.value })
                }
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁️
              </span>
            </div>

            <div className="role-select">
              <FaUserShield className="icon" />
              <select
                value={signupInfo.role}
                onChange={(e) =>
                  setSignupInfo({ ...signupInfo, role: e.target.value })
                }
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button className="main-btn" onClick={handleSignUp}>
              Sign Up
            </button>

            <p className="toggle-link" onClick={() => setIsSignUp(false)}>
              <FaArrowLeft /> Back To Login
            </p>
          </>
        ) : (
          <>
            {/* Sign In */}
            <div className="input-box">
              <FaEnvelope className="icon" />
              <input
                type="email"
                placeholder="Email"
                value={signinInfo.email}
                onChange={(e) =>
                  setSigninInfo({ ...signinInfo, email: e.target.value })
                }
              />
            </div>

            <div className="input-box">
              <FaLock className="icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={signinInfo.password}
                onChange={(e) =>
                  setSigninInfo({ ...signinInfo, password: e.target.value })
                }
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁️
              </span>
            </div>

            <div className="role-select">
              <FaUserShield className="icon" />
              <select
                value={signinInfo.role}
                onChange={(e) =>
                  setSigninInfo({ ...signinInfo, role: e.target.value })
                }
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button className="main-btn" onClick={handleSignIn}>
              Sign In →
            </button>

            <p className="toggle-link" onClick={() => setIsSignUp(true)}>
              <FaUserPlus /> Create New Account
            </p>
          </>
        )}
      </div>
    </div>
  );
}
