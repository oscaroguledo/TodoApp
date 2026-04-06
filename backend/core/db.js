import mongoose from 'mongoose';
import { config } from './config.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message, config.MONGO_URI);
    console.error('Check your MONGO_URI in backend/.env');
    process.exit(1);
  }
};
