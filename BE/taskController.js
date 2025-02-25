function create(task){

  try {
    // Verifica che il task contenga titolo e descrizione
    if (!task.title || !task.description) {
      throw new Error('Titolo e descrizione sono obbligatori');
    }

    // Crea un nuovo task con stato fisso su "to do"
    const newTask = {
      title: task.title,
      description: task.description,
      state: 'to do',   // Stato fisso su "to do"
      time: new Date(), // Imposta l'ora corrente
      id_user: task.id_user || 1 // Imposta un id_user di default se non specificato
    };

    console.log('Task creato:', newTask);
    return newTask
  } catch (error) {
    console.error('Errore nella creazione del task:', error);
    throw error;
  }
};

module.exports = {
  create
};
