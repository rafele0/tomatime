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
        body: JSON.stringify({ taskId: task.id, state: 'workingAt' }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Task moved successfully:', data);
      onAction(data); // Chiama la funzione onAction per aggiornare lo stato nel frontend
    } catch (error) {
      console.error('Error moving task:', error);
    }
  };

  return (
    <div className="task-item"
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
        }}
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
        }}
        onClick={handleArrowClick}
      >
        <img src={Arrow} alt="Move to working" className='ArrowIcon' title='Move to working' />
      </button>
    </div>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired,
  actionLabel: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
};

export default TaskItem;