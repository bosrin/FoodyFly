import React from "react";
import "./Hero.css";

// ---------- HERO IMAGES ----------
import heroImg from "../../assest/BannerImage.png";
import food1 from "../../assest/Lunch/ChickenCaesarSalad.png";
import food2 from "../../assest/Lunch/ChickenChargha.png";
import food3 from "../../assest/Dinner/DesiChowmein.png";
import food4 from "../../assest/Dinner/EggplantParmesan.png";
import chefImg from "../../assest/AboutImage.png";

export default function HeroSection() {
  return (
    <div className="home-page">
      {/* ---------- HERO SECTION ---------- */}
      <section className="hero-section">
        <div className="hero-left">
          <h1 className="hero-title">
            Passionate About <br />
            <span>Great Food & Service</span>
          </h1>
          <p className="hero-subtext">
            Enjoy delicious, chef-crafted meals made with care and served with
            excellence — every single time.
          </p>

          <div className="search-box">
            <input
              type="text"
              placeholder="Discover your next favorite meal..."
            />
            <button>Search</button>
          </div>
        </div>

        <div className="hero-right">
          <div className="center-image">
            <img src={heroImg} alt="Center Food" />
          </div>

          <div className="rotating-wrapper">
            <div className="orbit orbit1">
              <img src={food1} alt="Food 1" />
            </div>
            <div className="orbit orbit2">
              <img src={food2} alt="Food 2" />
            </div>
            <div className="orbit orbit3">
              <img src={food3} alt="Food 3" />
            </div>
            <div className="orbit orbit4">
              <img src={food4} alt="Food 4" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- TODAY'S SPECIAL OFFERS ---------- */}
      <section className="special-offers">
        <h2 className="offers-section-title">Today’s Special Offers</h2>
        <p className="offers-section-sub">
          Taste the extraordinary with our chef’s signature creations — made
          fresh in Bangladesh.
        </p>

        <div className="offers-grid">
          {[food4, food2, food3].map((img, index) => (
            <div className="offer-card" key={index}>
              <img src={img} alt={`Special Dish ${index + 1}`} />
              <h3>Delicious Meal {index + 1}</h3>
              <p>Experience the true flavor of perfection.</p>
              <div className="price-add">
                <span>৳{450 * (index + 1)}</span>
                <button>+ Add</button>
              </div>
            </div>
          ))}
        </div>

        <button className="show-more-btn">Show More</button>
      </section>

      {/* ---------- EPICUREAN ELEGANCE ---------- */}
      <section className="elegance">
        <h2 className="elegance-section-title">Epicurean Excellence</h2>

        <div className="elegance-left">
          <div className="image-card">
            <img src={chefImg} alt="Chef with Dish" />
          </div>
        </div>

        <div className="elegance-right">
          <blockquote className="elegance-quote">
            "In our kitchen, passion meets precision. We don’t just prepare
            meals — we create culinary experiences that stay with you long
            after the last bite."
          </blockquote>

          <div className="features">
            <div className="feature-box">
              <div className="icon lightning">⚡</div>
              <h4>Instant Ordering</h4>
              <p>Seamless digital experience</p>
            </div>
            <div className="feature-box">
              <div className="icon clock">⏰</div>
              <h4>Always Open</h4>
              <p>24/7 premium service</p>
            </div>
            <div className="feature-box">
              <div className="icon calendar">🎫</div>
              <h4>Exclusive Booking</h4>
              <p>Priority reservations</p>
            </div>
            <div className="feature-box">
              <div className="icon flame">🔥</div>
              <h4>Signature Dishes</h4>
              <p>Chef’s special creations</p>
            </div>
          </div>
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
    </div>
  );
}
