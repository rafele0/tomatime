
import React from 'react';
import TaskItem from './TaskItem';

function TodoSection({
  tasks,
  newTaskTitle,
  setNewTaskTitle,
  handleSubmit,
  onStartTask,
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
    </div>
  );
}

export default TodoSection;
