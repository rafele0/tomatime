
import React from 'react';
import WorkingSection from '../components/WorkingSection';

function WorkingSectionContainer({ tasks, onCompleteTask }) {
  return <WorkingSection tasks={tasks} onCompleteTask={onCompleteTask} />;
}

export default WorkingSectionContainer;
