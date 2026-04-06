import { PencilIcon, TrashIcon, CalendarIcon } from 'lucide-react';
import { Todo } from '@/types/todo';
import { Button, Badge, Card } from '@/components/ui';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

const priorityBadgeVariants: Record<number, 'error' | 'warning' | 'default' | 'secondary'> = {
  5: 'error',
  4: 'warning', 
  3: 'default',
  2: 'secondary',
  1: 'secondary'
};

export function TodoItem({
  todo,
  onEdit,
  onDelete
}: TodoItemProps) {
  const formattedDate = new Date(todo.dueDate).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric'
  });

  return (
    <Card
      variant="default"
      hover={!todo.completed}
      className={`group transition-all ${todo.completed ? 'opacity-75' : ''}`}
    >
      <div className="flex items-start sm:items-center gap-2 sm:gap-3 px-3 py-2">
        <div className="flex-1 min-w-0 flex flex-col gap-1 sm:gap-2">
          <span
            className={`text-sm sm:text-base font-medium truncate transition-colors ${todo.completed ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
            {todo.title}
          </span>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
            <Badge variant={priorityBadgeVariants[todo.priority]} size="sm">
              P{todo.priority}
            </Badge>

            <div className={`flex items-center gap-1 ${todo.completed ? 'text-slate-400' : 'text-slate-500'}`}>
              <CalendarIcon size={12} className="sm:w-3 sm:h-3" />
              <span className="hidden sm:inline">{formattedDate}</span>
              <span className="sm:hidden">{formattedDate.split(' ')[0]}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            icon={<PencilIcon size={14} />}
            onClick={() => onEdit(todo)}
            title="Edit"
            className="p-1.5 sm:p-2"
          />
          <Button
            variant="ghost"
            size="sm"
            icon={<TrashIcon size={14} />}
            onClick={() => onDelete(todo.id)}
            title="Delete"
            className="p-1.5 sm:p-2"
          />
        </div>
      </div>
    </Card>
  );
}