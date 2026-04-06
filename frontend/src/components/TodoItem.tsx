import React from 'react';
import { GripVertical, PencilIcon, TrashIcon, CalendarIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Todo } from '../types/todo';
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, done: boolean) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  isDragDisabled?: boolean;
}
const priorityColors: Record<number, string> = {
  5: 'bg-red-500',
  4: 'bg-orange-500',
  3: 'bg-yellow-500',
  2: 'bg-blue-500',
  1: 'bg-gray-400'
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
    <div
      className={`group flex items-center gap-3 p-4 bg-white rounded-xl border shadow-sm transition-all ${todo.done ? 'border-gray-200 bg-gray-50/50' : 'border-gray-100 hover:border-emerald-200 hover:shadow-md'}`}>
      
      <div
        className={`text-gray-400 ${isDragDisabled ? 'opacity-0 w-0 overflow-hidden' : 'cursor-grab active:cursor-grabbing hover:text-gray-600'}`}>
        
        <GripVertical size={20} />
      </div>

      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={(e) => onToggle(todo.id, e.target.checked)}
          className="peer appearance-none w-6 h-6 border-2 border-gray-300 rounded-full checked:bg-emerald-500 checked:border-emerald-500 cursor-pointer transition-colors" />
        
        <motion.div
          initial={false}
          animate={{
            scale: todo.done ? 1 : 0,
            opacity: todo.done ? 1 : 0
          }}
          className="absolute pointer-events-none text-white">
          
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4">
            
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
        <span
          className={`text-base font-medium truncate transition-colors ${todo.done ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
          
          {todo.task}
        </span>

        <div className="flex items-center gap-3 text-sm mt-1 sm:mt-0">
          <div className="flex items-center gap-1.5">
            <div
              className={`w-2.5 h-2.5 rounded-full ${priorityColors[todo.priority]} ${todo.done ? 'opacity-50' : ''}`} />
            
            <span
              className={`text-xs font-medium ${todo.done ? 'text-gray-400' : 'text-gray-600'}`}>
              
              P{todo.priority}
            </span>
          </div>

          <div
            className={`flex items-center gap-1 text-xs ${todo.done ? 'text-gray-400' : 'text-gray-500'}`}>
            
            <CalendarIcon size={14} />
            {formattedDate}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(todo)}
          className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
          title="Edit">
          
          <PencilIcon size={18} />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete">
          
          <TrashIcon size={18} />
        </button>
      </div>
    </div>);

}