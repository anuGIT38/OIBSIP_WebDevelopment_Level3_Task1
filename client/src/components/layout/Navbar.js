import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaPizzaSlice,
  FaUser,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">
            <FaPizzaSlice className="logo-icon" />
            <span>Pizza Delivery</span>
          </Link>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <Link
            to="/"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/menu"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Menu
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/custom-pizza"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Custom Pizza
              </Link>
              <Link
                to="/cart"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaShoppingCart className="nav-icon" />
                Cart
              </Link>
              <div className="nav-dropdown">
                <button className="nav-dropdown-btn">
                  <FaUser className="nav-icon" />
                  {user?.name}
                </button>
                <div className="nav-dropdown-content">
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <Link to="/orders" onClick={() => setIsMenuOpen(false)}>
                    My Orders
                  </Link>
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                    Profile
                  </Link>
                  {user?.role === "admin" && (
                    <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                      Admin Panel
                    </Link>
                  )}
                  <button onClick={handleLogout} className="dropdown-logout">
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button className="navbar-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
