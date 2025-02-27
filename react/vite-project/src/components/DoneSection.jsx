
import React from 'react';

function DoneSection({ tasks }) {
  return (
    <div className="done-section">
      <h2 className="section-title">DONE</h2>
      <ul className="done-list">
        {tasks.map((task) => (
          <li key={task.id} className="done-item">
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoneSection;
