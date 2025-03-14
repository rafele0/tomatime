import React, { useEffect, useState } from "react";
import TaskModal from "../components/TaskModal";
import TodoSectionContainer from "./TodoSectionContainer";
import DoneSectionContainer from "./DoneSectionContainer";
import WorkingSectionContainer from "./WorkingSectionContainer";
import titlePageLogo from '../assets/titlePage.svg';
import "../index.css";

const AppContainer = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState(1); // Imposta temporaneamente l'userId a 1

  useEffect(() => {
    fetch(`http://localhost:3000/tasks?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, [userId]); // Aggiungi una dipendenza vuota per eseguire la chiamata fetch solo una volta

  const addTask = (newTask) => {
    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => setTasks([...tasks, data]));
  };

  const startTask = async (taskId) => {
    try {
      const response = await fetch('http://localhost:3000/tasks/state', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId, state: 'workingAt', userId }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTasks(tasks.map(task => task.id === taskId ? { ...task, state: 'workingAt' } : task));
    } catch (error) {
      console.error('Error starting task:', error);
    }
  };

  const completeTask = async (taskId) => {
    try {
      console.log('Completing task:', taskId);
      const response = await fetch('http://localhost:3000/tasks/state', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId, state: 'done', userId }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTasks(tasks.map(task => task.id === taskId ? { ...task, state: 'done' } : task));
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

<<<<<<< HEAD
  const todoTasks = tasks.filter(task => task.state === 'to do'); // Assicurati che lo stato sia esattamente 'to do'
=======
  const todoTasks = tasks.filter(task => task.state === 'to do');
>>>>>>> 1ed7e5bfc19c49d2ccc6f898da77eafb1aad864d
  const workingTasks = tasks.filter(task => task.state === 'workingAt');
  const doneTasks = tasks.filter(task => task.state === 'done');

  return (
    <div className="app-container">
      <header className="app-header"><img src={titlePageLogo} alt="Title Page Logo"/></header>
      <main className="content">
        <div className="task-section">
          <TodoSectionContainer tasks={todoTasks} onAddTask={addTask} onStartTask={startTask} openModal={openModal} />
        </div>
        <div className="focus-section">
          <WorkingSectionContainer tasks={workingTasks} onCompleteTask={completeTask} />
        </div>
        <div className="done-section">
          <DoneSectionContainer tasks={doneTasks} />
        </div>
      </main>
      {isModalOpen && <TaskModal isOpen={isModalOpen} onClose={closeModal} onSave={addTask} />}
    </div>
  );
};

export default AppContainer;