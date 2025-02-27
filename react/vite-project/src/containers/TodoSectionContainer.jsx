import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TodoSection from '../components/TodoSection';

function TodoSectionContainer({ tasks, onAddTask, onStartTask, openModal }) {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      onAddTask({ title: newTaskTitle, description: '' });
      setNewTaskTitle('');
    }
  };

  return (
    <TodoSection
      tasks={tasks}
      newTaskTitle={newTaskTitle}
      setNewTaskTitle={setNewTaskTitle}
      handleSubmit={handleSubmit}
      onStartTask={onStartTask}
      openModal={openModal}
    />
  );
}

TodoSectionContainer.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAddTask: PropTypes.func.isRequired,
  onStartTask: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default TodoSectionContainer;