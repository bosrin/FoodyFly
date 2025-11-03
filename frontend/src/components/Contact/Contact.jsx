import React, { useState, useEffect, useCallback } from "react";
import "./Contact.css";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobeAsia,
  FaUtensils,
  FaUserAlt,
  FaHome,
} from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    dish: "",
    message: "",
  });

  const [status, setStatus] = useState(""); // "sending" | "sent" | ""

  // Wrap handleSubmit in useCallback so it is stable across renders
  const handleSubmit = useCallback(() => {
    if (status === "sending") return; // Prevent double sends
    setStatus("sending");

    // Simulate backend call
    setTimeout(() => {
      console.log("✅ Auto-sent message:", formData);
      setStatus("sent");
      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
        dish: "",
        message: "",
      });

      // Hide success after few seconds
      setTimeout(() => setStatus(""), 4000);
    }, 1500);
  }, [formData, status]);

  // Auto-send logic
  useEffect(() => {
    const { name, phone, email, address, dish, message } = formData;

    // Check if all fields are filled
    if (name && phone && email && address && dish && message) {
      const timer = setTimeout(() => handleSubmit(), 2000);
      return () => clearTimeout(timer);
    }
  }, [formData, handleSubmit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <section className="contact-section" id="contact">
        <h1 className="contact-title">Connect With Us</h1>

        <div className="contact-container">
          {/* Left Side Info */}
          <div className="contact-info">
            <div className="contact-card">
              <div className="icon">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h3>Our Headquarter</h3>
                <p>Road 12, Dhanmondi, Dhaka 1209, Bangladesh</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="icon green">
                <FaPhoneAlt />
              </div>
              <div>
                <h3>Contact Numbers</h3>
                <p>
                  <FaGlobeAsia /> +880 1777-654321
                </p>
              </div>
            </div>

            <div className="contact-card">
              <div className="icon orange">
                <FaEnvelope />
              </div>
              <div>
                <h3>Email Address</h3>
                <p>foodyfly@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="contact-form">
            <form>
              <label>Full Name</label>
              <div className="input-box">
                <FaUserAlt />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>

              <label>Phone Number</label>
              <div className="input-box">
                <FaPhoneAlt />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+880 1XXXXXXXXX"
                />
              </div>

              <label>Email Address</label>
              <div className="input-box">
                <FaEnvelope />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                />
              </div>

              <label>Address</label>
              <div className="input-box">
                <FaHome />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your delivery address"
                />
              </div>

              <label>Dish Name</label>
              <div className="input-box">
                <FaUtensils />
                <input
                  type="text"
                  name="dish"
                  value={formData.dish}
                  onChange={handleChange}
                  placeholder="Enter dish name (e.g., Chicken Biryani)"
                />
              </div>

              <label>Your Query</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
              />

              <button
                type="button"
                onClick={handleSubmit}
                className="btn"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>

              {status === "sent" && (
                <p className="success-text">✅ Message Sent Successfully!</p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
