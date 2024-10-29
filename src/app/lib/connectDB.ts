import mongoose from 'mongoose';

// const connectDB = async () => {
//   if (mongoose.connection.readyState >= 1) return;

//   return mongoose.connect(process.env.MONGODB_URI || '');
// };

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI || '', {
      serverSelectionTimeoutMS: 15000,
    });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Could not connect to MongoDB');
  }
};

export default connectDB;
