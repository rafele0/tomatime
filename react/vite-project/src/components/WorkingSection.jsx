import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';
import working from '../assets/titleWorkingAt.svg';
import arrowLeft from '../assets/arrowLeftWorking.svg';
import arrowRight from '../assets/arrowRightWorking.svg';
import Start from '../assets/start.svg';
import Stop from '../assets/stop.svg';
import Reset from '../assets/reset.svg';
import tomate from '../assets/tomate.png'; // Importa l'immagine

function WorkingSection({ tasks, onCompleteTask, initialMinutes }) {
  const [minutes, setMinutes] = useState(() => {
    fetch("http://localhost:3000/tasks/timer")
      .then((response) => response.json())
      .then((data) => setMinutes(data.remainingTime));
    return initialMinutes;
  });
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showTomate, setShowTomate] = useState(false); // Stato per gestire la visibilità dell'immagine

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes]);

  const handleStart = () => {
    fetch("http://localhost:3000/tasks/start")
      .then((response) => response.json())
      .then((data) => setTasks(data));
    setIsActive(true);
    setHasStarted(true);
    setShowTomate(true); // Mostra l'immagine
  };

  const handleStartStop = () => { 
    setIsActive(!isActive);
  };

  const handleReset = () => {
    fetch("http://localhost:3000/tasks/stop", {
      method: 'POST',
    })
    .then((response) => response.json())
    .then((data) => setTasks(data));
    setMinutes(initialMinutes);
    setSeconds(0);
    setIsActive(false);
    setHasStarted(false);
    setShowTomate(false); // Nascondi l'immagine
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const response = await fetch('http://localhost:3000/tasks/state', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId, state: 'done' }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Task completed successfully:', data);
      onCompleteTask(taskId); // Chiama la funzione onCompleteTask per aggiornare lo stato nel frontend
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  return (
    <div className="intWorking">
      <div className="working-section">
        <span className="section-titleWorkingAt">TIME TO FOCUS</span>
      </div>
      <img src={working} className='workingAt' />
      <div className='section-for-task'>
        {tasks.slice(0, 1).map((task) => (
          <span key={task.id} className="task-title-only">
            {task.title}
          </span>
        ))}
      </div>

      <div className="timer">
        <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
      </div>

      <button className='btnToDo' onClick={() => (tasks[0].id)}>  
        <img src={arrowLeft} style={{ "width": "20%", "height": "70%", "position": "absolute", "justifyContent": "center", "top": "5px", "marginInline": "-40px" }} /> To Do 
      </button>
      <button className='btnDone' onClick={() => handleCompleteTask(tasks[0].id)}>
        Done <img src={arrowRight} style={{ "width": "20%", "height": "70%", "position": "absolute", "justifyContent": "center", "top": "5px", "marginInline": "20px" }} />
      </button>

      {!hasStarted ? (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "109px",
        }}>
          <button 
            style={{
              background:"transparent", 
              border:"none",
              cursor:"pointer",
            }}
            onClick={handleStart}>
            <img style={{width:"80px", height:"80px"}} src={Start}/>
          </button>
        </div>
      ) : (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          marginTop: "109px",
        }}>
          <button 
            style={{
              background:"transparent",
              border:"none",
              cursor:"pointer",
            }}
            onClick={handleStartStop}>
            {isActive ? <img style={{width:"80px", height:"80px"}} src={Stop}/> : <img style={{width:"80px", height:"80px"}} src={Start}/>}
          </button>

          <button
            style={{
              background:"transparent",
              border:"none",
              cursor:"pointer",
            }} 
            onClick={handleReset}>
            <img style={{width:"80px", height:"80px"}} src={Reset}/>
          </button>
        </div>
      )}

      {showTomate && <img src={tomate} className="tomate" />} {/* Mostra l'immagine con la classe 'tomate' */}
    </div>
  );
}

WorkingSection.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onCompleteTask: PropTypes.func.isRequired,
  initialMinutes: PropTypes.number.isRequired,
};

export default WorkingSection;