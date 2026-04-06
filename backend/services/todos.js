import { Todo } from '../models/todo.js';

const mapTodo = (todo) => ({
  id: todo._id.toString(),
  title: todo.title,
  completed: todo.completed,
  priority: todo.priority,
  dueDate: todo.dueDate
});

export const getAllTodos = async () => {
  const todos = await Todo.find();
  return todos.map(mapTodo);
};

export const createTodo = async (data) => {
  const todo = new Todo(data);
  const saved = await todo.save();
  return mapTodo(saved);
};

export const updateTodo = async (id, data) => {
  const updated = await Todo.findByIdAndUpdate(id, data, { new: true });
  return mapTodo(updated);
};

export const deleteTodo = async (id) => {
  await Todo.findByIdAndDelete(id);
  return { message: 'Todo deleted' };
};
