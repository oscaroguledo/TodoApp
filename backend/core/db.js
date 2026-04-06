import mongoose from 'mongoose';
import { config } from './config.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    console.error('Check your MONGO_URI in backend/.env');
    console.error('For local MongoDB: mongodb://localhost:27017/todoapp');
    console.error('For Atlas: mongodb+srv://username:password@cluster.mongodb.net/todoapp');
    process.exit(1);
  }
};
