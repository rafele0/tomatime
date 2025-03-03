import React from 'react';
import PropTypes from 'prop-types';
import Arrow from "../assets/arrow.svg";
import Check from "../assets/circleCheck.svg";

function TaskItem({ task, actionLabel, onAction }) {
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
        <img src={Arrow} alt="Move to working" className='ArrowIcon' title='Move to working' />
      </span>
      
      </button>
      </div> 
    </>
  );
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