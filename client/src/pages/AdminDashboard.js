import React, { useState, useEffect } from "react";
import {
  FaChartBar,
  FaBoxes,
  FaClipboardList,
  FaExclamationTriangle,
  FaEdit,
} from "react-icons/fa";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setInventory([
        {
          id: 1,
          name: "Thin Crust Base",
          category: "base",
          currentStock: 45,
          maxStock: 100,
          threshold: 20,
          price: 80,
        },
        {
          id: 2,
          name: "Regular Base",
          category: "base",
          currentStock: 15,
          maxStock: 100,
          threshold: 20,
          price: 60,
        },
        {
          id: 3,
          name: "Tomato Sauce",
          category: "sauce",
          currentStock: 8,
          maxStock: 50,
          threshold: 15,
          price: 0,
        },
        {
          id: 4,
          name: "Mozzarella Cheese",
          category: "cheese",
          currentStock: 5,
          maxStock: 30,
          threshold: 10,
          price: 40,
        },
      ]);

      setOrders([
        {
          id: "ORD-001",
          customer: "John Doe",
          items: 2,
          total: 997,
          status: "confirmed",
        },
        {
          id: "ORD-002",
          customer: "Jane Smith",
          items: 1,
          total: 449,
          status: "in-kitchen",
        },
        {
          id: "ORD-003",
          customer: "Mike Johnson",
          items: 3,
          total: 1247,
          status: "pending",
        },
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => o.status === "pending").length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
    lowStockItems: inventory.filter((i) => i.currentStock <= i.threshold)
      .length,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#ffc107";
      case "confirmed":
        return "#17a2b8";
      case "in-kitchen":
        return "#fd7e14";
      case "delivered":
        return "#28a745";
      default:
        return "#6c757d";
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage your pizza delivery business</p>
      </div>

      <div className="admin-nav">
        <button
          className={`nav-tab ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          <FaChartBar /> Overview
        </button>
        <button
          className={`nav-tab ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          <FaClipboardList /> Orders
        </button>
        <button
          className={`nav-tab ${activeTab === "inventory" ? "active" : ""}`}
          onClick={() => setActiveTab("inventory")}
        >
          <FaBoxes /> Inventory
        </button>
      </div>

      <div className="admin-content">
        {activeTab === "overview" && (
          <div className="overview-section">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon orders">
                  <FaClipboardList />
                </div>
                <div className="stat-info">
                  <h3>{stats.totalOrders}</h3>
                  <p>Total Orders</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon pending">
                  <FaExclamationTriangle />
                </div>
                <div className="stat-info">
                  <h3>{stats.pendingOrders}</h3>
                  <p>Pending Orders</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon revenue">
                  <FaChartBar />
                </div>
                <div className="stat-info">
                  <h3>₹{stats.totalRevenue}</h3>
                  <p>Total Revenue</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon low-stock">
                  <FaBoxes />
                </div>
                <div className="stat-info">
                  <h3>{stats.lowStockItems}</h3>
                  <p>Low Stock Items</p>
                </div>
              </div>
            </div>

            <div className="recent-orders">
              <h3>Recent Orders</h3>
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order.id} className="order-item">
                    <div className="order-info">
                      <h4>{order.id}</h4>
                      <p>{order.customer}</p>
                    </div>
                    <div className="order-details">
                      <span>{order.items} items</span>
                      <span>₹{order.total}</span>
                      <span
                        className="status-badge"
                        style={{
                          backgroundColor: getStatusColor(order.status),
                        }}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="orders-section">
            <h2>Order Management</h2>
            <div className="orders-table">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.items}</td>
                      <td>₹{order.total}</td>
                      <td>
                        <span
                          className="status-badge"
                          style={{
                            backgroundColor: getStatusColor(order.status),
                          }}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(order.id, e.target.value)
                          }
                          className="status-select"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="in-kitchen">In Kitchen</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "inventory" && (
          <div className="inventory-section">
            <h2>Inventory Management</h2>
            <div className="inventory-grid">
              {inventory.map((item) => (
                <div
                  key={item.id}
                  className={`inventory-card ${
                    item.currentStock <= item.threshold ? "low-stock" : ""
                  }`}
                >
                  <div className="item-header">
                    <h3>{item.name}</h3>
                    <span className="category-badge">{item.category}</span>
                  </div>

                  <div className="stock-info">
                    <div className="stock-bar">
                      <div
                        className="stock-fill"
                        style={{
                          width: `${
                            (item.currentStock / item.maxStock) * 100
                          }%`,
                          backgroundColor:
                            item.currentStock <= item.threshold
                              ? "#dc3545"
                              : "#28a745",
                        }}
                      ></div>
                    </div>
                    <div className="stock-details">
                      <span>
                        Stock: {item.currentStock}/{item.maxStock}
                      </span>
                      <span>Threshold: {item.threshold}</span>
                    </div>
                  </div>

                  <div className="item-footer">
                    <span className="price">₹{item.price}</span>
                    <button className="edit-btn">
                      <FaEdit />
                    </button>
                  </div>

                  {item.currentStock <= item.threshold && (
                    <div className="low-stock-warning">
                      <FaExclamationTriangle /> Low Stock Alert!
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
