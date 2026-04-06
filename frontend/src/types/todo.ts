export interface Todo {
  id: string;
  task: string;
  done: boolean;
  priority: number; // 1 (lowest) to 5 (highest)
  dueDate: string; // ISO date string
}

export type SortOption = 'none' | 'priority' | 'dueDate';