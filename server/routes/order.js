const express = require("express");
const Order = require("../models/Order");
const User = require("../models/User");
const {
  protect,
  admin,
  requireEmailVerification,
} = require("../middleware/auth");
const { updateInventoryAfterOrder } = require("../utils/stockMonitor");
const { sendOrderStatusEmail } = require("../utils/emailService");

const router = express.Router();

// @route   POST /api/order
// @desc    Create a new order
// @access  Private
router.post("/", protect, requireEmailVerification, async (req, res) => {
  try {
    const { items, deliveryAddress, specialInstructions, paymentMethod } =
      req.body;

    if (!items || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Order must contain at least one item" });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      deliveryAddress,
      specialInstructions,
      paymentMethod,
    });

    // Update inventory after order creation
    try {
      await updateInventoryAfterOrder(items);
    } catch (inventoryError) {
      console.error("Inventory update error:", inventoryError);
      // Continue with order creation even if inventory update fails
    }

    await order.populate("user", "name email phone");
    await order.populate("items.pizza");

    res.status(201).json(order);
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/order/my-orders
// @desc    Get user's orders
// @access  Private
router.get("/my-orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.pizza")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Get user orders error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/order/:id
// @desc    Get order by ID
// @access  Private
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email phone")
      .populate("items.pizza");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if user is authorized to view this order
    if (
      order.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this order" });
    }

    res.json(order);
  } catch (error) {
    console.error("Get order error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/order/:id/status
// @desc    Update order status (Admin only)
// @access  Private/Admin
router.put("/:id/status", protect, admin, async (req, res) => {
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

    // Send email notification to user
    try {
      await sendOrderStatusEmail(order.user.email, order.orderNumber, status);
    } catch (emailError) {
      console.error("Error sending status email:", emailError);
      // Continue even if email fails
    }

    res.json(order);
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/order
// @desc    Get all orders (Admin only)
// @access  Private/Admin
router.get("/", protect, admin, async (req, res) => {
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
    console.error("Get all orders error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/order/:id/payment-status
// @desc    Update payment status (Admin only)
// @access  Private/Admin
router.put("/:id/payment-status", protect, admin, async (req, res) => {
  try {
    const { paymentStatus, razorpayPaymentId } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.paymentStatus = paymentStatus;
    if (razorpayPaymentId) {
      order.razorpayPaymentId = razorpayPaymentId;
    }

    await order.save();

    res.json(order);
  } catch (error) {
    console.error("Update payment status error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   DELETE /api/order/:id
// @desc    Cancel order
// @access  Private
router.delete("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if user is authorized to cancel this order
    if (
      order.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to cancel this order" });
    }

    // Only allow cancellation if order is still pending
    if (order.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Order cannot be cancelled at this stage" });
    }

    order.status = "cancelled";
    await order.save();

    res.json({ message: "Order cancelled successfully" });
  } catch (error) {
    console.error("Cancel order error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/order/stats/dashboard
// @desc    Get order statistics for dashboard (Admin only)
// @access  Private/Admin
router.get("/stats/dashboard", protect, admin, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalOrders,
      todayOrders,
      pendingOrders,
      completedOrders,
      totalRevenue,
    ] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ createdAt: { $gte: today } }),
      Order.countDocuments({ status: "pending" }),
      Order.countDocuments({ status: "delivered" }),
      Order.aggregate([
        { $match: { paymentStatus: "completed" } },
        { $group: { _id: null, total: { $sum: "$total" } } },
      ]),
    ]);

    res.json({
      totalOrders,
      todayOrders,
      pendingOrders,
      completedOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
    });
  } catch (error) {
    console.error("Get order stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
