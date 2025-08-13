import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCreditCard,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaShoppingCart,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { getCartItems, clearCart, cartTotal } from "../utils/cart";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    deliveryInstructions: "",
  });

  useEffect(() => {
    const items = getCartItems();
    if (items.length === 0) {
      navigate("/cart");
      return;
    }
    setCartItems(items);
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const subtotal = cartTotal();
  const deliveryFee = subtotal > 500 ? 0 : 49;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryFee + tax;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address.street ||
      !formData.address.city ||
      !formData.address.state ||
      !formData.address.zipCode
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const res = await loadRazorpayScript();
      if (!res) {
        alert("Razorpay SDK failed to load");
        return;
      }

      const options = {
        key: "rzp_test_demo",
        amount: total * 100,
        currency: "INR",
        name: "Pizza Delivery App",
        description: "Delicious Pizza Order",
        handler: async function (response) {
          try {
            clearCart();
            navigate("/order-success", {
              state: {
                orderId: `ORD-${Date.now()}`,
                paymentId: response.razorpay_payment_id,
              },
            });
          } catch (error) {
            console.error("Payment verification failed:", error);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#e74c3c",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <FaShoppingCart className="checkout-icon" />
          <h1>Checkout</h1>
          <p>Complete your order and payment</p>
        </div>

        <div className="checkout-content">
          <div className="checkout-form-section">
            <div className="form-section">
              <h2>
                <FaUser /> Personal Information
              </h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h2>
                <FaMapMarkerAlt /> Delivery Address
              </h2>
              <div className="form-group">
                <label>Street Address *</label>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <input
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>ZIP Code *</label>
                <input
                  type="text"
                  name="address.zipCode"
                  value={formData.address.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Delivery Instructions</label>
                <textarea
                  name="deliveryInstructions"
                  value={formData.deliveryInstructions}
                  onChange={handleInputChange}
                  placeholder="Any special instructions for delivery..."
                  rows="3"
                />
              </div>
            </div>
          </div>

          <div className="order-summary-section">
            <div className="order-summary-card">
              <h2>Order Summary</h2>

              <div className="order-items">
                {cartItems.map((item, index) => (
                  <div key={index} className="order-item">
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <span>Qty: {item.count}</span>
                    </div>
                    <div className="item-price">₹{item.price * item.count}</div>
                  </div>
                ))}
              </div>

              <div className="order-totals">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="total-row">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                </div>
                <div className="total-row">
                  <span>Tax (5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="total-row total">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                className="pay-button"
                onClick={handlePayment}
                disabled={loading}
              >
                <FaCreditCard />
                {loading ? "Processing..." : `Pay ₹${total.toFixed(2)}`}
              </button>

              <div className="payment-info">
                <p>🔒 Secure payment powered by Razorpay</p>
                <p>💳 Accepts all major credit/debit cards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
