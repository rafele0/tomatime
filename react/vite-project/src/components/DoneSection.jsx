
import React from 'react';
import PropTypes from 'prop-types';
import Circle from "../assets/CheckCircleYellow.svg";

function DoneSection({ tasks }) {
  return (
    <div className="done-section">
      <h2 className="section-titleDone">DONE</h2>
      <div className="done-list">
        {tasks.map((task) => (
          <div key={task.id} className="done-item">
            <img src={Circle} alt="" className='CircleDone' />
            <span className='taskTitleDone'>{task.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

DoneSection.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DoneSection;