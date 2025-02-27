import React from 'react';
import PropTypes from 'prop-types';
import DoneSection from '../components/DoneSection';

function DoneSectionContainer({ tasks }) {
  return <DoneSection tasks={tasks} />;
}

DoneSectionContainer.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DoneSectionContainer;