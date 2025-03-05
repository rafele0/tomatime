import React from 'react';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';
import working from '../assets/titleWorkingAt.svg';
import arrowLeft from '../assets/arrowLeftWorking.svg';
import arrowRight from '../assets/arrowRightWorking.svg';

function WorkingSection({ tasks, onCompleteTask }) {
  return (
  <div className="intWorking">
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
      

      </div>
      <img src={working} className='workingAt'/>
      <div className='section-for-task'></div>

      <button className='btnToDo'> <img src={arrowLeft} style={{"width":"20%", "height":"70%", "position":"absolute","justifyContent":"center", "top":"5px", "marginInline":"-40px"}}/> To Do </button>
      <button className='btnDone'>Done <img src={arrowRight} style={{"width":"20%", "height":"70%", "position":"absolute","justifyContent":"center", "top":"5px", "marginInline":"20px"}}/></button>


      

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