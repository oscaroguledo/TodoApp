import { apiClient, ApiResponse, handleApiError } from './client';
import { API_ENDPOINTS } from './config';
import { Todo } from '@/types/todo';

// Response types
export interface TodosResponse extends ApiResponse<Todo[]> {
  data: Todo[];
}

export interface TodoResponse extends ApiResponse<Todo> {
  data: Todo;
}

export interface CreateTodoRequest {
  title: string;
  completed: boolean;
  priority: number;
  dueDate: string;
}

export interface UpdateTodoRequest {
  title?: string;
  completed?: boolean;
  priority?: number;
  dueDate?: string;
}

export interface TodoQueryParams {
  page?: number;
  limit?: number;
  sortBy?: 'priority' | 'dueDate' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  search?: string;
  completed?: boolean;
}

// Todo API service
export class TodoApiService {
  /**
   * Fetch all todos with optional query parameters
   */
  static async getTodos(params?: TodoQueryParams): Promise<Todo[]> {
    try {
      const response = await apiClient.get<TodosResponse>(API_ENDPOINTS.TODOS, { params });
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  /**
   * Fetch a single todo by ID
   */
  static async getTodoById(id: string): Promise<Todo> {
    try {
      const response = await apiClient.get<TodoResponse>(`${API_ENDPOINTS.TODOS}/${id}`);
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  /**
   * Create a new todo
   */
  static async createTodo(todoData: CreateTodoRequest): Promise<Todo> {
    try {
      const response = await apiClient.post<TodoResponse>(API_ENDPOINTS.TODOS, todoData);
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  /**
   * Update an existing todo
   */
  static async updateTodo(id: string, updates: UpdateTodoRequest): Promise<Todo> {
    try {
      const response = await apiClient.put<TodoResponse>(`${API_ENDPOINTS.TODOS}/${id}`, updates);
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  /**
   * Delete a todo
   */
  static async deleteTodo(id: string): Promise<void> {
    try {
      await apiClient.delete(`${API_ENDPOINTS.TODOS}/${id}`);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  /**
   * Bulk update todos (for reordering or bulk status changes)
   */
  static async bulkUpdateTodos(updates: Array<{ id: string; updates: UpdateTodoRequest }>): Promise<Todo[]> {
    try {
      const response = await apiClient.put<TodosResponse>(`${API_ENDPOINTS.TODOS}/bulk`, { updates });
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  /**
   * Search todos
   */
  static async searchTodos(query: string): Promise<Todo[]> {
    try {
      const response = await apiClient.get<TodosResponse>(`${API_ENDPOINTS.TODOS}/search`, {
        params: { q: query }
      });
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  /**
   * Get todo statistics
   */
  static async getTodoStats(): Promise<{
    total: number;
    completed: number;
    pending: number;
    overdue: number;
  }> {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.TODOS}/stats`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
}

// Export individual methods for convenience
export const {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  bulkUpdateTodos,
  searchTodos,
  getTodoStats,
} = TodoApiService;
