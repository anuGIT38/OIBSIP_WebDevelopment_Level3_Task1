# 🍕 Pizza Delivery App

A full-stack pizza delivery application built with React, Node.js, and MongoDB. Features include user authentication, custom pizza building, order management, payment integration, and admin dashboard.

## ✨ Features

### 🔐 Authentication & Authorization

- User registration with email verification
- User and admin login systems
- JWT-based authentication
- Password reset functionality
- Role-based access control (User/Admin)

### 🍕 Pizza Management

- Browse available pizza varieties
- Custom pizza builder with:
  - 5 different pizza bases
  - 5 sauce options
  - Multiple cheese types
  - Various vegetable and meat toppings
- Real-time price calculation

### 💳 Payment Integration

- Razorpay payment gateway integration
- Test mode for development
- Payment verification and order confirmation
- Order status tracking

### 📦 Order Management

- Shopping cart functionality
- Order placement and tracking
- Real-time order status updates
- Order history for users
- Email notifications for status changes

### 🏪 Admin Dashboard

- Complete inventory management system
- Stock level monitoring with email alerts
- Order management and status updates
- User management
- Sales analytics and reporting

### 📧 Email Notifications

- Email verification for new users
- Password reset emails
- Order status update notifications
- Low stock alerts for admins

## 🛠️ Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Nodemailer** - Email service
- **Razorpay** - Payment gateway
- **Cron** - Scheduled tasks

### Frontend

- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **React Toastify** - Notifications
- **React Icons** - Icon library
- **Styled Components** - CSS-in-JS
- **Framer Motion** - Animations

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd pizza-delivery-app
```

### 2. Install Dependencies

```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/pizza-delivery-app

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Razorpay Configuration (Test Mode)
RAZORPAY_KEY_ID=rzp_test_your-test-key-id
RAZORPAY_KEY_SECRET=your-test-key-secret

# Admin Email for Notifications
ADMIN_EMAIL=admin@pizzadelivery.com

# Stock Threshold Values
BASE_THRESHOLD=20
SAUCE_THRESHOLD=15
CHEESE_THRESHOLD=10
VEGGIES_THRESHOLD=25
MEAT_THRESHOLD=15
```

### 4. Database Setup

Make sure MongoDB is running on your system or use MongoDB Atlas.

### 5. Start the Application

```bash
# Development mode (runs both server and client)
npm run dev

# Or run separately:
# Terminal 1 - Start server
npm run server

# Terminal 2 - Start client
npm run client
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 👤 Default Admin Account

After running the application for the first time, a default admin account will be created:

- **Email**: admin@pizzadelivery.com
- **Password**: admin123

## 📱 Usage Guide

### For Users

1. **Register/Login**: Create an account or sign in
2. **Browse Menu**: View available pizza varieties
3. **Custom Pizza**: Build your own pizza with custom toppings
4. **Add to Cart**: Select pizzas and add to shopping cart
5. **Checkout**: Complete payment using Razorpay
6. **Track Orders**: Monitor order status in real-time

### For Admins

1. **Login**: Use admin credentials to access admin panel
2. **Manage Inventory**: Add, update, and monitor stock levels
3. **Process Orders**: Update order status and manage deliveries
4. **View Analytics**: Monitor sales and user statistics
5. **User Management**: Manage user accounts and permissions

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify-email/:token` - Email verification
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password/:token` - Password reset

### Pizza & Menu

- `GET /api/pizza` - Get all pizzas
- `GET /api/pizza/:id` - Get pizza by ID
- `GET /api/pizza/customization/options` - Get customization options

### Orders

- `POST /api/order` - Create new order
- `GET /api/order/my-orders` - Get user orders
- `PUT /api/order/:id/status` - Update order status (admin)

### Payment

- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment

### Admin

- `GET /api/admin/dashboard` - Admin dashboard data
- `GET /api/admin/inventory` - Get inventory items
- `POST /api/admin/inventory` - Add inventory item
- `PUT /api/admin/inventory/:id` - Update inventory item

## 🧪 Testing

### Razorpay Test Mode

The application uses Razorpay in test mode. Use these test card details:

- **Card Number**: 4111 1111 1111 1111
- **Expiry**: Any future date
- **CVV**: Any 3 digits
- **Name**: Any name

## 📧 Email Setup

To enable email functionality:

1. **Gmail Setup**:

   - Enable 2-factor authentication
   - Generate an App Password
   - Use the App Password in EMAIL_PASS

2. **Other Providers**:
   - Update EMAIL_HOST and EMAIL_PORT accordingly
   - Configure authentication credentials

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- CORS configuration
- Rate limiting (can be added)
- Environment variable protection

## 📊 Database Schema

### Collections

- **users** - User accounts and authentication
- **pizzas** - Pizza menu items
- **inventory** - Stock management
- **orders** - Order tracking and management

## 🚀 Deployment

### Backend Deployment

1. Set up MongoDB Atlas or cloud MongoDB
2. Configure environment variables
3. Deploy to Heroku, Vercel, or AWS

### Frontend Deployment

1. Build the React app: `npm run build`
2. Deploy to Netlify, Vercel, or AWS S3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact: support@pizzadelivery.com

## 🔄 Updates

### Version 1.0.0

- Initial release with core features
- User authentication and authorization
- Pizza ordering system
- Admin dashboard
- Payment integration
- Email notifications

---

**Happy Pizza Ordering! 🍕**
