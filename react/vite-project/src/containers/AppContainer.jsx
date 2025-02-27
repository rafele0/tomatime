import React, { useState } from "react";
import TaskModal from "../components/TaskModal";
import "../styles/App.css";

const AppContainer = () => {
  const [tasks, setTasks] = useState([ ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addTask = (newTask) => {
    setTasks([...tasks, { id: tasks.length + 1, title: newTask, completed: false }]);
  };

  return (
    <div className="app-container">
      <header className="app-header">TOMATIME</header>
      <main className="content">
        <section className="task-section">
          <h2>TO DO</h2>
          <TaskList tasks={tasks} openModal={() => setIsModalOpen(true)} />
        </section>
        <section className="focus-section">
          <h2>TIME TO FOCUS</h2>
          <div className="timer-box">
            <span className="time">25:00</span>
            <button className="play-button">▶</button>
          </div>
        </section>
        <section className="done-section">
          <h2>DONE</h2>
        </section>
      </main>
      {isModalOpen && <TaskModal closeModal={() => setIsModalOpen(false)} addTask={addTask} />}
    </div>
  );
};

export default AppContainer;
