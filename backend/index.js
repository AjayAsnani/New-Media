const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose'); // Import mongoose for connection management
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const loginRoute = require('./routes/login');
const logout = require('./routes/logout.js')
require('dotenv').config(); // Load environment variables

const app = express();

// Ensure important environment variables are loaded
if (!process.env.JWT_SECRET || !process.env.SESSION_SECRET || !process.env.MONGO_URI) {
  console.error('FATAL ERROR: Missing essential environment variables.');
  process.exit(1); // Exit process if important environment variables are missing
}

// Connect to MongoDB and only start the server if the connection succeeds
connectDB()
  .then(() => {
    console.log('MongoDB connected successfully');
    startServer(); // Start the server only after MongoDB is connected
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1); // Exit process on MongoDB connection failure
  });

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Session management
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1-day expiration for cookies
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',
    autoRemove: 'native', // Automatically remove expired sessions
  }, function (err) {
    if (err) {
      console.error('Session store connection failed:', err.message);
    }
  })
}));

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/login', loginRoute);
app.use('/api/users', require('./routes/userManagement.js'));
app.use('/api/register', require('./routes/registration'));
app.use('/api/logout', logout);

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : {}, // Only expose error details in development
  });
});

// Function to handle server startup after MongoDB connection is established
const startServer = () => {
  const PORT = process.env.PORT || 3001;
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  // Graceful shutdown handler
  const shutdown = (signal) => {
    console.log(`${signal} signal received: closing HTTP server`);
    server.close(() => {
      console.log('HTTP server closed');
      if (mongoose.connection.readyState === 1) {
        mongoose.connection.close(() => {
          console.log('MongoDB connection closed');
          process.exit(0); // Gracefully exit after closing the database
        });
      } else {
        process.exit(0); // Exit immediately if no MongoDB connection
      }
    });
  };

  // Graceful shutdown on SIGTERM (for production environments)
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  // Graceful shutdown on SIGINT (Ctrl+C)
  process.on('SIGINT', () => shutdown('SIGINT'));
};

