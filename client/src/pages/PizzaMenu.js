import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaPizzaSlice,
  FaSearch,
  FaFilter,
  FaShoppingCart,
  FaStar,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import "./PizzaMenu.css";
import {
  addItemToCart,
  removeItemFromCart,
  getCartItems,
  cartItemCount,
  cartTotal,
} from "../utils/cart";

const PizzaMenu = () => {
  const [pizzas, setPizzas] = useState([]);
  const [filteredPizzas, setFilteredPizzas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);

  // Sample pizza data
  const pizzaData = [
    {
      id: 1,
      name: "Margherita",
      description:
        "Classic tomato sauce with mozzarella cheese and fresh basil",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400",
      category: "vegetarian",
      rating: 4.8,
      spicy: false,
      popular: true,
      ingredients: ["Tomato Sauce", "Mozzarella", "Fresh Basil"],
    },
    {
      id: 2,
      name: "Pepperoni",
      description: "Spicy pepperoni with mozzarella cheese and tomato sauce",
      price: 399,
      image:
        "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400",
      category: "non-vegetarian",
      rating: 4.9,
      spicy: true,
      popular: true,
      ingredients: ["Tomato Sauce", "Mozzarella", "Pepperoni"],
    },
    {
      id: 3,
      name: "Veggie Supreme",
      description: "Loaded with fresh vegetables and mozzarella cheese",
      price: 349,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
      category: "vegetarian",
      rating: 4.7,
      spicy: false,
      popular: false,
      ingredients: [
        "Tomato Sauce",
        "Mozzarella",
        "Bell Peppers",
        "Mushrooms",
        "Onions",
        "Olives",
      ],
    },
    {
      id: 4,
      name: "BBQ Paneer",
      description: "BBQ sauce with grilled paneer and red onions",
      price: 449,
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D",
      category: "vegetarian",
      rating: 4.6,
      spicy: false,
      popular: false,
      ingredients: ["BBQ Sauce", "Mozzarella", "Grilled Paneer", "Red Onions"],
    },
    {
      id: 5,
      name: "Hawaiian",
      description: "Ham and pineapple with mozzarella cheese",
      price: 379,
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
      category: "non-vegetarian",
      rating: 4.5,
      spicy: false,
      popular: false,
      ingredients: ["Tomato Sauce", "Mozzarella", "Ham", "Pineapple"],
    },
    {
      id: 6,
      name: "Mushroom Delight",
      description: "Fresh mushrooms with garlic and herbs",
      price: 329,
      image:
        "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=800&auto=format&fit=crop&q=60",
      category: "vegetarian",
      rating: 4.4,
      spicy: false,
      popular: false,
      ingredients: [
        "Tomato Sauce",
        "Mozzarella",
        "Mushrooms",
        "Garlic",
        "Herbs",
      ],
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPizzas(pizzaData);
      setFilteredPizzas(pizzaData);
      setLoading(false);
    }, 1000);
  }, []);

  // Hydrate cart from localStorage
  useEffect(() => {
    const items = getCartItems();
    const map = items.reduce((acc, it) => {
      acc[it.id] = it.count;
      return acc;
    }, {});
    setCart(map);
  }, []);

  useEffect(() => {
    let filtered = pizzas;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (pizza) =>
          pizza.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pizza.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (pizza) => pizza.category === selectedCategory
      );
    }

    setFilteredPizzas(filtered);
  }, [searchTerm, selectedCategory, pizzas]);

  const addToCart = (pizzaId) => {
    const pizza = pizzas.find((p) => p.id === pizzaId);
    addItemToCart({
      id: pizza.id,
      name: pizza.name,
      price: pizza.price,
      image: pizza.image,
    });
    setCart((prev) => ({ ...prev, [pizzaId]: (prev[pizzaId] || 0) + 1 }));
  };

  const removeFromCart = (pizzaId) => {
    removeItemFromCart(pizzaId);
    setCart((prev) => {
      const next = { ...prev };
      if (next[pizzaId] > 1) next[pizzaId] -= 1;
      else delete next[pizzaId];
      return next;
    });
  };

  const getCartItemCount = () => Object.values(cart).reduce((t, c) => t + c, 0);

  const getCartTotal = () => {
    return getCartItems().reduce((sum, it) => sum + it.price * it.count, 0);
  };

  if (loading) {
    return (
      <div className="menu-page">
        <div className="loading-container">
          <FaPizzaSlice className="loading-icon" />
          <p>Loading delicious pizzas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-page">
      <div className="menu-header">
        <div className="container">
          <div className="menu-header-content">
            <div className="menu-title">
              <FaPizzaSlice className="menu-icon" />
              <h1>Our Pizza Menu</h1>
              <p>Discover our delicious selection of handcrafted pizzas</p>
            </div>
            <div className="menu-actions">
              <div className="search-container">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search pizzas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              <div className="filter-container">
                <FaFilter className="filter-icon" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Categories</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="non-vegetarian">Non-Vegetarian</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="menu-content">
        <div className="container">
          {filteredPizzas.length === 0 ? (
            <div className="no-results">
              <FaPizzaSlice className="no-results-icon" />
              <h2>No pizzas found</h2>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="pizza-grid">
              {filteredPizzas.map((pizza) => (
                <div key={pizza.id} className="pizza-card">
                  <div className="pizza-image">
                    <img
                      src={pizza.image}
                      alt={pizza.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1548365328-9f547fb0953c?w=800&auto=format&fit=crop&q=60";
                      }}
                    />
                    {pizza.popular && (
                      <span className="popular-badge">Popular</span>
                    )}
                    {pizza.spicy && <span className="spicy-badge">Spicy</span>}
                  </div>
                  <div className="pizza-content">
                    <div className="pizza-header">
                      <h3>{pizza.name}</h3>
                      <div className="pizza-rating">
                        <FaStar className="star-icon" />
                        <span>{pizza.rating}</span>
                      </div>
                    </div>
                    <p className="pizza-description">{pizza.description}</p>
                    <div className="pizza-ingredients">
                      <strong>Ingredients:</strong>{" "}
                      {pizza.ingredients.join(", ")}
                    </div>
                    <div className="pizza-footer">
                      <div className="pizza-price">
                        <span className="price-amount">₹{pizza.price}</span>
                      </div>
                      <div className="pizza-actions">
                        {cart[pizza.id] ? (
                          <div className="quantity-controls">
                            <button
                              onClick={() => removeFromCart(pizza.id)}
                              className="quantity-btn"
                            >
                              <FaMinus />
                            </button>
                            <span className="quantity">{cart[pizza.id]}</span>
                            <button
                              onClick={() => addToCart(pizza.id)}
                              className="quantity-btn"
                            >
                              <FaPlus />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(pizza.id)}
                            className="add-to-cart-btn"
                          >
                            <FaShoppingCart />
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {getCartItemCount() > 0 && (
        <div className="cart-summary">
          <div className="container">
            <div className="cart-content">
              <div className="cart-info">
                <span className="cart-count">{getCartItemCount()} items</span>
                <span className="cart-total">Total: ₹{getCartTotal()}</span>
              </div>
              <Link to="/cart" className="view-cart-btn">
                <FaShoppingCart />
                View Cart
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PizzaMenu;
