const Inventory = require("../models/Inventory");
const { sendStockNotificationEmail } = require("./emailService");

// Check stock levels and send notifications if needed
const checkStockLevels = async () => {
  try {
    // Get all inventory items
    const inventoryItems = await Inventory.find({ isAvailable: true });

    // Filter items that are below threshold
    const lowStockItems = inventoryItems.filter((item) => item.isLowStock());

    if (lowStockItems.length > 0) {
      console.log(`Found ${lowStockItems.length} items with low stock`);

      // Send notification email to admin
      await sendStockNotificationEmail(lowStockItems);

      return {
        success: true,
        message: `Low stock notification sent for ${lowStockItems.length} items`,
        lowStockItems,
      };
    } else {
      console.log("All inventory items are above threshold");
      return {
        success: true,
        message: "All inventory items are above threshold",
        lowStockItems: [],
      };
    }
  } catch (error) {
    console.error("Error checking stock levels:", error);
    throw error;
  }
};

// Update inventory after order placement
const updateInventoryAfterOrder = async (orderItems) => {
  try {
    const updates = [];

    for (const item of orderItems) {
      const { customizations, quantity } = item;

      // Update base stock
      if (customizations.base) {
        const baseItem = await Inventory.findOne({
          name: customizations.base.name,
          category: "base",
        });
        if (baseItem) {
          await baseItem.updateStock(-quantity);
          updates.push(`Updated ${baseItem.name} stock`);
        }
      }

      // Update sauce stock
      if (customizations.sauce) {
        const sauceItem = await Inventory.findOne({
          name: customizations.sauce.name,
          category: "sauce",
        });
        if (sauceItem) {
          await sauceItem.updateStock(-quantity);
          updates.push(`Updated ${sauceItem.name} stock`);
        }
      }

      // Update cheese stock
      if (customizations.cheese) {
        const cheeseItem = await Inventory.findOne({
          name: customizations.cheese.name,
          category: "cheese",
        });
        if (cheeseItem) {
          await cheeseItem.updateStock(-quantity);
          updates.push(`Updated ${cheeseItem.name} stock`);
        }
      }

      // Update veggies stock
      if (customizations.veggies && customizations.veggies.length > 0) {
        for (const veggie of customizations.veggies) {
          const veggieItem = await Inventory.findOne({
            name: veggie.name,
            category: "veggies",
          });
          if (veggieItem) {
            await veggieItem.updateStock(-quantity);
            updates.push(`Updated ${veggieItem.name} stock`);
          }
        }
      }

      // Update meat stock
      if (customizations.meat && customizations.meat.length > 0) {
        for (const meat of customizations.meat) {
          const meatItem = await Inventory.findOne({
            name: meat.name,
            category: "meat",
          });
          if (meatItem) {
            await meatItem.updateStock(-quantity);
            updates.push(`Updated ${meatItem.name} stock`);
          }
        }
      }
    }

    // Check stock levels after update
    await checkStockLevels();

    return {
      success: true,
      message: "Inventory updated successfully",
      updates,
    };
  } catch (error) {
    console.error("Error updating inventory after order:", error);
    throw error;
  }
};

// Get inventory summary for admin dashboard
const getInventorySummary = async () => {
  try {
    const summary = await Inventory.aggregate([
      {
        $group: {
          _id: "$category",
          totalItems: { $sum: 1 },
          lowStockItems: {
            $sum: {
              $cond: [{ $lte: ["$currentStock", "$threshold"] }, 1, 0],
            },
          },
          totalStock: { $sum: "$currentStock" },
          items: {
            $push: {
              name: "$name",
              currentStock: "$currentStock",
              threshold: "$threshold",
              isLowStock: { $lte: ["$currentStock", "$threshold"] },
            },
          },
        },
      },
    ]);

    return summary;
  } catch (error) {
    console.error("Error getting inventory summary:", error);
    throw error;
  }
};

module.exports = {
  checkStockLevels,
  updateInventoryAfterOrder,
  getInventorySummary,
};
