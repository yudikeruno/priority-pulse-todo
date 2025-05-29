
export interface Todo {
  id: string;
  title: string;
  description?: string;
  deadline: Date;
  priority: 'high' | 'medium' | 'low';
  category: 'work' | 'personal' | 'shopping' | 'health';
  status: 'todo' | 'in-progress' | 'completed';
  createdAt: Date;
}

export type SortBy = 'deadline' | 'priority' | 'category' | 'status' | 'created';
export type FilterBy = 'all' | 'todo' | 'in-progress' | 'completed';
