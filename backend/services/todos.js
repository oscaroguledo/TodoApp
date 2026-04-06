import { config } from '../core/config.js';
import { Todo } from '../models/todo.js';

export const getAllTodos = async () => {
  return await Todo.find();
};

export const createTodo = async (data) => {
  const todo = new Todo(data);
  return await todo.save();
};

export const updateTodo = async (id, data) => {
  return await Todo.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTodo = async (id) => {
  await Todo.findByIdAndDelete(id);
  return { message: 'Todo deleted' };
};
