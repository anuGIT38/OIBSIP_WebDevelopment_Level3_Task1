const express = require("express");
const User = require("../models/User");
const Inventory = require("../models/Inventory");
const Order = require("../models/Order");
const { protect, admin } = require("../middleware/auth");
const { getInventorySummary } = require("../utils/stockMonitor");

const router = express.Router();

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard data
// @access  Private/Admin
router.get("/dashboard", protect, admin, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalUsers,
      totalOrders,
      todayOrders,
      pendingOrders,
      totalRevenue,
      inventorySummary,
    ] = await Promise.all([
      User.countDocuments({ role: "user" }),
      Order.countDocuments(),
      Order.countDocuments({ createdAt: { $gte: today } }),
      Order.countDocuments({ status: "pending" }),
      Order.aggregate([
        { $match: { paymentStatus: "completed" } },
        { $group: { _id: null, total: { $sum: "$total" } } },
      ]),
      getInventorySummary(),
    ]);

    res.json({
      totalUsers,
      totalOrders,
      todayOrders,
      pendingOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      inventorySummary,
    });
  } catch (error) {
    console.error("Get admin dashboard error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users (Admin only)
// @access  Private/Admin
router.get("/users", protect, admin, async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    const query = { role: "user" };
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/admin/users/:id
// @desc    Update user (Admin only)
// @access  Private/Admin
router.put("/users/:id", protect, admin, async (req, res) => {
  try {
    const { name, email, phone, isEmailVerified } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, isEmailVerified },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete user (Admin only)
// @access  Private/Admin
router.delete("/users/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/admin/inventory
// @desc    Get all inventory items (Admin only)
// @access  Private/Admin
router.get("/inventory", protect, admin, async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;

    const query = {};
    if (category) {
      query.category = category;
    }

    const inventory = await Inventory.find(query)
      .sort({ category: 1, name: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Inventory.countDocuments(query);

    res.json({
      inventory,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error("Get inventory error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/admin/inventory
// @desc    Add new inventory item (Admin only)
// @access  Private/Admin
router.post("/inventory", protect, admin, async (req, res) => {
  try {
    const {
      name,
      category,
      currentStock,
      maxStock,
      threshold,
      unit,
      price,
      supplier,
    } = req.body;

    const inventory = await Inventory.create({
      name,
      category,
      currentStock,
      maxStock,
      threshold,
      unit,
      price,
      supplier,
    });

    res.status(201).json(inventory);
  } catch (error) {
    console.error("Add inventory error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/admin/inventory/:id
// @desc    Update inventory item (Admin only)
// @access  Private/Admin
router.put("/inventory/:id", protect, admin, async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!inventory) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    res.json(inventory);
  } catch (error) {
    console.error("Update inventory error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   DELETE /api/admin/inventory/:id
// @desc    Delete inventory item (Admin only)
// @access  Private/Admin
router.delete("/inventory/:id", protect, admin, async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndDelete(req.params.id);

    if (!inventory) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    res.json({ message: "Inventory item deleted successfully" });
  } catch (error) {
    console.error("Delete inventory error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/admin/inventory/:id/restock
// @desc    Restock inventory item (Admin only)
// @access  Private/Admin
router.post("/inventory/:id/restock", protect, admin, async (req, res) => {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const inventory = await Inventory.findById(req.params.id);
    if (!inventory) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    await inventory.updateStock(quantity);

    res.json(inventory);
  } catch (error) {
    console.error("Restock inventory error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/admin/orders
// @desc    Get all orders (Admin only)
// @access  Private/Admin
router.get("/orders", protect, admin, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = {};
    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query)
      .populate("user", "name email phone")
      .populate("items.pizza")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/admin/orders/:id
// @desc    Get order details (Admin only)
// @access  Private/Admin
router.get("/orders/:id", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email phone address")
      .populate("items.pizza");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Get order details error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/admin/orders/:id/status
// @desc    Update order status (Admin only)
// @access  Private/Admin
router.put("/orders/:id/status", protect, admin, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;

    // Set delivery time if status is 'delivered'
    if (status === "delivered") {
      order.actualDeliveryTime = new Date();
    }

    await order.save();

    res.json(order);
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
