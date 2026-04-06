import React, { useEffect, useState } from 'react';
import { PlusIcon, CheckIcon, XIcon } from 'lucide-react';
import { Todo } from '../types/todo';
interface TodoFormProps {
  onSubmit: (todo: Omit<Todo, 'id'>) => void;
  initialData?: Todo | null;
  onCancelEdit?: () => void;
}
export function TodoForm({
  onSubmit,
  initialData,
  onCancelEdit
}: TodoFormProps) {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState<number>(3);
  const [dueDate, setDueDate] = useState('');
  useEffect(() => {
    if (initialData) {
      setTask(initialData.task);
      setPriority(initialData.priority);
      // Format date for input type="date" (YYYY-MM-DD)
      const dateStr = initialData.dueDate ?
      new Date(initialData.dueDate).toISOString().split('T')[0] :
      '';
      setDueDate(dateStr);
    } else {
      resetForm();
    }
  }, [initialData]);
  const resetForm = () => {
    setTask('');
    setPriority(3);
    setDueDate('');
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;
    onSubmit({
      task: task.trim(),
      priority,
      dueDate: dueDate ?
      new Date(dueDate).toISOString() :
      new Date().toISOString(),
      done: initialData ? initialData.done : false
    });
    if (!initialData) {
      resetForm();
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      
      <div className="flex-1 w-full">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          required />
        
      </div>

      <div className="flex gap-3 w-full sm:w-auto">
        <select
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer">
          
          <option value={5}>P5 - Critical</option>
          <option value={4}>P4 - High</option>
          <option value={3}>P3 - Medium</option>
          <option value={2}>P2 - Low</option>
          <option value={1}>P1 - Minimal</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          required />
        

        {initialData ?
        <div className="flex gap-2 ml-auto sm:ml-0">
            <button
            type="submit"
            className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center"
            title="Update Todo">
            
              <CheckIcon size={20} />
            </button>
            <button
            type="button"
            onClick={onCancelEdit}
            className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center"
            title="Cancel Edit">
            
              <XIcon size={20} />
            </button>
          </div> :

        <button
          type="submit"
          disabled={!task.trim()}
          className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ml-auto sm:ml-0 font-medium">
          
            <PlusIcon size={20} />
            <span className="hidden sm:inline">Add</span>
          </button>
        }
      </div>
    </form>);

}