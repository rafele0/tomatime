const Task = require('./entities/tasks.js');

async function create(task) {
  try {
    // Verifica che il task contenga titolo e descrizione
    if (!task.title || !task.description) {
      throw new Error('Titolo e descrizione sono obbligatori');
    }

    // Crea un nuovo task con Sequelize
    const newTask = await Task.create({
      title: task.title,
      description: task.description,
      state: 'to do',   // Stato fisso su "to do"
      time: new Date(), // Imposta l'ora corrente
      id_user: task.id_user || 1 // Imposta un id_user di default se non specificato
    });

    console.log('Task creato e salvato nel database:', newTask.toJSON());
    return newTask;
  } catch (error) {
    console.error('Errore nella creazione del task:', error);
    throw error;
  }
};

async function deleteTask(taskId) {
  try {
    // Verifica che l'ID sia fornito e sia un numero
    if (!taskId || isNaN(taskId)) {
      throw new Error('ID non valido per la task da eliminare');
    }

    // Trova la task da eliminare
    const taskToDelete = await Task.findByPk(taskId);

    // Se la task non esiste, lancia un errore
    if (!taskToDelete) {
      throw new Error('Task non trovata');
    }

    // Elimina la task
    await taskToDelete.destroy();
    console.log(`Task con ID ${taskId} eliminata con successo`);

    return { message: 'Task eliminata con successo' };
  } catch (error) {
    console.error('Errore nell\'eliminazione della task:', error);
    throw error;
  }
}

async function updateTask(taskId, updatedData) {
  try {
    // Verifica che l'ID sia fornito e sia un numero
    if (!taskId || isNaN(taskId)) {
      throw new Error('ID non valido per la task da aggiornare');
    }

    // Verifica che i dati contengano almeno title o description
    if (!updatedData.title && !updatedData.description) {
      throw new Error('Titolo o descrizione devono essere forniti per l\'aggiornamento');
    }

    // Trova la task da aggiornare
    const taskToUpdate = await Task.findByPk(taskId);

    // Se la task non esiste, lancia un errore
    if (!taskToUpdate) {
      throw new Error('Task non trovata');
    }

    // Verifica che lo state sia "to do"
    if (taskToUpdate.state !== 'to do') {
      throw new Error('La task può essere modificata solo se lo stato è "to do"');
    }

    // Aggiorna solo i campi forniti
    if (updatedData.title) taskToUpdate.title = updatedData.title;
    if (updatedData.description) taskToUpdate.description = updatedData.description;

    // Salva le modifiche nel database
    await taskToUpdate.save();
    console.log(`Task con ID ${taskId} aggiornata con successo`);

    return taskToUpdate;
  } catch (error) {
    console.error('Errore nell\'aggiornamento della task:', error);
    throw error;
  }
}

async function countDone() {
  try {
      const count = await Task.count({
          where: {
              status: 'done'
          }
      });
      console.log(`Numero di task in stato 'done': ${count}`);
      return count;
  } catch (error) {
      console.error('Errore durante il conteggio delle task in stato done:', error);
      throw error;
  }
}



module.exports = {
  create,
  deleteTask,
  updateTask
};