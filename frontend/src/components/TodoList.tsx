import React from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult } from
'react-beautiful-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';
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
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-xl border border-gray-100 shadow-sm">
        
        <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2Icon size={32} />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          All caught up!
        </h3>
        <p className="text-gray-500 max-w-sm">
          There are no tasks matching your current view. Add a new task above to
          get started.
        </p>
      </motion.div>);

  }
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todo-list" isDropDisabled={isDragDisabled}>
        {(provided) =>
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="space-y-3">
          
            <AnimatePresence mode="popLayout">
              {todos.map((todo, index) =>
            <Draggable
              key={todo.id}
              draggableId={todo.id}
              index={index}
              isDragDisabled={isDragDisabled}>
              
                  {(provided, snapshot) =>
              <motion.div
                layout
                initial={{
                  opacity: 0,
                  scale: 0.95
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  transition: {
                    duration: 0.2
                  }
                }}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  ...provided.draggableProps.style,
                  ...(snapshot.isDragging ?
                  {
                    zIndex: 50
                  } :
                  {})
                }}>
                
                      <TodoItem
                  todo={todo}
                  onToggle={onToggle}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  isDragDisabled={isDragDisabled} />
                
                    </motion.div>
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