const User = require("../models/User");
const Pizza = require("../models/Pizza");
const Inventory = require("../models/Inventory");
const bcrypt = require("bcryptjs");

const seedData = async () => {
  try {
    console.log("Starting database seeding...");

    // Create admin user
    const adminExists = await User.findOne({
      email: "admin@pizzadelivery.com",
    });
    if (!adminExists) {
      const adminPassword = await bcrypt.hash("admin123", 12);
      await User.create({
        name: "Admin User",
        email: "admin@pizzadelivery.com",
        password: adminPassword,
        phone: "9876543210",
        role: "admin",
        isEmailVerified: true,
        address: {
          street: "Admin Street",
          city: "Admin City",
          state: "Admin State",
          zipCode: "123456",
        },
      });
      console.log("Admin user created");
    }

    // Create pizza varieties
    const pizzas = [
      {
        name: "Margherita",
        description:
          "Classic tomato sauce with mozzarella cheese and fresh basil",
        image:
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400",
        basePrice: 299,
        category: "vegetarian",
        ingredients: [
          { name: "Tomato Sauce", quantity: 100, unit: "ml" },
          { name: "Mozzarella Cheese", quantity: 150, unit: "grams" },
          { name: "Fresh Basil", quantity: 10, unit: "grams" },
        ],
        nutritionInfo: {
          calories: 266,
          protein: 11,
          carbs: 33,
          fat: 10,
        },
      },
      {
        name: "Pepperoni",
        description: "Spicy pepperoni with mozzarella cheese and tomato sauce",
        image:
          "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400",
        basePrice: 399,
        category: "non-vegetarian",
        ingredients: [
          { name: "Tomato Sauce", quantity: 100, unit: "ml" },
          { name: "Mozzarella Cheese", quantity: 150, unit: "grams" },
          { name: "Pepperoni", quantity: 80, unit: "grams" },
        ],
        nutritionInfo: {
          calories: 312,
          protein: 14,
          carbs: 33,
          fat: 15,
        },
      },
      {
        name: "Veggie Supreme",
        description: "Loaded with fresh vegetables and mozzarella cheese",
        image:
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
        basePrice: 349,
        category: "vegetarian",
        ingredients: [
          { name: "Tomato Sauce", quantity: 100, unit: "ml" },
          { name: "Mozzarella Cheese", quantity: 150, unit: "grams" },
          { name: "Bell Peppers", quantity: 50, unit: "grams" },
          { name: "Mushrooms", quantity: 40, unit: "grams" },
          { name: "Onions", quantity: 30, unit: "grams" },
          { name: "Olives", quantity: 20, unit: "grams" },
        ],
        nutritionInfo: {
          calories: 245,
          protein: 10,
          carbs: 35,
          fat: 8,
        },
      },
      {
        name: "BBQ Chicken",
        description: "BBQ sauce with grilled chicken and red onions",
        image:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
        basePrice: 449,
        category: "non-vegetarian",
        ingredients: [
          { name: "BBQ Sauce", quantity: 100, unit: "ml" },
          { name: "Mozzarella Cheese", quantity: 150, unit: "grams" },
          { name: "Grilled Chicken", quantity: 120, unit: "grams" },
          { name: "Red Onions", quantity: 30, unit: "grams" },
        ],
        nutritionInfo: {
          calories: 378,
          protein: 22,
          carbs: 28,
          fat: 18,
        },
      },
      {
        name: "Four Cheese",
        description: "A blend of four delicious cheeses",
        image:
          "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
        basePrice: 379,
        category: "vegetarian",
        ingredients: [
          { name: "Tomato Sauce", quantity: 100, unit: "ml" },
          { name: "Mozzarella Cheese", quantity: 100, unit: "grams" },
          { name: "Cheddar Cheese", quantity: 50, unit: "grams" },
          { name: "Parmesan Cheese", quantity: 30, unit: "grams" },
          { name: "Gorgonzola Cheese", quantity: 20, unit: "grams" },
        ],
        nutritionInfo: {
          calories: 298,
          protein: 16,
          carbs: 25,
          fat: 18,
        },
      },
    ];

    for (const pizza of pizzas) {
      const exists = await Pizza.findOne({ name: pizza.name });
      if (!exists) {
        await Pizza.create(pizza);
        console.log(`Pizza ${pizza.name} created`);
      }
    }

    // Create inventory items
    const inventoryItems = [
      // Pizza Bases
      {
        name: "Classic Crust",
        category: "base",
        currentStock: 50,
        maxStock: 100,
        threshold: 20,
        unit: "pieces",
        price: 50,
        supplier: {
          name: "Flour Supplier Co.",
          contact: "9876543210",
          email: "supplier@flour.com",
        },
      },
      {
        name: "Thin Crust",
        category: "base",
        currentStock: 40,
        maxStock: 80,
        threshold: 15,
        unit: "pieces",
        price: 45,
        supplier: {
          name: "Flour Supplier Co.",
          contact: "9876543210",
          email: "supplier@flour.com",
        },
      },
      {
        name: "Stuffed Crust",
        category: "base",
        currentStock: 30,
        maxStock: 60,
        threshold: 12,
        unit: "pieces",
        price: 65,
        supplier: {
          name: "Flour Supplier Co.",
          contact: "9876543210",
          email: "supplier@flour.com",
        },
      },
      {
        name: "Gluten Free",
        category: "base",
        currentStock: 25,
        maxStock: 50,
        threshold: 10,
        unit: "pieces",
        price: 75,
        supplier: {
          name: "Health Foods Inc.",
          contact: "9876543211",
          email: "supplier@health.com",
        },
      },
      {
        name: "Whole Wheat",
        category: "base",
        currentStock: 35,
        maxStock: 70,
        threshold: 15,
        unit: "pieces",
        price: 55,
        supplier: {
          name: "Health Foods Inc.",
          contact: "9876543211",
          email: "supplier@health.com",
        },
      },

      // Sauces
      {
        name: "Tomato Sauce",
        category: "sauce",
        currentStock: 20,
        maxStock: 40,
        threshold: 8,
        unit: "liters",
        price: 80,
        supplier: {
          name: "Sauce Factory",
          contact: "9876543212",
          email: "supplier@sauce.com",
        },
      },
      {
        name: "BBQ Sauce",
        category: "sauce",
        currentStock: 15,
        maxStock: 30,
        threshold: 6,
        unit: "liters",
        price: 120,
        supplier: {
          name: "Sauce Factory",
          contact: "9876543212",
          email: "supplier@sauce.com",
        },
      },
      {
        name: "White Sauce",
        category: "sauce",
        currentStock: 12,
        maxStock: 25,
        threshold: 5,
        unit: "liters",
        price: 150,
        supplier: {
          name: "Sauce Factory",
          contact: "9876543212",
          email: "supplier@sauce.com",
        },
      },
      {
        name: "Pesto Sauce",
        category: "sauce",
        currentStock: 8,
        maxStock: 20,
        threshold: 4,
        unit: "liters",
        price: 200,
        supplier: {
          name: "Sauce Factory",
          contact: "9876543212",
          email: "supplier@sauce.com",
        },
      },
      {
        name: "Buffalo Sauce",
        category: "sauce",
        currentStock: 10,
        maxStock: 20,
        threshold: 4,
        unit: "liters",
        price: 180,
        supplier: {
          name: "Sauce Factory",
          contact: "9876543212",
          email: "supplier@sauce.com",
        },
      },

      // Cheeses
      {
        name: "Mozzarella Cheese",
        category: "cheese",
        currentStock: 25,
        maxStock: 50,
        threshold: 10,
        unit: "kg",
        price: 400,
        supplier: {
          name: "Dairy Products Ltd.",
          contact: "9876543213",
          email: "supplier@dairy.com",
        },
      },
      {
        name: "Cheddar Cheese",
        category: "cheese",
        currentStock: 20,
        maxStock: 40,
        threshold: 8,
        unit: "kg",
        price: 450,
        supplier: {
          name: "Dairy Products Ltd.",
          contact: "9876543213",
          email: "supplier@dairy.com",
        },
      },
      {
        name: "Parmesan Cheese",
        category: "cheese",
        currentStock: 15,
        maxStock: 30,
        threshold: 6,
        unit: "kg",
        price: 600,
        supplier: {
          name: "Dairy Products Ltd.",
          contact: "9876543213",
          email: "supplier@dairy.com",
        },
      },
      {
        name: "Gorgonzola Cheese",
        category: "cheese",
        currentStock: 8,
        maxStock: 20,
        threshold: 4,
        unit: "kg",
        price: 800,
        supplier: {
          name: "Dairy Products Ltd.",
          contact: "9876543213",
          email: "supplier@dairy.com",
        },
      },

      // Veggies
      {
        name: "Bell Peppers",
        category: "veggies",
        currentStock: 15,
        maxStock: 30,
        threshold: 6,
        unit: "kg",
        price: 120,
        supplier: {
          name: "Fresh Vegetables Co.",
          contact: "9876543214",
          email: "supplier@veggies.com",
        },
      },
      {
        name: "Mushrooms",
        category: "veggies",
        currentStock: 12,
        maxStock: 25,
        threshold: 5,
        unit: "kg",
        price: 200,
        supplier: {
          name: "Fresh Vegetables Co.",
          contact: "9876543214",
          email: "supplier@veggies.com",
        },
      },
      {
        name: "Onions",
        category: "veggies",
        currentStock: 20,
        maxStock: 40,
        threshold: 8,
        unit: "kg",
        price: 80,
        supplier: {
          name: "Fresh Vegetables Co.",
          contact: "9876543214",
          email: "supplier@veggies.com",
        },
      },
      {
        name: "Olives",
        category: "veggies",
        currentStock: 10,
        maxStock: 20,
        threshold: 4,
        unit: "kg",
        price: 300,
        supplier: {
          name: "Fresh Vegetables Co.",
          contact: "9876543214",
          email: "supplier@veggies.com",
        },
      },
      {
        name: "Tomatoes",
        category: "veggies",
        currentStock: 18,
        maxStock: 35,
        threshold: 7,
        unit: "kg",
        price: 100,
        supplier: {
          name: "Fresh Vegetables Co.",
          contact: "9876543214",
          email: "supplier@veggies.com",
        },
      },
      {
        name: "Spinach",
        category: "veggies",
        currentStock: 8,
        maxStock: 15,
        threshold: 3,
        unit: "kg",
        price: 150,
        supplier: {
          name: "Fresh Vegetables Co.",
          contact: "9876543214",
          email: "supplier@veggies.com",
        },
      },

      // Meat
      {
        name: "Pepperoni",
        category: "meat",
        currentStock: 15,
        maxStock: 30,
        threshold: 6,
        unit: "kg",
        price: 500,
        supplier: {
          name: "Meat Suppliers Ltd.",
          contact: "9876543215",
          email: "supplier@meat.com",
        },
      },
      {
        name: "Grilled Chicken",
        category: "meat",
        currentStock: 20,
        maxStock: 40,
        threshold: 8,
        unit: "kg",
        price: 400,
        supplier: {
          name: "Meat Suppliers Ltd.",
          contact: "9876543215",
          email: "supplier@meat.com",
        },
      },
      {
        name: "Bacon",
        category: "meat",
        currentStock: 12,
        maxStock: 25,
        threshold: 5,
        unit: "kg",
        price: 600,
        supplier: {
          name: "Meat Suppliers Ltd.",
          contact: "9876543215",
          email: "supplier@meat.com",
        },
      },
      {
        name: "Sausage",
        category: "meat",
        currentStock: 10,
        maxStock: 20,
        threshold: 4,
        unit: "kg",
        price: 450,
        supplier: {
          name: "Meat Suppliers Ltd.",
          contact: "9876543215",
          email: "supplier@meat.com",
        },
      },
    ];

    for (const item of inventoryItems) {
      const exists = await Inventory.findOne({
        name: item.name,
        category: item.category,
      });
      if (!exists) {
        await Inventory.create(item);
        console.log(`Inventory item ${item.name} (${item.category}) created`);
      }
    }

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

module.exports = seedData;
