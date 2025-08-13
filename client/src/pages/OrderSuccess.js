import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaCheckCircle, FaHome, FaList, FaDownload } from "react-icons/fa";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, paymentId } = location.state || {};

  if (!orderId) {
    navigate("/");
    return null;
  }

  const downloadReceipt = () => {
    const receiptContent = `
      PIZZA DELIVERY APP - RECEIPT
      
      Order ID: ${orderId}
      Payment ID: ${paymentId}
      Date: ${new Date().toLocaleDateString()}
      Time: ${new Date().toLocaleTimeString()}
      
      Status: Payment Successful ✅
      
      Thank you for your order!
      We'll start preparing your delicious pizza right away.
      
      Track your order in your dashboard.
    `;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${orderId}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="order-success-page">
      <div className="container">
        <div className="success-card">
          <div className="success-icon">
            <FaCheckCircle />
          </div>

          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your order. We're preparing your delicious pizza!</p>

          <div className="order-details">
            <div className="detail-row">
              <span>Order ID:</span>
              <strong>{orderId}</strong>
            </div>
            <div className="detail-row">
              <span>Payment ID:</span>
              <strong>{paymentId}</strong>
            </div>
            <div className="detail-row">
              <span>Status:</span>
              <span className="status-success">Payment Successful</span>
            </div>
            <div className="detail-row">
              <span>Date:</span>
              <strong>{new Date().toLocaleDateString()}</strong>
            </div>
          </div>

          <div className="next-steps">
            <h3>What's Next?</h3>
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Order Confirmed</h4>
                  <p>We've received your order and payment</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>In the Kitchen</h4>
                  <p>Our chefs are preparing your pizza</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Out for Delivery</h4>
                  <p>Your pizza is on its way to you</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>Delivered</h4>
                  <p>Enjoy your delicious pizza!</p>
                </div>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <Link to="/dashboard" className="btn btn-primary">
              <FaList /> Track Order
            </Link>
            <button onClick={downloadReceipt} className="btn btn-outline">
              <FaDownload /> Download Receipt
            </button>
            <Link to="/" className="btn btn-outline">
              <FaHome /> Back to Home
            </Link>
          </div>

          <div className="contact-info">
            <p>Have questions about your order?</p>
            <p>
              Contact us at <strong>+1 (555) 123-4567</strong> or{" "}
              <strong>support@pizzadelivery.com</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
