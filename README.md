# BuyBud - Full Stack E-commerce Platform

A modern, full-stack e-commerce platform built with React and Node.js, featuring a responsive design, secure authentication, PayPal payment integration, and comprehensive admin dashboard.

## 🌟 Features

### Customer Features
- **Responsive Design**: Fully responsive layout built with Tailwind CSS
- **Product Catalog**: Browse through organized product categories with advanced filtering
- **Shopping Cart**: Dynamic cart management with real-time updates
- **User Authentication**: Secure JWT-based authentication system
- **PayPal Integration**: Secure payment processing with PayPal
- **Order Tracking**: Track order status and history
- **Product Search**: Advanced search functionality with filters
- **User Profile**: Manage personal information and order history
- **Reviews & Ratings**: Leave product reviews and ratings

### Admin Features
- **Admin Dashboard**: Comprehensive dashboard with analytics and charts
- **Product Management**: Add, edit, and delete products with image upload
- **Order Management**: View and manage customer orders
- **User Management**: Manage customer accounts and permissions
- **Analytics**: Visual charts and reports using ApexCharts
- **Inventory Control**: Track stock levels and manage inventory

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React version for building user interfaces
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Framer Motion** - Smooth animations and transitions
- **React Icons** - Beautiful icon library
- **ApexCharts** - Interactive charts for admin dashboard
- **React Slick** - Carousel/slider component
- **React Toastify** - Toast notifications
- **Flowbite** - Tailwind CSS components
- **PayPal React SDK** - PayPal payment integration

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Parse HTTP cookies

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/HimanshuSinghBisht11/ecommerce-website.git
   cd ecommerce-website
   ```

2. **Install dependencies**:
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PAYPAL_CLIENT_ID=your_paypal_client_id
   PAYPAL_CLIENT_SECRET=your_paypal_client_secret
   ```

4. **Run the application**:
   ```bash
   # Run both frontend and backend concurrently
   npm run dev
   
   # Or run them separately:
   # Backend only
   npm run backend
   
   # Frontend only  
   npm run frontend
   ```

5. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
buybud/
│
├── backend/
│   ├── controllers/          # Request handlers
│   ├── middleware/           # Custom middleware
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   ├── uploads/             # File uploads
│   └── index.js             # Backend entry point
│
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── redux/           # Redux store & slices
│   │   ├── utils/           # Utility functions
│   │   ├── styles/          # CSS files
│   │   ├── App.jsx          # Main App component
│   │   └── main.jsx         # Frontend entry point
│   ├── tailwind.config.js   # Tailwind configuration
│   ├── vite.config.js       # Vite configuration
│   └── package.json         # Frontend dependencies
│
├── package.json             # Root package.json
└── README.md               # Project documentation
```

## 🎨 Design & UI

- **Modern Interface**: Clean, professional design with Tailwind CSS
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Dark/Light Mode**: Theme switching capability
- **Smooth Animations**: Framer Motion for enhanced user experience
- **Interactive Charts**: ApexCharts for data visualization
- **Toast Notifications**: User-friendly feedback system
- **Loading States**: Smooth loading animations and skeletons

## 💳 Payment Integration

- **PayPal Checkout**: Secure payment processing
- **Multiple Payment Methods**: Credit cards, PayPal balance, etc.
- **Order Confirmation**: Automated order confirmation system
- **Transaction History**: Complete payment tracking

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Protected Routes**: Route protection on both client and server
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Secure cross-origin request handling

## 📊 Admin Dashboard

- **Sales Analytics**: Revenue charts and statistics
- **Order Management**: View, update, and track orders
- **Product Analytics**: Best sellers, low stock alerts
- **User Analytics**: Customer registration and activity trends
- **Inventory Management**: Real-time stock tracking

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order status (Admin)



## 📝 Development Scripts

```bash
# Run development servers
npm run dev              # Both frontend & backend
npm run frontend         # Frontend only (Vite dev server)
npm run backend          # Backend only (Nodemon)

# Frontend specific
cd frontend
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Run ESLint
```

## 🔧 Environment Variables

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGO_URI=mongodb://localhost:27017/buybud

# Authentication
JWT_SECRET=your_super_secret_jwt_key

# PayPal Configuration
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
```


## 👨‍💻 Author

**Himanshu Singh Bisht**
- GitHub: [@HimanshuSinghBisht11](https://github.com/HimanshuSinghBisht11)

