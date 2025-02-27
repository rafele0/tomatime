import React from 'react';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';

function TodoSection({
  tasks,
  newTaskTitle,
  setNewTaskTitle,
  handleSubmit,
  onStartTask,
  openModal,
}) {
  return (
    <div className="todo-section">
      <h2 className="section-title">TO DO</h2>
      <ul className="todo-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            actionLabel="Start"
            onAction={() => onStartTask(task.id)}
          />
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="add-task-form">
        <input
          className="add-task-input"
          type="text"
          placeholder="Add task"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button type="submit" className="add-task-button">
          +
        </button>
      </form>
      <button onClick={openModal} className="add-task-button">
        Aggiungi Task
      </button>
    </div>
  );
}

TodoSection.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  newTaskTitle: PropTypes.string.isRequired,
  setNewTaskTitle: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onStartTask: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default TodoSection;