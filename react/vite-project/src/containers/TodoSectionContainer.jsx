// src/containers/TodoSectionContainer.jsx
import React, { useState } from 'react';
import TodoSection from '../components/TodoSection';

function TodoSectionContainer({ tasks, onAddTask, onStartTask }) {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(newTaskTitle);
    setNewTaskTitle('');
  };

  return (
    <TodoSection
      tasks={tasks}
      newTaskTitle={newTaskTitle}
      setNewTaskTitle={setNewTaskTitle}
      handleSubmit={handleSubmit}
      onStartTask={onStartTask}
    />
  );
}

export default TodoSectionContainer;
