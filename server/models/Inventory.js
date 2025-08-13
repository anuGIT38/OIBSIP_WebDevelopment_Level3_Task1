const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Item name is required"],
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["base", "sauce", "cheese", "veggies", "meat"],
      required: [true, "Category is required"],
    },
    currentStock: {
      type: Number,
      required: [true, "Current stock is required"],
      min: [0, "Stock cannot be negative"],
    },
    maxStock: {
      type: Number,
      required: [true, "Maximum stock is required"],
      min: [0, "Maximum stock cannot be negative"],
    },
    threshold: {
      type: Number,
      required: [true, "Threshold is required"],
      min: [0, "Threshold cannot be negative"],
    },
    unit: {
      type: String,
      required: [true, "Unit is required"],
      enum: ["pieces", "kg", "liters", "grams"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    lastRestocked: {
      type: Date,
      default: Date.now,
    },
    supplier: {
      name: String,
      contact: String,
      email: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Method to check if stock is low
inventorySchema.methods.isLowStock = function () {
  return this.currentStock <= this.threshold;
};

// Method to update stock
inventorySchema.methods.updateStock = function (quantity) {
  this.currentStock = Math.max(0, this.currentStock + quantity);
  if (quantity > 0) {
    this.lastRestocked = new Date();
  }
  return this.save();
};

module.exports = mongoose.model("Inventory", inventorySchema);
