import React, { useEffect, useState, useRef } from "react";
import TaskModal from "../components/TaskModal";
import TodoSectionContainer from "./TodoSectionContainer";
import DoneSectionContainer from "./DoneSectionContainer";
import WorkingSectionContainer from "./WorkingSectionContainer";
import UserMenu from "../components/UserMenu";
import titlePageLogo from '../assets/titlePage.svg';
import "../index.css";
import solidCheck from '../assets/solidCheckY.svg';
import solidTomato from '../assets/solidTomato.svg';
import solidSmash from '../assets/solidSmash.png';
import User from '../assets/User.png';

const AppContainer = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userId, setUserId] = useState(1); // Imposta temporaneamente l'userId a 1
  const hasFetchedTasks = useRef(false);

  useEffect(() => {
    if (!hasFetchedTasks.current) {
      console.log('Fetching tasks for userId:', userId);
      fetch(`http://localhost:3000/tasks?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTasks(data);
          hasFetchedTasks.current = true;
        });
    }
  }, [userId]);

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

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const todoTasks = tasks.filter(task => task.state === 'to do'); // Assicurati che lo stato sia esattamente 'to do'
  const workingTasks = tasks.filter(task => task.state === 'workingAt');
  const doneTasks = tasks.filter(task => task.state === 'done');

  return (
    <div className="app-container">
      
      <header className="app-header">
        <img src={titlePageLogo} alt="Title Page Logo"/>
        <div className="user-info-container">
          <div className="cont-done">
            <img style = {{height: "40px", width: "40px", marginLeft:"3px"}} className = "imgHeader" src={solidCheck}></img>
          </div>
          <div className="cont-tomato">
          <img style = {{height: "37px", width: "37px", marginLeft:"3px"}}className = "imgHeader" src={solidTomato}></img>
          </div>
          <div className="cont-smash">
          <img style = {{height: "45px", width: "45px", marginLeft:"3px"}}className = "imgHeader" src={solidSmash}></img>
          </div>
          
        </div>
        <div className="user-info">
          <button className="btnUser" style={{backgroundColor: "transparent", border: "none", cursor:"pointer"}} onClick={toggleUserMenu}>
          <img style={{height:"60px", width:"60px"}}src={User}></img>
          </button>
          {isUserMenuOpen && <UserMenu onClose={toggleUserMenu} />}
        </div>
      </header>

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