import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Arrow from "../assets/arrow.svg";
import Check from "../assets/circleCheck.svg";
import EditTaskModal from './EditTaskModal';

function TaskItem({ task, actionLabel, onAction }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleArrowClick = async () => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/state/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state: 'workingAt' }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Task moved successfully:', data);
      onAction(data);

      // Move the task-title to the working section and remove the task item from the todo section
      const taskTitleElement = document.querySelector(`.task-item[data-task-id="${task.id}"] .task-title`);
      const taskItemElement = document.querySelector(`.task-item[data-task-id="${task.id}"]`);
      const workingSection = document.querySelector('.section-for-task');
      if (taskTitleElement && workingSection) {
        const spanElement = document.createElement('span');
        spanElement.textContent = taskTitleElement.textContent;
        spanElement.className = 'task-title-only';
        workingSection.appendChild(spanElement);
      }
      if (taskItemElement) {
        taskItemElement.remove();
      }
    } catch (error) {
      console.error('Error moving task:', error);
    }
  };

  const handleTitleClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = (updatedTask) => {
    onAction(updatedTask);
  };

  const handleDelete = (taskId) => {
    onAction(taskId);
  };

  return (
    <div className="task-item" data-task-id={task.id}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <div className="task-action-button">
        {actionLabel}
        <span>
          <img src={Check} alt="" className='CheckName' />
        </span>
      </div>
      <button className="task-title"
        style={{
          cursor: 'pointer',
          textDecoration: 'none',
          border: 'none',
          background: 'none',
          color: '#D9391E',
          fontFamily: 'sora sans-serif',
          fontWeight: '500',
          marginLeft: '40px',
          position: 'absolute',
          cursor: 'pointer'
        }}
        onClick={handleTitleClick}
      >
        {task.title}
      </button>
      <button className="action-button"
        style={{
          cursor: 'pointer',
          position: 'absolute',
          marginLeft: '430px',
          textDecoration: 'transparent',
          border: 'none',
          background: 'none',
          cursor: 'pointer'
        }}
        onClick={handleArrowClick}
      >
        <img src={Arrow} alt="Move to working" className='ArrowIcon' title='Move to working' />
      </button>
      {isModalOpen && (
        <EditTaskModal
          task={task}
          onClose={handleModalClose}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    state: PropTypes.string.isRequired,
  }).isRequired,
  actionLabel: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
};

export default TaskItem;