import React from "react";
import checkIcon from "../assets/CheckCircleYellow.svg";
import "../index.css";

const DoneTaskCounter = ({ doneCount }) => {
  return (
    <div className="status-counter">
      <div className="counter-nav" >
        <img src={checkIcon} alt="Completed tasks" className="imageDone" />
      </div>
      <span className="count">{doneCount}</span>
    </div>
  );
};

export default DoneTaskCounter;
