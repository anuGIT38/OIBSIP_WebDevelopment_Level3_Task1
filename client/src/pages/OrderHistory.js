import React, { useState } from "react";
import { FaClock, FaCheckCircle, FaTruck, FaStar } from "react-icons/fa";
import "./OrderHistory.css";

const OrderHistory = () => {
  const [orders] = useState([
    {
      id: "ORD-001",
      date: "2024-01-15",
      items: [
        { name: "Margherita Pizza", quantity: 2, price: 299 },
        { name: "Spicy Pepperoni", quantity: 1, price: 399 },
      ],
      total: 997,
      status: "delivered",
      rating: 5,
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      items: [
        { name: "Veggie Supreme", quantity: 1, price: 349 },
        { name: "BBQ Paneer", quantity: 1, price: 449 },
      ],
      total: 798,
      status: "delivered",
      rating: 4,
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      items: [{ name: "Custom Pizza", quantity: 1, price: 450 }],
      total: 450,
      status: "delivered",
      rating: 5,
    },
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <FaCheckCircle className="status-icon delivered" />;
      case "in-transit":
        return <FaTruck className="status-icon transit" />;
      default:
        return <FaClock className="status-icon pending" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "delivered":
        return "Delivered";
      case "in-transit":
        return "In Transit";
      default:
        return "Pending";
    }
  };

  return (
    <div className="order-history-page">
      <div className="container">
        <div className="order-header">
          <h1>My Orders</h1>
          <p>Track your past and current orders</p>
        </div>

        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header-row">
                <div>
                  <h3>Order #{order.id}</h3>
                  <p className="order-date">{order.date}</p>
                </div>
                <div className="order-status">
                  {getStatusIcon(order.status)}
                  <span>{getStatusText(order.status)}</span>
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <span>{item.name}</span>
                    <span>x{item.quantity}</span>
                    <span>₹{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="order-total">
                  <strong>Total: ₹{order.total}</strong>
                </div>
                {order.status === "delivered" && (
                  <div className="order-rating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < order.rating ? "star filled" : "star"}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
