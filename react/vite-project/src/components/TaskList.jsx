import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, openModal, onTaskAction }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>Nessuna task presente</p>
      ) : (
        tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            actionLabel="Completa" 
            onAction={onTaskAction} 
          />
        ))
      )}
      <button onClick={openModal}>Aggiungi Task</button>
    </div>
  );
};

/* const handleTaskAction = async (taskId) => {
  try {
    const updatedTask = await axios.put(`http://localhost:3000/tasks`, {
      status: 'to do',
      title:'',
      description:
    });
    console.log('Task aggiornata:', updatedTask.data);
    // Aggiorna lo stato locale per riflettere il cambiamento
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: 'done' } : task
    ));
  } catch (error) {
    console.error('Errore durante l\'aggiornamento della task:', error);
  }
}; */


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