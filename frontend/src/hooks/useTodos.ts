import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Todo } from '../types/todo';

const API_URL = 'http://localhost:3000/todos';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setTodos(res.data);
      setError(null);
    } catch (err) {
      setError(
        'Failed to fetch todos. Ensure the backend is running at http://localhost:3000'
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
      const res = await axios.post(API_URL, newTodo);
      // Replace temp ID with real ID from server
      setTodos((prev) => prev.map((t) => t.id === tempId ? res.data : t));
    } catch (err) {
      // Revert on failure
      setTodos((prev) => prev.filter((t) => t.id !== tempId));
      setError('Failed to add todo');
    }
  };

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    const previousTodos = [...todos];
    setTodos((prev) =>
    prev.map((t) => t.id === id ? { ...t, ...updates } : t)
    );

    try {
      await axios.put(`${API_URL}/${id}`, updates);
    } catch (err) {
      setTodos(previousTodos);
      setError('Failed to update todo');
    }
  };

  const deleteTodo = async (id: string) => {
    const previousTodos = [...todos];
    setTodos((prev) => prev.filter((t) => t.id !== id));

    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (err) {
      setTodos(previousTodos);
      setError('Failed to delete todo');
    }
  };

  const reorderTodos = (startIndex: number, endIndex: number) => {
    const result = Array.from(todos);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    setTodos(result);
    // Optional: Sync new order to backend if your API supports bulk updates or order fields
  };

  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    reorderTodos
  };
}