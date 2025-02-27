import React from 'react';
import PropTypes from 'prop-types';

function TaskItem({ task, actionLabel, onAction }) {
  return (
    <li className="task-item">
      <span className="task-title">{task.title}</span>
      <button className="task-action-button" onClick={() => onAction(task.id)}>
        {actionLabel}
      </button>
    </li>
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