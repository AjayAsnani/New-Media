const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db'); // MongoDB connection function
const userRoutes = require('./routes/userRoutes'); // User-related routes
const loginRoute = require('./routes/login'); // Login route
require('dotenv').config(); // Load environment variables

const app = express();

// Ensure essential environment variables are loaded
if (!process.env.JWT_SECRET || !process.env.SESSION_SECRET || !process.env.MONGO_URI) {
  console.error('FATAL ERROR: Missing essential environment variables.');
  process.exit(1); // Exit if important variables are missing
}

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://new-media-3a32.vercel.app/', // Allow requests from frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true, // Enable credentials (cookies, sessions)
}));
app.use(morgan('dev')); // Logging HTTP requests
app.use(express.json()); // Parse JSON request bodies

// MongoDB connection
async function startServer() {
  try {
    await connectDB();
    console.log('MongoDB connected successfully');
    
    // Start the server after MongoDB connection is established
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Graceful shutdown handling
    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received: closing HTTP server');
      server.close(() => {
        console.log('HTTP server closed');
        if (mongoose.connection.readyState === 1) {
          mongoose.connection.close(() => {
            console.log('MongoDB connection closed');
          });
        }
      });
    });

    process.on('SIGINT', () => {
      console.log('SIGINT received. Shutting down gracefully...');
      server.close(() => {
        console.log('Server has shut down');
        process.exit(0);
      });
    });

  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit process if MongoDB connection fails
  }
}

// Session management with MongoDB-backed session store
app.use(session({
  secret: process.env.SESSION_SECRET, // Secret used to sign the session ID
  resave: false,
  saveUninitialized: false, // Do not save empty sessions
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Secure cookies in production
    httpOnly: true, // Prevent client-side JavaScript from accessing cookies
    maxAge: 1000 * 60 * 60 * 24, // 1-day expiration for cookies
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI, // MongoDB connection for sessions
    collectionName: 'sessions',
    autoRemove: 'native', // Automatically remove expired sessions
  }, (err) => {
    if (err) {
      console.error('Session store connection failed:', err.message);
    }
  }),
}));

// API routes
app.use('/api/auth', userRoutes); // User authentication routes
app.use('/api/login', loginRoute); // Login route
app.use('/api/users', require('./api/userManagement.js')); // User management routes
app.use('/api/register', require('./api/registration')); // Registration routes

// Test route to check API status
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : {}, // Show error only in development
  });
});

// Define the port
const PORT = process.env.PORT || 3001;

// Start the server
startServer();
