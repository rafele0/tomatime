// src/containers/DoneSectionContainer.jsx
import React from 'react';
import DoneSection from '../components/DoneSection';

function DoneSectionContainer({ tasks }) {
  return <DoneSection tasks={tasks} />;
}

export default DoneSectionContainer;
