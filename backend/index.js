const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db'); // MongoDB connection function
const userRoutes = require('./api/userRoutes'); // Updated path for userRoutes
const loginRoute = require('./api/login'); // Updated path for login route
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
    
    if (process.env.NODE_ENV !== 'production') {
      const server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });

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
    }
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit process if MongoDB connection fails
  }
}

// Session management
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',
    autoRemove: 'native',
  }),
}));

// API routes (updated paths)
app.use('/api/auth', userRoutes); // Updated path for userRoutes
app.use('/api/login', loginRoute); // Updated path for login route
app.use('/api/users', require('./api/userManagement.js')); // Updated path for userManagement
app.use('/api/register', require('./api/registeration')); // Updated path for registration

// Test route to check API status
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : {},
  });
});

// Define the port
const PORT = process.env.PORT || 3001;

// Start the server
startServer();
