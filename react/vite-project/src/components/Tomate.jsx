import React, { useEffect, useState } from 'react';
import Tomateicon from '../assets/tomateicon.svg';

function Tomate({ userId }) {
  const [tomateCount, setTomateCount] = useState(0);

  useEffect(() => {
    if (!userId) return; 

    fetch('http://localhost:3000/exploded', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTomateCount(data.filter((task) => task.state === "exploded").length);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, [userId]);

  

  return (
    <div className="status-counter">
      <div className="">
        <img src={Tomateicon} alt="Tomate icon" className='tomateicon'/>
        <span className='count'>{tomateCount}</span>
      </div>
    </div>
  );
}

export default Tomate;
