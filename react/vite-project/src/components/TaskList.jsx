import React from 'react';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, openModal, onTaskAction }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>Nessuna task presente</p>
      ) : (
        tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            actionLabel="Completa" 
            onAction={onTaskAction} 
          />
        ))
      )}
      <button onClick={openModal}>Aggiungi Task</button>
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  openModal: PropTypes.func.isRequired,
  onTaskAction: PropTypes.func.isRequired,
};

export default TaskList;