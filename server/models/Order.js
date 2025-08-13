const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    orderNumber: {
      type: String,
      unique: true,
      required: true,
    },
    items: [
      {
        pizza: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Pizza",
          required: true,
        },
        customizations: {
          base: {
            name: String,
            price: Number,
          },
          sauce: {
            name: String,
            price: Number,
          },
          cheese: {
            name: String,
            price: Number,
          },
          veggies: [
            {
              name: String,
              price: Number,
            },
          ],
          meat: [
            {
              name: String,
              price: Number,
            },
          ],
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    subtotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
      default: 0,
    },
    deliveryFee: {
      type: Number,
      required: true,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "in-kitchen",
        "out-for-delivery",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["razorpay", "cod"],
      required: true,
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    deliveryAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      instructions: String,
    },
    estimatedDeliveryTime: Date,
    actualDeliveryTime: Date,
    specialInstructions: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Generate order number before saving
orderSchema.pre("save", async function (next) {
  if (this.isNew) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    // Get count of orders today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const orderCount = await this.constructor.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow },
    });

    const orderNumber = `PZ${year}${month}${day}${(orderCount + 1)
      .toString()
      .padStart(3, "0")}`;
    this.orderNumber = orderNumber;
  }
  next();
});

// Calculate total before saving
orderSchema.pre("save", function (next) {
  if (this.isModified("items") || this.isNew) {
    this.subtotal = this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    this.tax = this.subtotal * 0.05; // 5% tax
    this.deliveryFee = this.subtotal > 500 ? 0 : 50; // Free delivery above 500
    this.total = this.subtotal + this.tax + this.deliveryFee;
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);
