
import React from 'react';
import PropTypes from 'prop-types';

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

DoneSection.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DoneSection;