import { Todo } from '@/types/todo';
import { TodoItem } from '@/components/TodoItem';
import { CheckCircle2Icon } from 'lucide-react';
interface TodoListProps {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}
export function TodoList({
  todos,
  onEdit,
  onDelete
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4 sm:px-6 text-center bg-white rounded-xl border border-slate-100 shadow-sm">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-3 sm:mb-4">
          <CheckCircle2Icon size={24} className="sm:w-8 sm:h-8" />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-1">
          All caught up!
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm">
          There are no tasks matching your current view. Add a new task above to
          get started.
        </p>
      </div>);

  }
  return (
    <div className="space-y-2 sm:space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}