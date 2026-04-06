import { GripVertical, PencilIcon, TrashIcon, CalendarIcon } from 'lucide-react';
import { Todo } from '@/types/todo';
import { Button, Badge, Checkbox, Card } from '@/components/ui';
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, done: boolean) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  isDragDisabled?: boolean;
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
  onToggle,
  onEdit,
  onDelete,
  isDragDisabled
}: TodoItemProps) {
  const formattedDate = new Date(todo.dueDate).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric'
  });
  return (
    <Card
      variant="default"
      hover={!todo.done}
      className={`group transition-all ${todo.done ? 'opacity-75' : ''}`}
    >
      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
        <div
          className={`text-slate-400 mt-0.5 sm:mt-0 ${isDragDisabled ? 'opacity-0 w-0 overflow-hidden' : 'cursor-grab active:cursor-grabbing hover:text-slate-600'}`}>
          
          <GripVertical size={16} className="sm:w-5 sm:h-5" />
        </div>

        <div className="flex-shrink-0 mt-0.5 sm:mt-0">
          <Checkbox
            checked={todo.done}
            onChange={(e) => onToggle(todo.id, e.target.checked)}
            disabled={todo.done}
          />
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-1 sm:gap-2">
          <span
            className={`text-sm sm:text-base font-medium truncate transition-colors ${todo.done ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
            
            {todo.task}
          </span>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
            <Badge variant={priorityBadgeVariants[todo.priority]} size="sm">
              P{todo.priority}
            </Badge>

            <div className={`flex items-center gap-1 ${todo.done ? 'text-slate-400' : 'text-slate-500'}`}>
              
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
    </Card>);

}