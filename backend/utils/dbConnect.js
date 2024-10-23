import mongoose from 'mongoose';

let isConnected = false;

export async function dbConnect() {
  // Check if there's an existing connection
  if (isConnected || mongoose.connection.readyState === 1) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    throw new Error('Failed to connect to MongoDB');
  }
}
