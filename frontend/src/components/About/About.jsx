import React from "react";
import "./About.css";
import { FaAward, FaStar, FaHeart, FaUtensils } from "react-icons/fa";

import chef1 from "../../assest/Chef/IA4.png";
import chef2 from "../../assest/Chef/IA5.png";
import chef3 from "../../assest/Chef/IA6.png";

const chefs = [
  {
    name: "Marco Yansen",
    role: "Executive Chef",
    img: chef1,
    desc: "Holder of 3 Michelin stars, Marco specializes in refined Italian cuisine with over 20 years of global culinary experience.",
  },
  {
    name: "Amit Singh",
    role: "Pastry Chef",
    img: chef2,
    desc: "World Baking Champion renowned for his innovative French desserts and artistic pastry creations that delight every palate.",
  },
  {
    name: "Akash Trivedi",
    role: "Sushi Chef",
    img: chef3,
    desc: "A fifth-generation sushi master, Akash blends traditional techniques with modern artistry to craft authentic Japanese delicacies.",
  },
];

export default function About() {
  return (
    <>
      <section className="about-section" id="about">
        <h2 className="section-title">
          Meet Our <span className="highlight"> Master Chefs</span>
        </h2>

        <p className="section-subtitle">
          Behind every exquisite dish lies passion, precision, and creativity.
          Discover the masters who bring our menu to life.
        </p>

        {/* --- Stats Bar --- */}
        <div className="about-stats">
          <div className="stat-box">
            <FaAward className="stat-icon" />
            <h3>25+</h3>
            <p>International Awards</p>
          </div>
          <div className="stat-box">
            <FaUtensils className="stat-icon" />
            <h3>150+</h3>
            <p>Signature Dishes</p>
          </div>
          <div className="stat-box">
            <FaHeart className="stat-icon" />
            <h3>10K+</h3>
            <p>Happy Customers</p>
          </div>
          <div className="stat-box">
            <FaStar className="stat-icon" />
            <h3>4.9</h3>
            <p>Average Rating</p>
          </div>
        </div>

        {/* --- Chef Cards --- */}
        <div className="cards-grid">
          {chefs.map((chef, index) => (
            <article className="card" key={index}>
              <div className="card-image">
                <img src={chef.img} alt={chef.name} />
              </div>

              <div className="card-body">
                <h3 className="card-name">{chef.name}</h3>
                <p className="card-role">{chef.role}</p>
                <p className="card-desc">{chef.desc}</p>
              </div>
            </article>
          ))}
        </div>

        {/* --- Story Section --- */}
        <div className="about-story">
          <h3 className="story-title">Our Philosophy</h3>
          <p className="story-text">
            At <strong>FoodyFly</strong>, cooking is more than a craft — it’s an art.
            Our chefs infuse passion into every plate, blending global flavors with
            local inspiration. From hand-picked ingredients to artistic presentation,
            we believe that great food tells a story — and every meal you enjoy with us
            is part of that journey.
          </p>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="footer">
        <div className="footer-columns">
          <div className="footer-about">
            <h3>FoodyFly</h3>
            <p>
              Where culinary artistry meets modern lifestyle. Experience
              handcrafted dishes made with care, right here in Bangladesh.
            </p>
            <div className="subscribe">
              <input type="email" placeholder="Enter your email" />
              <button>Join Now</button>
            </div>
          </div>

          <div className="footer-nav">
            <h4>Quick Links</h4>
            <ul>
              <li>Home</li>
              <li>Menu</li>
              <li>About Us</li>
              <li>Contact</li>
            </ul>
          </div>

          <div className="footer-social">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <i className="fa-brands fa-facebook-f"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-youtube"></i>
            </div>
          </div>
        </div>

        <p className="footer-copy">
          © 2025 FoodyFly. All rights reserved. | Designed by Bosrin
        </p>
      </footer>
    </>
  );
}
