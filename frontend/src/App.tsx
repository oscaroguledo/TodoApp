import { useMemo, useState, useRef, useEffect, lazy, Suspense } from 'react';
import {
  SearchIcon,
  ArrowUpDownIcon,
  CalendarClockIcon,
} from
'lucide-react';
import { useTodos } from '@/hooks/useTodos';
import { TodoLogo } from '@/components/TodoLogo';
import { Input } from '@/components/ui';

// Lazy loaded components
const TodoForm = lazy(() => import('@/components/TodoForm').then(module => ({ default: module.TodoForm })));
const TodoList = lazy(() => import('@/components/TodoList').then(module => ({ default: module.TodoList })));
const Pagination = lazy(() => import('@/components/Pagination').then(module => ({ default: module.Pagination })));
import { Todo, SortOption } from '@/types/todo';
export function App() {
  const {
    todos,
    loading,
    addTodo,
    updateTodo,
    deleteTodo,
    reorderTodos
  } = useTodos();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('none');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const todosPerPage = 10;

  // System theme detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = () => {
      if (mediaQuery.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    updateTheme();
    mediaQuery.addEventListener('change', updateTheme);
    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      // Escape to clear search
      if (e.key === 'Escape' && searchQuery) {
        setSearchQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchQuery]);

  // Reset to page 1 when search or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy]);

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      // Trigger search (already handled by the input's onChange)
      searchInputRef.current?.focus();
    } else {
      searchInputRef.current?.focus();
    }
  };
  // Filter and sort logic
  const filteredAndSortedTodos = useMemo(() => {
    let result = [...todos];
    // 1. Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((todo) => todo.title.toLowerCase().includes(query));
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

  // Pagination logic
  const paginatedTodos = useMemo(() => {
    const startIndex = (currentPage - 1) * todosPerPage;
    const endIndex = startIndex + todosPerPage;
    return filteredAndSortedTodos.slice(startIndex, endIndex);
  }, [filteredAndSortedTodos, currentPage, todosPerPage]);

  const totalPages = Math.ceil(filteredAndSortedTodos.length / todosPerPage);
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 md:py-8 lg:py-12">
        {/* Header */}
        <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10">
              <TodoLogo className="w-full h-full" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 truncate">
                Tasks
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 hidden sm:block">
                Manage your day efficiently
              </p>
            </div>
          </div>

        </header>

        {/* Controls: Search & Sort */}
        <div className="mb-4 sm:mb-6 flex flex-col lg:flex-row gap-3 lg:gap-4">
          <div className="flex-1 lg:flex-initial lg:w-96">
            <Input
              ref={searchInputRef}
              placeholder="Search tasks... (Ctrl+K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setSearchQuery('');
                }
              }}
              startIcon={
                <button
                  type="button"
                  onClick={handleSearchClick}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                  title="Search (Ctrl+K)"
                >
                  <SearchIcon size={16} className="sm:w-4 sm:h-4" />
                </button>
              }
              clearable={!!searchQuery}
              onClear={() => setSearchQuery('')}
            />
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={() =>
              setSortBy(sortBy === 'priority' ? 'none' : 'priority')
              }
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border transition-all shadow-sm text-xs sm:text-sm font-medium ${sortBy === 'priority' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
              
              <ArrowUpDownIcon size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Priority</span>
              <span className="sm:hidden">P</span>
            </button>
            <button
              onClick={() =>
              setSortBy(sortBy === 'dueDate' ? 'none' : 'dueDate')
              }
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border transition-all shadow-sm text-xs sm:text-sm font-medium ${sortBy === 'dueDate' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
              
              <CalendarClockIcon size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Due Date</span>
              <span className="sm:hidden">Date</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="mb-6 sm:mb-8">
          <Suspense fallback={
            <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-blue-500"></div>
            </div>
          }>
            <TodoForm
              onSubmit={handleAddOrUpdate}
              initialData={editingTodo}
              onCancelEdit={() => setEditingTodo(null)} />
          </Suspense>
        </div>

        {/* List */}
        {loading && todos.length === 0 ?
        <div className="flex justify-center py-8 sm:py-12">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-500"></div>
          </div> :
        <>
        <Suspense fallback={
          <div className="flex justify-center py-8 sm:py-12">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-500"></div>
          </div>
        }>
          <TodoList
            todos={paginatedTodos}
            onToggle={(id, completed) =>
            updateTodo(id, {
              completed
            })
            }
            onEdit={setEditingTodo}
            onDelete={deleteTodo}
            onReorder={reorderTodos}
            isDragDisabled={isDragDisabled} />
        </Suspense>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 sm:mt-8">
            <Suspense fallback={
              <div className="flex items-center justify-center py-3 sm:py-4">
                <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-blue-500"></div>
              </div>
            }>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </Suspense>
          </div>
        )}
        </>
        }
      </div>
    </div>);

}