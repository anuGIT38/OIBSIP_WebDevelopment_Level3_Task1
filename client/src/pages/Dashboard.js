import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaPizzaSlice,
  FaShoppingCart,
  FaHistory,
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaStar,
  FaClock,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [recentOrders, setRecentOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    averageRating: 0,
    favoritePizza: "Margherita",
  });

  // Sample data
  const sampleOrders = [
    {
      id: 1,
      orderNumber: "ORD-2024-001",
      items: ["Margherita", "Pepperoni"],
      total: 698,
      status: "delivered",
      date: "2024-01-15",
      rating: 5,
      deliveryAddress: "123 Main St, City, State 12345",
    },
    {
      id: 2,
      orderNumber: "ORD-2024-002",
      items: ["Veggie Supreme"],
      total: 349,
      status: "preparing",
      date: "2024-01-20",
      rating: null,
      deliveryAddress: "123 Main St, City, State 12345",
    },
    {
      id: 3,
      orderNumber: "ORD-2024-003",
      items: ["BBQ Chicken", "Hawaiian"],
      total: 828,
      status: "delivered",
      date: "2024-01-18",
      rating: 4,
      deliveryAddress: "123 Main St, City, State 12345",
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRecentOrders(sampleOrders);
      setStats({
        totalOrders: 15,
        totalSpent: 5247,
        averageRating: 4.6,
        favoritePizza: "Margherita",
      });
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "#27ae60";
      case "preparing":
        return "#f39c12";
      case "out_for_delivery":
        return "#3498db";
      default:
        return "#95a5a6";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <FaCheckCircle />;
      case "preparing":
        return <FaPizzaSlice />;
      case "out_for_delivery":
        return <FaTruck />;
      default:
        return <FaClock />;
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="container">
          <div className="welcome-section">
            <FaPizzaSlice className="welcome-icon" />
            <div className="welcome-text">
              <h1>Welcome back, {user?.name || "Pizza Lover"}! 🍕</h1>
              <p>Here's what's happening with your pizza orders</p>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="container">
          {/* Quick Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <FaHistory />
              </div>
              <div className="stat-content">
                <h3>{stats.totalOrders}</h3>
                <p>Total Orders</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <FaShoppingCart />
              </div>
              <div className="stat-content">
                <h3>₹{stats.totalSpent}</h3>
                <p>Total Spent</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <FaStar />
              </div>
              <div className="stat-content">
                <h3>{stats.averageRating}</h3>
                <p>Average Rating</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <FaPizzaSlice />
              </div>
              <div className="stat-content">
                <h3>{stats.favoritePizza}</h3>
                <p>Favorite Pizza</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="actions-grid">
              <Link to="/menu" className="action-card">
                <FaPizzaSlice className="action-icon" />
                <h3>Order Pizza</h3>
                <p>Browse our delicious menu</p>
              </Link>
              <Link to="/custom-pizza" className="action-card">
                <FaPizzaSlice className="action-icon" />
                <h3>Build Your Own</h3>
                <p>Create a custom pizza</p>
              </Link>
              <Link to="/orders" className="action-card">
                <FaHistory className="action-icon" />
                <h3>Order History</h3>
                <p>View all your orders</p>
              </Link>
              <Link to="/profile" className="action-card">
                <FaUser className="action-icon" />
                <h3>Update Profile</h3>
                <p>Manage your account</p>
              </Link>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="recent-orders">
            <div className="section-header">
              <h2>Recent Orders</h2>
              <Link to="/orders" className="view-all-link">
                View All Orders
              </Link>
            </div>
            <div className="orders-grid">
              {recentOrders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-info">
                      <h3>{order.orderNumber}</h3>
                      <p className="order-date">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div
                      className="order-status"
                      style={{ color: getStatusColor(order.status) }}
                    >
                      {getStatusIcon(order.status)}
                      <span>
                        {order.status.replace("_", " ").toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="order-items">
                    <p>
                      <strong>Items:</strong> {order.items.join(", ")}
                    </p>
                    <p>
                      <strong>Total:</strong> ₹{order.total}
                    </p>
                  </div>
                  <div className="order-address">
                    <FaMapMarkerAlt className="address-icon" />
                    <span>{order.deliveryAddress}</span>
                  </div>
                  {order.rating && (
                    <div className="order-rating">
                      <FaStar className="star-icon" />
                      <span>{order.rating}/5</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* User Info */}
          <div className="user-info-section">
            <h2>Your Information</h2>
            <div className="user-info-card">
              <div className="user-avatar">
                <FaUser className="avatar-icon" />
              </div>
              <div className="user-details">
                <h3>{user?.name || "User Name"}</h3>
                <div className="user-contact">
                  <div className="contact-item">
                    <FaEnvelope className="contact-icon" />
                    <span>{user?.email || "user@example.com"}</span>
                  </div>
                  <div className="contact-item">
                    <FaPhone className="contact-icon" />
                    <span>{user?.phone || "+91 98765 43210"}</span>
                  </div>
                </div>
                <Link to="/profile" className="edit-profile-btn">
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
