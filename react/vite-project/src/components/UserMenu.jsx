import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserMenu = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate(-1); // Torna alla pagina precedente
  };

  return (
    <div className="user-menu">
      <button onClick={onClose} className="close-btn">X</button>
      <span style={{fontSize:"20px", fontFamily:"sora, sans-serif", color:"red", marginLeft:"70px"}}>Edit Profile</span>
      <button 
        style={{
          width: "132px", 
          height: "40px",
          marginLeft: "56px", 
          marginTop: "16px",
          background: "#D9391E",
          borderRadius: "8px", 
          border: "1px solid #D9391E", 
          fontFamily: "sora sans-serif", 
          fontWeight: "regular", 
          fontSize: "20px", 
          color: "white",
          cursor: "pointer"
        }} 
        onClick={handleLogout}
      >
        LOGOUT
      </button>
    </div>
  );
};

export default UserMenu;