const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db');
const userRoutes = require('./api/userRoutes');
const loginRoute = require('./api/login');
const logoutRoute = require('./api/logout');
require('dotenv').config();

const app = express();

if (!process.env.JWT_SECRET || !process.env.SESSION_SECRET || !process.env.MONGO_URI) {
  console.error('FATAL ERROR: Missing essential environment variables.');
  process.exit(1);
}
console.log(SESSION_SECRET)
console.log(MONGO_URI)
console.log(FRONTEND_URL)

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://new-media-3a32.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());

connectDB().then(() => {
  console.log('MongoDB connected successfully');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
  process.exit(1);
});

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

app.use('/api/auth', userRoutes);
app.use('/api/login', loginRoute);
app.use('/api/logout', logoutRoute);
app.use('/api/users', require('./api/userManagement.js'));
app.use('/api/register', require('./api/registeration'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : {},
  });
});

app.get('*', (req, res) => {
  res.status(404).send('API route not found.');
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  // app.listen(PORT, () => {
  //   console.log(`Server running on port ${PORT}`);
  // });
}
