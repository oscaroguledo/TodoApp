import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult } from
'react-beautiful-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { Todo } from '@/types/todo';
import { TodoItem } from '@/components/TodoItem';
import { CheckCircle2Icon } from 'lucide-react';
interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string, done: boolean) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
  isDragDisabled: boolean;
}
export function TodoList({
  todos,
  onToggle,
  onEdit,
  onDelete,
  onReorder,
  isDragDisabled
}: TodoListProps) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;
    onReorder(result.source.index, result.destination.index);
  };
  if (todos.length === 0) {
    return (
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
          scale: 0.95
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
        className="flex flex-col items-center justify-center py-12 sm:py-16 px-4 sm:px-6 text-center bg-white rounded-xl border border-slate-100 shadow-sm">
        
        <motion.div 
          className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-3 sm:mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
        >
          <CheckCircle2Icon size={24} className="sm:w-8 sm:h-8" />
        </motion.div>
        <motion.h3 
          className="text-base sm:text-lg font-semibold text-slate-800 mb-1 sm:mb-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          All caught up!
        </motion.h3>
        <motion.p 
          className="text-xs sm:text-sm text-slate-500 max-w-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          There are no tasks matching your current view. Add a new task above to
          get started.
        </motion.p>
      </motion.div>);

  }
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todo-list" isDropDisabled={isDragDisabled}>
        {(provided) =>
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="space-y-2 sm:space-y-3">
          
            <AnimatePresence mode="popLayout">
              {todos.map((todo, index) =>
            <Draggable
              key={todo.id}
              draggableId={todo.id}
              index={index}
              isDragDisabled={isDragDisabled}>
              
                  {(provided, snapshot) =>
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  ...provided.draggableProps.style,
                  ...(snapshot.isDragging ?
                  {
                    zIndex: 50,
                    transform: provided.draggableProps.style?.transform + ' scale(1.05)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                  } :
                  {})
                }}>
                
                      <TodoItem
                  todo={todo}
                  onToggle={onToggle}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  isDragDisabled={isDragDisabled} />
                
                    </div>
              }
                </Draggable>
            )}
            </AnimatePresence>
            {provided.placeholder}
          </div>
        }
      </Droppable>
    </DragDropContext>);

}