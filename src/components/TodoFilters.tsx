
import React from 'react';
import { SortBy, FilterBy } from '@/types/todo';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

interface TodoFiltersProps {
  sortBy: SortBy;
  setSortBy: (sortBy: SortBy) => void;
  filterBy: FilterBy;
  setFilterBy: (filterBy: FilterBy) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const TodoFilters: React.FC<TodoFiltersProps> = ({
  sortBy,
  setSortBy,
  filterBy,
  setFilterBy,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Search todos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Filter by Status</Label>
          <Select value={filterBy} onValueChange={(value: FilterBy) => setFilterBy(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Sort by</Label>
          <Select value={sortBy} onValueChange={(value: SortBy) => setSortBy(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="deadline">Deadline</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="category">Category</SelectItem>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="created">Created Date</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Quick Actions</Label>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setFilterBy('all');
                setSortBy('deadline');
                setSearchTerm('');
              }}
              className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoFilters;
