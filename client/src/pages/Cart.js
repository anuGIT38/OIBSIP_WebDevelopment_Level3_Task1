import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import {
  getCartItems,
  addItemToCart,
  removeItemFromCart,
  clearCart,
  cartTotal,
} from "../utils/cart";
import "./Cart.css";

const Cart = () => {
  const [items, setItems] = useState([]);

  const reload = () => setItems(getCartItems());

  useEffect(() => {
    reload();
  }, []);

  const increment = (id) => {
    const item = items.find((i) => i.id === id);
    if (item) addItemToCart(item);
    reload();
  };

  const decrement = (id) => {
    removeItemFromCart(id);
    reload();
  };

  const empty = () => {
    clearCart();
    reload();
  };

  const total = cartTotal();

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <FaShoppingCart className="cart-icon" />
          <h1>Your Cart</h1>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <Link to="/menu" className="continue-btn">
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="cart-grid">
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400";
                    }}
                  />
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p>₹{item.price}</p>
                  </div>
                  <div className="item-qty">
                    <button onClick={() => decrement(item.id)}>
                      <FaMinus />
                    </button>
                    <span>{item.count}</span>
                    <button onClick={() => increment(item.id)}>
                      <FaPlus />
                    </button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => decrement(item.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-summary-card">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <strong>₹{total}</strong>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <strong>₹49</strong>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <strong>₹{total + 49}</strong>
              </div>
              <Link to="/checkout" className="checkout-btn">
                Proceed to Checkout
              </Link>
              <button className="clear-btn" onClick={empty}>
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
