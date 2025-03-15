import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';
import EditTaskModal from './EditTaskModal';

const TaskList = ({ tasks, openModal, onTaskAction }) => {
  const [taskList, setTaskList] = useState(tasks);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleDelete = (taskId) => {
    setTaskList(taskList.filter(task => task.id !== taskId));
  };

  const handleSave = (updatedTask) => {
    setTaskList(taskList.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const handleClose = () => {
    setSelectedTask(null);
  };

  return (
    <div className="task-list">
      {taskList.length === 0 ? (
        <p>Nessuna task presente</p>
      ) : (
        taskList.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            actionLabel="Completa" 
            onAction={() => setSelectedTask(task)} 
          />
        ))
      )}
      <button onClick={openModal}>Aggiungi Task</button>
      {selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onClose={handleClose}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  openModal: PropTypes.func.isRequired,
  onTaskAction: PropTypes.func.isRequired,
};

export default TaskList;