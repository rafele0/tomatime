
import React from 'react';
import TaskItem from './TaskItem';

function WorkingSection({ tasks, onCompleteTask }) {
  return (
    <div className="working-section">
      <h2 className="section-title">WORKING</h2>
      <ul className="working-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            actionLabel="Complete"
            onAction={() => onCompleteTask(task.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default WorkingSection;
