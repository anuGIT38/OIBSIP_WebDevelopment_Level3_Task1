import React from "react";
import { Link } from "react-router-dom";
import {
  FaPizzaSlice,
  FaTruck,
  FaClock,
  FaStar,
  FaUtensils,
  FaLeaf,
} from "react-icons/fa";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Delicious Pizza Delivered to Your Doorstep
              </h1>
              <p className="hero-subtitle">
                Fresh ingredients, authentic recipes, and lightning-fast
                delivery. Order your favorite pizza now and enjoy the perfect
                slice!
              </p>
              <div className="hero-buttons">
                <Link to="/menu" className="btn btn-primary btn-large">
                  Order Now
                </Link>
                <Link to="/custom-pizza" className="btn btn-outline btn-large">
                  Build Your Own
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <FaPizzaSlice className="hero-pizza-icon" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaUtensils />
              </div>
              <h3>Fresh Ingredients</h3>
              <p>
                We use only the freshest and highest quality ingredients for
                every pizza.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaTruck />
              </div>
              <h3>Fast Delivery</h3>
              <p>
                Get your pizza delivered hot and fresh in 30 minutes or less.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaClock />
              </div>
              <h3>24/7 Service</h3>
              <p>
                Order anytime, day or night. We're always here to serve you.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaStar />
              </div>
              <h3>Best Quality</h3>
              <p>Rated 4.8/5 by thousands of satisfied customers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Preview Section */}
      <section className="menu-preview">
        <div className="container">
          <h2 className="section-title">Popular Pizzas</h2>
          <div className="menu-grid">
            <div className="menu-item">
              <div className="menu-item-image">
                <img
                  src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300"
                  alt="Margherita"
                />
              </div>
              <div className="menu-item-content">
                <h3>Margherita</h3>
                <p>
                  Classic tomato sauce with mozzarella cheese and fresh basil
                </p>
                <span className="price">₹299</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="menu-item-image">
                <img
                  src="https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300"
                  alt="Pepperoni"
                />
              </div>
              <div className="menu-item-content">
                <h3>Pepperoni</h3>
                <p>Spicy pepperoni with mozzarella cheese and tomato sauce</p>
                <span className="price">₹399</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="menu-item-image">
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300"
                  alt="Veggie Supreme"
                />
              </div>
              <div className="menu-item-content">
                <h3>Veggie Supreme</h3>
                <p>Loaded with fresh vegetables and mozzarella cheese</p>
                <span className="price">₹349</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <Link to="/menu" className="btn btn-primary btn-large">
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Custom Pizza Section */}
      <section className="custom-pizza-section">
        <div className="container">
          <div className="custom-pizza-content">
            <div className="custom-pizza-text">
              <h2>Build Your Perfect Pizza</h2>
              <p>
                Choose from our wide selection of bases, sauces, cheeses, and
                toppings to create your own unique pizza masterpiece. The
                possibilities are endless!
              </p>
              <ul className="custom-features">
                <li>
                  <FaLeaf className="feature-icon" />5 Different Pizza Bases
                </li>
                <li>
                  <FaLeaf className="feature-icon" />5 Delicious Sauces
                </li>
                <li>
                  <FaLeaf className="feature-icon" />
                  Premium Cheeses
                </li>
                <li>
                  <FaLeaf className="feature-icon" />
                  Fresh Vegetables & Meats
                </li>
              </ul>
              <Link to="/custom-pizza" className="btn btn-primary btn-large">
                Start Building
              </Link>
            </div>
            <div className="custom-pizza-image">
              <img
                src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400"
                alt="Custom Pizza"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Order?</h2>
            <p>
              Join thousands of satisfied customers and experience the best
              pizza delivery service!
            </p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-primary btn-large">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-outline btn-large">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
