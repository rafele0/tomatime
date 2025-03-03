import React from 'react';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';

function WorkingSection({ tasks, onCompleteTask }) {
  return (
    <div className="working-section">

      <span className="section-titleWorkingAt">TIME TO FOCUS</span>
      <ul className="working-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            
            onAction={() => onCompleteTask(task.id)}
          />
        ))}
      </ul>
      <div className='working-section__footer'>
          <span>WORKING AT</span>

          <div className='section-for-task'>
              
             
          </div>
        <button className='TodoRetrunBnt'>todo</button>
        <button className='DoneNextBnt'>done</button>
      </div>
    </div>
  );
}

WorkingSection.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onCompleteTask: PropTypes.func.isRequired,
};

export default WorkingSection;