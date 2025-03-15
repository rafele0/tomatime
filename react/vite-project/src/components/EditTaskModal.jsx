import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Edit from '../assets/edit.svg';
import Delate from '../assets/delate.svg';

function EditTaskModal({ task, onClose, onSave, onDelete }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    setError(null); // Reset error state
    try {
      console.log('Sending request to update task:', { title, description });
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error text:', errorText);
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Task updated successfully:', data);
      onSave(data);
      onClose();
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Failed to update task. Please try again.');
    }
  };

  const handleDelete = async () => {
    setError(null); // Reset error state
    try {
      console.log('Sending request to delete task:', task.id);
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error text:', errorText);
        throw new Error('Network response was not ok');
      }
      console.log('Task deleted successfully');
      onDelete(task.id);
      onClose();
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task. Please try again.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className='modalHeader'>
          <img src={Edit} alt="" className='editTask' />
          <input
            className='modalInput'
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <textarea
            style={{ "resize": "none", "width": "520px", "height": "120px", "marginLeft": "40px", "marginTop": "40px", "borderRadius": "8px" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {error && <div style={{ color: 'red', marginLeft: '40px', marginTop: '10px' }}>{error}</div>}
        <button className="Delete" onClick={handleDelete} style={{ "width": "36px", "height": "36px", "marginLeft": "40px", "marginTop": "36px", "background": "transparent", "borderRadius": "8px", "border": "1px solid #D9391E" }}>
          <img src={Delate} alt="Delete" />
        </button>
        <button className="save" onClick={handleSave} style={{ "width": "132px", "height": "40px", "marginLeft": "350px", "marginTop": "36px", "background": "transparent", "borderRadius": "8px", "border": "1px solid #D9391E", "fontFamily": "sora sans-serif", "fontWeight": "regular", "fontSize": "20px", "color": "#D9391E" }}>
          Save
        </button>
      </div>
    </div>
  );
}

EditTaskModal.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EditTaskModal;