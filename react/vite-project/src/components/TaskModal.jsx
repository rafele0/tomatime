
import React, { useState } from 'react';

function TaskModal({ isOpen, onClose, onSave }) {
  // Stato per titolo e descrizione
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // Stato per gestire l'errore (se titolo è vuoto)
  const [error, setError] = useState('');

  // Se la modale non è aperta, non renderizziamo nulla
  if (!isOpen) return null;

  /**
   * Cancella il contenuto del titolo
   */
  const handleClearTitle = () => {
    setTitle('');
  };

  /**
   * Gestisce il salvataggio della task
   */
  const handleSave = () => {
    // Se il titolo è vuoto, mostriamo errore e blocchiamo il salvataggio
    if (!title.trim()) {
      setError('Il titolo della task è obbligatorio');
      return;
    }

    // Se tutto ok, creiamo un oggetto con i dati della task
    const newTask = {
      title,
      description,
    };

    // Chiamata al callback passato dal genitore (AppContainer)
    onSave(newTask);

    // Reset degli input e dell'errore
    setTitle('');
    setDescription('');
    setError('');

    // Chiudiamo la modale
    onClose();
  };

  return (
    <div className="modal-overlay" style={overlayStyle}>
      <div className="modal" style={modalStyle}>
        <h2>Nuova Task</h2>

        {/* Mostra l'errore se presente */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <label style={{ display: 'block', marginTop: '1rem' }}>Titolo</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
        {/* Pulsante per cancellare il titolo */}
        <button onClick={handleClearTitle} style={clearButtonStyle}>
          Cancella titolo
        </button>

        <label style={{ display: 'block', marginTop: '1rem' }}>Descrizione</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          style={{ ...inputStyle, height: '80px' }}
        />

        <div style={buttonsContainerStyle}>
          <button onClick={handleSave} style={saveButtonStyle}>
            Salva
          </button>
          <button onClick={onClose} style={closeButtonStyle}>
            Annulla
          </button>
        </div>
      </div>
    </div>
  );
}




  



export default TaskModal;
