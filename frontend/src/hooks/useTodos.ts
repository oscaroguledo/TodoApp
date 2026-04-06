import { useState, useEffect, useCallback } from 'react';
import { getTodos, createTodo, updateTodo as updateTodoApi, deleteTodo as deleteTodoApi, ApiError } from '@/apis';
import { Todo } from '@/types/todo';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      const apiError = err as ApiError;
      setError(
        apiError.message || 'Failed to fetch todos. Ensure the backend is running.'
      );
      // Fallback to empty array on error
      setTodos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (newTodo: Omit<Todo, 'id'>) => {
    // Optimistic update with a temporary ID
    const tempId = crypto.randomUUID();
    const optimisticTodo = { ...newTodo, id: tempId };
    setTodos((prev) => [...prev, optimisticTodo]);

    try {
      const createdTodo = await createTodo(newTodo as any);
      // Replace temp ID with real ID from server
      setTodos((prev) => prev.map((t) => t.id === tempId ? createdTodo : t));
    } catch (err) {
      // Revert on failure
      setTodos((prev) => prev.filter((t) => t.id !== tempId));
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to add todo');
    }
  };

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    const previousTodos = [...todos];
    setTodos((prev) =>
      prev.map((t) => t.id === id ? { ...t, ...updates } : t)
    );

    try {
      await updateTodoApi(id, updates as any);
    } catch (err) {
      setTodos(previousTodos);
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to update todo');
    }
  };

  const deleteTodo = async (id: string) => {
    const previousTodos = [...todos];
    setTodos((prev) => prev.filter((t) => t.id !== id));

    try {
      await deleteTodoApi(id);
    } catch (err) {
      setTodos(previousTodos);
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to delete todo');
    }
  };

  const reorderTodos = (startIndex: number, endIndex: number) => {
    const result = Array.from(todos);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    setTodos(result);
    // Optional: Sync new order to backend if your API supports bulk updates or order fields
    // We could call bulkUpdateTodos here if the backend supports it
  };

  // Clear error function
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    reorderTodos,
    clearError,
    refetch: fetchTodos,
  };
}