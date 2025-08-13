const express = require("express");
const Pizza = require("../models/Pizza");
const Inventory = require("../models/Inventory");
const { protect } = require("../middleware/auth");

const router = express.Router();

// @route   GET /api/pizza
// @desc    Get all available pizzas
// @access  Public
router.get("/", async (req, res) => {
  try {
    const pizzas = await Pizza.find({ isAvailable: true });
    res.json(pizzas);
  } catch (error) {
    console.error("Get pizzas error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/pizza/:id
// @desc    Get pizza by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) {
      return res.status(404).json({ message: "Pizza not found" });
    }
    res.json(pizza);
  } catch (error) {
    console.error("Get pizza error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/pizza/customization/options
// @desc    Get all customization options (bases, sauces, cheeses, veggies, meat)
// @access  Public
router.get("/customization/options", async (req, res) => {
  try {
    const [bases, sauces, cheeses, veggies, meat] = await Promise.all([
      Inventory.find({
        category: "base",
        isAvailable: true,
        currentStock: { $gt: 0 },
      }),
      Inventory.find({
        category: "sauce",
        isAvailable: true,
        currentStock: { $gt: 0 },
      }),
      Inventory.find({
        category: "cheese",
        isAvailable: true,
        currentStock: { $gt: 0 },
      }),
      Inventory.find({
        category: "veggies",
        isAvailable: true,
        currentStock: { $gt: 0 },
      }),
      Inventory.find({
        category: "meat",
        isAvailable: true,
        currentStock: { $gt: 0 },
      }),
    ]);

    res.json({
      bases,
      sauces,
      cheeses,
      veggies,
      meat,
    });
  } catch (error) {
    console.error("Get customization options error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/pizza
// @desc    Create a new pizza (Admin only)
// @access  Private/Admin
router.post("/", protect, async (req, res) => {
  try {
    const {
      name,
      description,
      image,
      basePrice,
      category,
      ingredients,
      nutritionInfo,
    } = req.body;

    const pizza = await Pizza.create({
      name,
      description,
      image,
      basePrice,
      category,
      ingredients,
      nutritionInfo,
    });

    res.status(201).json(pizza);
  } catch (error) {
    console.error("Create pizza error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/pizza/:id
// @desc    Update pizza (Admin only)
// @access  Private/Admin
router.put("/:id", protect, async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!pizza) {
      return res.status(404).json({ message: "Pizza not found" });
    }

    res.json(pizza);
  } catch (error) {
    console.error("Update pizza error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   DELETE /api/pizza/:id
// @desc    Delete pizza (Admin only)
// @access  Private/Admin
router.delete("/:id", protect, async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndDelete(req.params.id);

    if (!pizza) {
      return res.status(404).json({ message: "Pizza not found" });
    }

    res.json({ message: "Pizza deleted successfully" });
  } catch (error) {
    console.error("Delete pizza error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/pizza/category/:category
// @desc    Get pizzas by category
// @access  Public
router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const pizzas = await Pizza.find({
      category,
      isAvailable: true,
    });
    res.json(pizzas);
  } catch (error) {
    console.error("Get pizzas by category error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
