const nodemailer = require("nodemailer");

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send email verification
const sendVerificationEmail = async (email, token) => {
  const transporter = createTransporter();

  const verificationUrl = `${
    process.env.CLIENT_URL || "http://localhost:3000"
  }/verify-email/${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Email - Pizza Delivery App",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #e74c3c;">🍕 Welcome to Pizza Delivery App!</h2>
        <p>Thank you for registering with us. Please verify your email address to complete your registration.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #e74c3c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Verify Email
          </a>
        </div>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
        <p>This link will expire in 24 hours.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">
          If you didn't create an account, please ignore this email.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email, token) => {
  const transporter = createTransporter();

  const resetUrl = `${
    process.env.CLIENT_URL || "http://localhost:3000"
  }/reset-password/${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset Your Password - Pizza Delivery App",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #e74c3c;">🔐 Password Reset Request</h2>
        <p>You requested a password reset for your Pizza Delivery App account.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #e74c3c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #666;">${resetUrl}</p>
        <p>This link will expire in 1 hour.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">
          If you didn't request a password reset, please ignore this email.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent successfully");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};

// Send stock notification email to admin
const sendStockNotificationEmail = async (lowStockItems) => {
  const transporter = createTransporter();

  const itemsList = lowStockItems
    .map(
      (item) =>
        `<li><strong>${item.name}</strong> (${item.category}): ${item.currentStock} ${item.unit} remaining</li>`
    )
    .join("");

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "⚠️ Low Stock Alert - Pizza Delivery App",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #e74c3c;">⚠️ Low Stock Alert</h2>
        <p>The following items are running low on stock and need to be restocked:</p>
        <ul style="color: #e74c3c;">
          ${itemsList}
        </ul>
        <p>Please restock these items to avoid any disruption in service.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">
          This is an automated notification from Pizza Delivery App.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Stock notification email sent successfully");
  } catch (error) {
    console.error("Error sending stock notification email:", error);
    throw error;
  }
};

// Send order status update email
const sendOrderStatusEmail = async (email, orderNumber, status) => {
  const transporter = createTransporter();

  const statusMessages = {
    confirmed: "Your order has been confirmed and is being prepared!",
    "in-kitchen": "Your pizza is being prepared in the kitchen!",
    "out-for-delivery": "Your order is out for delivery!",
    delivered: "Your order has been delivered. Enjoy your pizza!",
  };

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Order Status Update - ${orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #e74c3c;">🍕 Order Status Update</h2>
        <p><strong>Order Number:</strong> ${orderNumber}</p>
        <p><strong>Status:</strong> ${status
          .replace("-", " ")
          .toUpperCase()}</p>
        <p>${
          statusMessages[status] || "Your order status has been updated."
        }</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">
          Thank you for choosing Pizza Delivery App!
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Order status email sent successfully");
  } catch (error) {
    console.error("Error sending order status email:", error);
    throw error;
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendStockNotificationEmail,
  sendOrderStatusEmail,
};
