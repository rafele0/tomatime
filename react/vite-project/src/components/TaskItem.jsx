import React from 'react';
import PropTypes from 'prop-types';
import Arrow from "../assets/arrow.svg";
import Check from "../assets/circleCheck.svg";

function TaskItem({ task, actionLabel, onAction }) {
  
  const handleArrowClick = async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks/state', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId: task.id, state : 'workingAt' }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Task moved successfully:', data);
    } catch (error) {
      console.error('Error moving task:', error);
    }
  };

  return (
    <>
      <div className="task-item">
        <button className="task-action-button" onClick={() => onAction(task.id)}>
          {actionLabel}
          <span>
            <img src={Check} alt="" className='CheckName' />
          </span>
          <span className="task-title">
            {task.title}
          </span>
          <span>
            <img src={Arrow} alt="Move to working" className='ArrowIcon' title='Move to working' onClick={handleArrowClick} />
          </span>
        </button>
      </div>
    </>
  )
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  actionLabel: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
};

export default TaskItem;