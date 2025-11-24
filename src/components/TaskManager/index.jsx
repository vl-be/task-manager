import { useState, useMemo, useEffect } from 'react';
import { App } from 'antd';
import dayjs from 'dayjs';

import TaskForm from './TaskForm';
import TaskFilters from './TaskFilters';
import TaskList from './TaskList';

const INITIAL_TASKS = [
  { id: 1, text: 'Example 2', note: 'Next time accesses local storage', category: 'Education', completed: true, deadline: null, createdAt: new Date().toISOString() },
  { id: 2, text: 'Example 1', note: 'Next time accesses local storage', category: 'Health', completed: false, deadline: dayjs().add(1, 'day').toISOString(), createdAt: new Date().toISOString() },
];

const DEFAULT_CATEGORIES = ['Education', 'Health', 'Work', 'Other'];

const TaskManager = () => {
  const { message } = App.useApp(); 
  
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('react-dash-tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  // const [categories, setCategories] = useState(() => {
  //   const saved = localStorage.getItem('react-dash-categories');
  //   return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  // });

  const [filterDeadline, setFilterDeadline] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    localStorage.setItem('react-dash-tasks', JSON.stringify(todos));
  }, [todos]);

  // useEffect(() => {
  //   localStorage.setItem('react-dash-categories', JSON.stringify(categories));
  // }, [categories]);

  const handleAddTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [...prev, newTask]);
    message.success('Task added!');
  };

  // const handleAddCategory = (name) => {
  //   if (!categories.includes(name)) {
  //     setCategories((prev) => [...prev, name]);
  //     message.success(`Category "${name}" created`);
  //   }
  // };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter(t => t.id !== id));
  };

  const handleToggle = (id) => {
    setTodos((prev) => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      
      if (filterCategory !== 'all' && todo.category !== filterCategory) return false;
      
      if (filterDeadline) {
          if (!todo.deadline) return false;
          
          const taskDate = dayjs(todo.deadline);
          
          if (taskDate.isAfter(filterDeadline)) {
              return false;
          }
      }

      return true;
    });
  }, [todos, filterCategory, filterDeadline]);

  const activeTasks = filteredTodos.filter(t => !t.completed);
  const completedTasks = filteredTodos.filter(t => t.completed);

  return (
    <div style={{ width: '100%' }}>
      
      <TaskForm 
        onAdd={handleAddTask} 
        categories={DEFAULT_CATEGORIES} 
      />

      <TaskFilters 
        categories={DEFAULT_CATEGORIES}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        filterDeadline={filterDeadline}  
        setFilterDeadline={setFilterDeadline}  
      />

      <TaskList 
        activeTasks={activeTasks}
        completedTasks={completedTasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
      
    </div>
  );
};

export default TaskManager;