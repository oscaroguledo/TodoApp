// API client and utilities
export { apiClient, ApiError, handleApiError } from './client';
export type { ApiResponse } from './client';

// Todo API service
export { TodoApiService, getTodos, getTodoById, createTodo, updateTodo, deleteTodo, bulkUpdateTodos, searchTodos, getTodoStats } from './todos';

// Types
export type { TodosResponse, TodoResponse, CreateTodoRequest, UpdateTodoRequest, TodoQueryParams } from './todos';
