const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db'); // MongoDB connection function
const userRoutes = require('./api/userRoutes'); // Updated path for userRoutes
const loginRoute = require('./api/login'); // Updated path for login route
const logoutRoute = require('./api/logout'); // Updated path for logout route
require('dotenv').config(); // Load environment variables

const app = express();

// Ensure essential environment variables are loaded
if (!process.env.JWT_SECRET || !process.env.SESSION_SECRET || !process.env.MONGO_URI) {
  console.error('FATAL ERROR: Missing essential environment variables.');
  process.exit(1); // Exit if important variables are missing
}

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://new-media-3a32.vercel.app', // Allow requests from frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true, // Enable credentials (cookies, sessions)
}));
app.use(morgan('dev')); // Logging HTTP requests
app.use(express.json()); // Parse JSON request bodies

// MongoDB connection
connectDB().then(() => {
  console.log('MongoDB connected successfully');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
  process.exit(1); // Exit process if MongoDB connection fails
});

// Session management
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Secure cookies in production
    httpOnly: true, // Prevent client-side access to cookies
    maxAge: 1000 * 60 * 60 * 24, // 1-day expiration for cookies
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI, // MongoDB connection for sessions
    collectionName: 'sessions',
    autoRemove: 'native', // Automatically remove expired sessions
  }),
}));

// API routes (updated paths)
app.use('/api/auth', userRoutes); // Updated path for userRoutes
app.use('/api/login', loginRoute); // Updated path for login route
app.use('/api/logout', logoutRoute); // Added path for logout route
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
    error: process.env.NODE_ENV === 'development' ? err.message : {}, // Show error only in development
  });
});

// Catch-all route for 404 errors
app.get('*', (req, res) => {
  res.status(404).send('API route not found.');
});

// Do not include app.listen() for Vercel as it handles the server internally
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
