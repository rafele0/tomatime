

import React from 'react';

function TaskItem({ task, actionLabel, onAction }) {
  return (
    <li className="task-item">
      <span className="task-title">{task.title}</span>
      <button className="task-action-button" onClick={onAction}>
        {actionLabel}
      </button>
    </li>
  );
}

export default TaskItem;
