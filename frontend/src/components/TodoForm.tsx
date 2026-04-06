import { useEffect, useState } from 'react';
import { PlusIcon, CheckIcon, XIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Todo } from '@/types/todo';
import { Dropdown } from '@/components/Dropdown';
import { DatePicker } from '@/components/DatePicker';
import { Button, Input } from '@/components/ui';
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
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<number>(3);
  const [dueDate, setDueDate] = useState('');
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
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
    setTitle('');
    setPriority(3);
    setDueDate('');
  };

  const priorityOptions = [
    { value: 5, label: 'P5 - Critical' },
    { value: 4, label: 'P4 - High' },
    { value: 3, label: 'P3 - Medium' },
    { value: 2, label: 'P2 - Low' },
    { value: 1, label: 'P1 - Minimal' }
  ];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({
      title: title.trim(),
      priority,
      dueDate: dueDate ?
      new Date(dueDate).toISOString() :
      new Date().toISOString(),
      completed: initialData ? initialData.completed : false
    });
    if (!initialData) {
      resetForm();
    }
  };
  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col gap-3 sm:gap-4">
      
      <div className="w-full">
        <Input
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-2 sm:flex sm:flex-row gap-3 sm:gap-4">
        <div className="flex gap-3 sm:gap-4 w-full sm:w-auto">
          <Dropdown
            options={priorityOptions}
            value={priority}
            onChange={(value) => setPriority(Number(value))}
            className="flex-1 sm:w-32"
          />

          <DatePicker
            value={dueDate}
            onChange={setDueDate}
            className="flex-1 sm:w-40"
          />
        </div>

        {initialData ?
        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
            <Button
              type="submit"
              size="sm"
              icon={<CheckIcon size={14} />}
              className="flex-1 sm:flex-initial"
              title="Update Todo"
            >
              <span className="hidden sm:inline">Update</span>
              <span className="sm:hidden">Save</span>
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              icon={<XIcon size={14} />}
              onClick={onCancelEdit}
              className="flex-1 sm:flex-initial"
              title="Cancel Edit"
            >
              <span className="hidden sm:inline">Cancel</span>
              <span className="sm:hidden">X</span>
            </Button>
          </div> :

        <Button
          type="submit"
          disabled={!title.trim()}
          icon={<PlusIcon size={14} />}
          className="w-full sm:w-auto"
        >
          <span className="hidden sm:inline">Add Task</span>
          <span className="sm:hidden">Add</span>
        </Button>
        }
      </div>
    </motion.form>);

}