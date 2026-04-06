import express from 'express';
import cors from 'cors';
import { config } from './core/config.js';
import { connectDB } from './core/db.js';
import todoRoutes from './routes/todo.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/todos', todoRoutes);

// Start server
app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));