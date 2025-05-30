
import React, { useState, useMemo } from 'react';
import { Todo, SortBy, FilterBy } from '@/types/todo';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import TodoFilters from './TodoFilters';
import { DarkModeToggle } from './DarkModeToggle';
import { Plus, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>('deadline');
  const [filterBy, setFilterBy] = useState<FilterBy>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const addTodo = (todoData: Omit<Todo, 'id' | 'createdAt'>) => {
    const newTodo: Todo = {
      ...todoData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setTodos([...todos, newTodo]);
    setIsFormOpen(false);
  };

  const updateTodo = (id: string, updatedData: Partial<Todo>) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, ...updatedData } : todo
    ));
    setEditingTodo(null);
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredAndSortedTodos = useMemo(() => {
    let filtered = todos;

    // Filter by status
    if (filterBy !== 'all') {
      filtered = filtered.filter(todo => todo.status === filterBy);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(todo => 
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'deadline':
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'category':
          return a.category.localeCompare(b.category);
        case 'status':
          const statusOrder = { todo: 1, 'in-progress': 2, completed: 3 };
          return statusOrder[a.status] - statusOrder[b.status];
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });
  }, [todos, filterBy, searchTerm, sortBy]);

  const getStats = () => {
    const total = todos.length;
    const completed = todos.filter(t => t.status === 'completed').length;
    const inProgress = todos.filter(t => t.status === 'in-progress').length;
    const pending = todos.filter(t => t.status === 'todo').length;
    
    return { total, completed, inProgress, pending };
  };

  const stats = getStats();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1" />
          <div className="flex-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
               Kelompok 3
            </h1>
            <p className="text-gray-600 dark:text-gray-300">Manage your tasks with smart prioritization</p>
          </div>
          <div className="flex-1 flex justify-end">
            <DarkModeToggle />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border-l-4 border-blue-500">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Total</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border-l-4 border-yellow-500">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Pending</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{stats.pending}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border-l-4 border-orange-500">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-orange-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">In Progress</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{stats.inProgress}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border-l-4 border-green-500">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Completed</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{stats.completed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Add Button */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1">
          <TodoFilters
            sortBy={sortBy}
            setSortBy={setSortBy}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <Plus className="h-5 w-5" />
          Add Todo
        </button>
      </div>

      {/* Todo List */}
      <div className="space-y-4">
        {filteredAndSortedTodos.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">No todos found</p>
            <p className="text-gray-400 dark:text-gray-500">Add a new todo to get started!</p>
          </div>
        ) : (
          filteredAndSortedTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
              onEdit={setEditingTodo}
            />
          ))
        )}
      </div>

      {/* Todo Form Modal */}
      {(isFormOpen || editingTodo) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <TodoForm
              todo={editingTodo}
              onSubmit={editingTodo ? 
                (data) => updateTodo(editingTodo.id, data) : 
                addTodo
              }
              onCancel={() => {
                setIsFormOpen(false);
                setEditingTodo(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoApp;
