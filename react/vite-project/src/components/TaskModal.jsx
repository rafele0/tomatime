import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Edit from '../assets/edit.svg';



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
          placeholder='Inserisci il titolo della task'
        />
        
        </div>
        
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
        <div>
          <button onClick={handleSave}>Salva</button>
          <button onClick={onClose}>Annulla</button>
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