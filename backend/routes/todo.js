import express from 'express';
import { getAllTodos, createTodo, updateTodo, deleteTodo } from '../services/todos.js';
import { successResponse, createdResponse, notFoundResponse, errorResponse } from '../core/response.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const todos = await getAllTodos();
    return successResponse(res, todos);
  } catch (error) {
    return errorResponse(res, 'Failed to fetch todos');
  }
});

router.post('/', async (req, res) => {
  try {
    const todo = await createTodo(req.body);
    return createdResponse(res, todo, 'Todo created successfully');
  } catch (error) {
    return errorResponse(res, 'Failed to create todo', 500);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const todo = await updateTodo(req.params.id, req.body);
    if (!todo) {
      return notFoundResponse(res, 'Todo not found');
    }
    return successResponse(res, todo, 'Todo updated successfully');
  } catch (error) {
    return errorResponse(res, 'Failed to update todo', 500);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await deleteTodo(req.params.id);
    return successResponse(res, result, 'Todo deleted successfully');
  } catch (error) {
    return errorResponse(res, 'Failed to delete todo', 500);
  }
});

export default router;
