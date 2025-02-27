import React from 'react';
import PropTypes from 'prop-types';
import WorkingSection from '../components/WorkingSection';

function WorkingSectionContainer({ tasks, onCompleteTask }) {
  return <WorkingSection tasks={tasks} onCompleteTask={onCompleteTask} />;
}

WorkingSectionContainer.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onCompleteTask: PropTypes.func.isRequired,
};

export default WorkingSectionContainer;