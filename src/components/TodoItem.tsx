
import React from 'react';
import { Todo } from '@/types/todo';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, Pencil, Trash, Check, X } from 'lucide-react';
import { format, isToday, isTomorrow, isPast } from 'date-fns';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, data: Partial<Todo>) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete, onEdit }) => {
  const isOverdue = isPast(todo.deadline) && todo.status !== 'completed';
  const isCompleted = todo.status === 'completed';

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'work': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'personal': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'shopping': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'health': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDeadline = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM dd, yyyy');
  };

  const toggleStatus = () => {
    const statusFlow = {
      'todo': 'in-progress',
      'in-progress': 'completed',
      'completed': 'todo'
    } as const;
    
    onUpdate(todo.id, { status: statusFlow[todo.status] });
  };

  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-200 border-l-4",
      isOverdue && !isCompleted && "border-l-red-500 bg-red-50 dark:bg-red-900/20",
      isCompleted && "border-l-green-500 bg-green-50 dark:bg-green-900/20",
      !isOverdue && !isCompleted && "border-l-blue-500"
    )}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className={cn(
              "font-medium text-gray-900 dark:text-gray-100 truncate",
              isCompleted && "line-through text-gray-500 dark:text-gray-400"
            )}>
              {todo.title}
            </h3>
            {isOverdue && !isCompleted && (
              <Badge variant="destructive" className="text-xs">
                Overdue
              </Badge>
            )}
          </div>

          {todo.description && (
            <p className={cn(
              "text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2",
              isCompleted && "line-through"
            )}>
              {todo.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mb-3">
            <Badge className={getPriorityColor(todo.priority)}>
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
            </Badge>
            <Badge className={getCategoryColor(todo.category)}>
              {todo.category.charAt(0).toUpperCase() + todo.category.slice(1)}
            </Badge>
            <Badge className={getStatusColor(todo.status)}>
              {todo.status === 'in-progress' ? 'In Progress' : 
               todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}
            </Badge>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span className={isOverdue && !isCompleted ? 'text-red-600 dark:text-red-400 font-medium' : ''}>
                {formatDeadline(todo.deadline)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{format(todo.deadline, 'HH:mm')}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={toggleStatus}
            variant="outline"
            size="sm"
            className={cn(
              "flex items-center gap-1",
              todo.status === 'completed' && "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50"
            )}
          >
            {todo.status === 'completed' ? (
              <>
                <Check className="h-4 w-4" />
                Done
              </>
            ) : todo.status === 'in-progress' ? (
              <>
                <Check className="h-4 w-4" />
                Complete
              </>
            ) : (
              <>
                <Clock className="h-4 w-4" />
                Start
              </>
            )}
          </Button>

          <Button
            onClick={() => onEdit(todo)}
            variant="outline"
            size="sm"
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <Button
            onClick={() => onDelete(todo.id)}
            variant="outline"
            size="sm"
            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
