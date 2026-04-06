import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: String,
  completed: { type: Boolean, default: false },
  priority: { type: Number, default: 1 },
  dueDate: Date
});

export const Todo = mongoose.model('Todo', todoSchema);
