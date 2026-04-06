import React, { useMemo, useState } from 'react';
import {
  SearchIcon,
  ArrowUpDownIcon,
  CalendarClockIcon,
  AlertCircleIcon } from
'lucide-react';
import { useTodos } from './hooks/useTodos';
import { TodoLogo } from './components/TodoLogo';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { Todo, SortOption } from './types/todo';
export function App() {
  const {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    reorderTodos
  } = useTodos();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('none');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  // Filter and sort logic
  const filteredAndSortedTodos = useMemo(() => {
    let result = [...todos];
    // 1. Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((todo) => todo.task.toLowerCase().includes(query));
    }
    // 2. Sort
    if (sortBy === 'priority') {
      result.sort((a, b) => b.priority - a.priority);
    } else if (sortBy === 'dueDate') {
      result.sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
    }
    return result;
  }, [todos, searchQuery, sortBy]);
  // Disable drag and drop if we are sorting or searching
  const isDragDisabled = sortBy !== 'none' || searchQuery.trim() !== '';
  const handleAddOrUpdate = (todoData: Omit<Todo, 'id'>) => {
    if (editingTodo) {
      updateTodo(editingTodo.id, todoData);
      setEditingTodo(null);
    } else {
      addTodo(todoData);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <TodoLogo className="w-10 h-10" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Tasks
              </h1>
              <p className="text-sm text-gray-500">
                Manage your day efficiently
              </p>
            </div>
          </div>

          {/* Note for Magic Patterns user regarding PWA */}
          <div className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full hidden md:block">
            PWA ready: Configure manifest.json after deployment
          </div>
        </header>

        {/* Error Banner */}
        {error &&
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700">
            <AlertCircleIcon className="shrink-0 mt-0.5" size={20} />
            <p className="text-sm">{error}</p>
          </div>
        }

        {/* Controls: Search & Sort */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <SearchIcon size={18} />
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm" />
            
            {searchQuery &&
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
              
                <span className="text-sm font-medium">Clear</span>
              </button>
            }
          </div>

          <div className="flex gap-2">
            <button
              onClick={() =>
              setSortBy(sortBy === 'priority' ? 'none' : 'priority')
              }
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all shadow-sm text-sm font-medium ${sortBy === 'priority' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              
              <ArrowUpDownIcon size={16} />
              Priority
            </button>
            <button
              onClick={() =>
              setSortBy(sortBy === 'dueDate' ? 'none' : 'dueDate')
              }
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all shadow-sm text-sm font-medium ${sortBy === 'dueDate' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              
              <CalendarClockIcon size={16} />
              Due Date
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="mb-8">
          <TodoForm
            onSubmit={handleAddOrUpdate}
            initialData={editingTodo}
            onCancelEdit={() => setEditingTodo(null)} />
          
        </div>

        {/* List */}
        {loading && todos.length === 0 ?
        <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
          </div> :

        <TodoList
          todos={filteredAndSortedTodos}
          onToggle={(id, done) =>
          updateTodo(id, {
            done
          })
          }
          onEdit={setEditingTodo}
          onDelete={deleteTodo}
          onReorder={reorderTodos}
          isDragDisabled={isDragDisabled} />

        }
      </div>
    </div>);

}