import React, { useMemo, useState } from "react";
import { FaPizzaSlice, FaPlus } from "react-icons/fa";
import { addItemToCart } from "../utils/cart";
import { useNavigate } from "react-router-dom";
import "./CustomPizza.css";

const BASES = [
  { id: "thin", name: "Thin Crust", price: 80, stock: 45 },
  { id: "regular", name: "Regular", price: 60, stock: 15 },
  { id: "cheese_burst", name: "Cheese Burst", price: 120, stock: 30 },
  { id: "stuffed", name: "Stuffed Crust", price: 100, stock: 25 },
  { id: "gluten_free", name: "Gluten Free", price: 150, stock: 20 },
];
const SAUCES = [
  { id: "tomato", name: "Tomato", price: 0, stock: 8 },
  { id: "bbq", name: "BBQ", price: 20, stock: 12 },
  { id: "pesto", name: "Pesto", price: 30, stock: 15 },
  { id: "white", name: "White Sauce", price: 25, stock: 10 },
  { id: "buffalo", name: "Buffalo", price: 35, stock: 8 },
];
const CHEESES = [
  { id: "mozz", name: "Mozzarella", price: 40, stock: 5 },
  { id: "cheddar", name: "Cheddar", price: 40, stock: 12 },
  { id: "parmesan", name: "Parmesan", price: 60, stock: 8 },
  { id: "gouda", name: "Gouda", price: 50, stock: 6 },
  { id: "blue", name: "Blue Cheese", price: 70, stock: 4 },
];
const TOPPINGS = [
  { id: "onion", name: "Onion", price: 15, stock: 18 },
  { id: "capsicum", name: "Capsicum", price: 20, stock: 22 },
  { id: "mushroom", name: "Mushroom", price: 25, stock: 22 },
  { id: "paneer", name: "Paneer", price: 30, stock: 15 },
  { id: "corn", name: "Sweet Corn", price: 20, stock: 25 },
  { id: "olives", name: "Olives", price: 25, stock: 20 },
  { id: "tomatoes", name: "Fresh Tomatoes", price: 15, stock: 30 },
  { id: "jalapenos", name: "Jalapeños", price: 20, stock: 12 },
  { id: "pineapple", name: "Pineapple", price: 25, stock: 18 },
  { id: "chicken", name: "Grilled Chicken", price: 40, stock: 10 },
];

const CustomPizza = () => {
  const [base, setBase] = useState(BASES[0].id);
  const [sauce, setSauce] = useState(SAUCES[0].id);
  const [cheese, setCheese] = useState([CHEESES[0].id]);
  const [toppings, setToppings] = useState(["onion", "capsicum"]);
  const navigate = useNavigate();
  const price = useMemo(() => {
    const basePrice = BASES.find((b) => b.id === base)?.price || 0;
    const saucePrice = SAUCES.find((s) => s.id === sauce)?.price || 0;
    const cheesePrice = cheese.reduce(
      (sum, c) => sum + (CHEESES.find((x) => x.id === c)?.price || 0),
      0
    );
    const toppingsPrice = toppings.reduce(
      (sum, t) => sum + (TOPPINGS.find((x) => x.id === t)?.price || 0),
      0
    );
    return 199 + basePrice + saucePrice + cheesePrice + toppingsPrice;
  }, [base, sauce, cheese, toppings]);

  const toggleCheese = (id) => {
    setCheese((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleTopping = (id) => {
    setToppings((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const addToCart = () => {
    const name = `Custom Pizza (${BASES.find((b) => b.id === base)?.name})`;
    addItemToCart({
      id: `custom-${Date.now()}`,
      name,
      price,
      image:
        "https://images.unsplash.com/photo-1548365328-9f547fb0953c?w=800&auto=format&fit=crop&q=60",
    });
    navigate("/cart");
  };

  return (
    <div className="custom-page">
      <div className="container">
        <div className="custom-header">
          <FaPizzaSlice className="custom-icon" />
          <div>
            <h1>Build Your Own Pizza</h1>
            <p>Choose your favourites and we’ll craft the perfect pie</p>
          </div>
        </div>

        <div className="custom-grid">
          <div className="custom-section">
            <h3>Base</h3>
            <div className="options">
              {BASES.map((b) => (
                <label
                  key={b.id}
                  className={`option ${base === b.id ? "active" : ""} ${
                    b.stock <= 5 ? "low-stock" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="base"
                    checked={base === b.id}
                    onChange={() => setBase(b.id)}
                    disabled={b.stock <= 0}
                  />
                  <span>{b.name}</span>
                  <em>+₹{b.price}</em>
                  {b.stock <= 5 && (
                    <span className="stock-warning">Low Stock: {b.stock}</span>
                  )}
                </label>
              ))}
            </div>
          </div>

          <div className="custom-section">
            <h3>Sauce</h3>
            <div className="options">
              {SAUCES.map((s) => (
                <label
                  key={s.id}
                  className={`option ${sauce === s.id ? "active" : ""} ${
                    s.stock <= 3 ? "low-stock" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="sauce"
                    checked={sauce === s.id}
                    onChange={() => setSauce(s.id)}
                    disabled={s.stock <= 0}
                  />
                  <span>{s.name}</span>
                  <em>+₹{s.price}</em>
                  {s.stock <= 3 && (
                    <span className="stock-warning">Low Stock: {s.stock}</span>
                  )}
                </label>
              ))}
            </div>
          </div>

          <div className="custom-section">
            <h3>Cheese</h3>
            <div className="options">
              {CHEESES.map((c) => (
                <label
                  key={c.id}
                  className={`option ${cheese.includes(c.id) ? "active" : ""} ${
                    c.stock <= 2 ? "low-stock" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={cheese.includes(c.id)}
                    onChange={() => toggleCheese(c.id)}
                    disabled={c.stock <= 0}
                  />
                  <span>{c.name}</span>
                  <em>+₹{c.price}</em>
                  {c.stock <= 2 && (
                    <span className="stock-warning">Low Stock: {c.stock}</span>
                  )}
                </label>
              ))}
            </div>
          </div>

          <div className="custom-section">
            <h3>Toppings</h3>
            <div className="options">
              {TOPPINGS.map((t) => (
                <label
                  key={t.id}
                  className={`option ${
                    toppings.includes(t.id) ? "active" : ""
                  } ${t.stock <= 5 ? "low-stock" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={toppings.includes(t.id)}
                    onChange={() => toggleTopping(t.id)}
                    disabled={t.stock <= 0}
                  />
                  <span>{t.name}</span>
                  <em>+₹{t.price}</em>
                  {t.stock <= 5 && (
                    <span className="stock-warning">Low Stock: {t.stock}</span>
                  )}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="custom-summary">
          <div className="price">Total: ₹{price}</div>
          <button className="add-btn" onClick={addToCart}>
            <FaPlus /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomPizza;
