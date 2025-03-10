import React from 'react';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';
import Plus from '../assets/plus.svg';

function TodoSection({
  tasks,
  newTaskTitle,
  setNewTaskTitle,
  handleSubmit,
  onStartTask,
  openModal,
}) {
  return (
    <div>
    <h2 className="section-title">TO DO</h2>
    <div className="todo-section">
      
      <div className="" style={{"display": "flex", "flexDirection": "column",}}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            
            onAction={() => onStartTask(task.id)}
          />
        ))}
      </div>
      <button onClick={openModal} className="addTaskBnt">
        <img src={Plus} alt="" className="PlusIcon" />
        <span className='SpanAddTask'>Add task</span>
      </button>
    </div>
    </div>
  );
}

TodoSection.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  newTaskTitle: PropTypes.string.isRequired,
  setNewTaskTitle: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onStartTask: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default TodoSection;