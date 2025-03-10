import React, { use, useEffect, useState } from "react";
import TaskModal from "../components/TaskModal";
import TodoSectionContainer from "./TodoSectionContainer";
import DoneSectionContainer from "./DoneSectionContainer";
import WorkingSectionContainer from "./WorkingSectionContainer";
import titlePageLogo from '../assets/titlePage.svg'
import "../index.css";

const AppContainer = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
  }, [])  

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
    //setTasks([...tasks, { id: tasks.length + 1, title: newTask.title, description: newTask.description, completed: false, working: false }]);
  };

  const startTask = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, working: true } : task));
  };

  const completeTask = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: true, working: false } : task));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const todoTasks = tasks.filter(task => !task.completed && !task.working);
  const workingTasks = tasks.filter(task => task.working && !task.completed);
  const doneTasks = tasks.filter(task => task.completed);

  return (
    <div className="app-container">
      <header className="app-header"><img src={titlePageLogo}/></header>
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