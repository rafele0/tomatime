import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Edit from '../assets/edit.svg';
import Delate from '../assets/delate.svg'



function TaskModal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title.trim()) {
      setError('Il titolo della task è obbligatorio');
      return;
    }

    const newTask = {
      title,
      description,
    };

    onSave(newTask);
    setTitle('');
    setDescription('');
    setError('');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className='modalHeader'>
        <img src={Edit} alt="" className='editTask'/>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='modalInput'
          placeholder='Send Message'
        />
        
        </div>
        
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className='modalTextArea'
          style={{"resize":"none", "width":"520px", "height":"120px", "marginLeft":"40px", "marginTop":"40px", "borderRadius":"8px"}}
          placeholder=''
        />
        <div>
          <button onClick={onClose} style={{"width":"36px", "height":"36px", "marginLeft":"40px","marginTop":"36px","background":"transparent","borderRadius":"8px", "border":"1px solid #D9391E"}}><img src={Delate}></img></button>
          <button onClick={onClose} style={{"width":"132px", "height":"40px","marginLeft":"200px", "marginTop":"36px","background":"transparent","borderRadius":"8px", "border":"1px solid #D9391E", "fontFamily":"sora sans-serif", "fontWeight":"regular", "fontSize":"20px", "color":"#D9391E"}}>Cancel</button>
          <button onClick={handleSave} style={{"width":"132px", "height":"40px","marginLeft":"26px", "marginTop":"36px","background":"#D9391E","borderRadius":"8px", "border":"1px solid #D9391E", "fontFamily":"sora sans-serif", "fontWeight":"regular", "fontSize":"20px", "color":"white"}}>Add Task</button>
        </div>
      </div>
    </div>
  );
}

TaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default TaskModal;