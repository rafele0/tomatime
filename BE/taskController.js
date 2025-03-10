const Task = require('./entities/tasks.js');
const Tomato = require('./entities/tomatoes.js');
const { move } = require('./routes/tasksRoutes.js');


async function create(task) {
  try {
    // Verifica che il task contenga titolo e descrizione
    if (!task.title) {
      throw new Error('Titolo obbligatorio');
    }

    // Crea un nuovo task con Sequelize
    const newTask = await Task.create({
      title: task.title,
      description: task.description,
      state: 'to do',   // Stato fisso su "to do"
      time: new Date(), // Imposta l'ora corrente
      id_user: task.id_user || 1 // Imposta un id_user di default se non specificato
    });

    //console.log('Task creato e salvato nel database:', newTask.toJSON());
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

async function updateTaskState(taskId, newState) {
  try {
    // Verifica che l'ID sia fornito e sia un numero
    if (!taskId || isNaN(taskId)) {
      throw new Error('ID non valido per la task da aggiornare');
    }

    // Verifica che lo stato sia valido
    const validStates = ['to do', 'workingAt', 'done'];
    if (!validStates.includes(newState)) {
      throw new Error('Stato non valido');
    }

    // Trova la task da aggiornare
    const taskToUpdate = await Task.findByPk(taskId);

    // Se la task non esiste, lancia un errore
    if (!taskToUpdate) {
      throw new Error('Task non trovata');
    }

    // Regole di aggiornamento dello stato
    const currentState = taskToUpdate.state;

    if (currentState === 'to do' && newState !== 'workingAt') {
      throw new Error('Da "to do" puoi cambiare solo a "workingAt"');
    }

    if (currentState === 'workingAt' && !['to do', 'done'].includes(newState)) {
      throw new Error('Da "workingAt" puoi cambiare solo a "to do" o "done"');
    }

    if (currentState === 'done') {
      throw new Error('Lo stato "done" è finale e non può essere modificato');
    }

    // Controlla se esiste già un task in "workingAt"
    if (newState === 'workingAt') {
      const existingWorkingAt = await Task.findOne({ where: { state: 'workingAt' } });
      if (existingWorkingAt && existingWorkingAt.id !== taskId) {
        throw new Error('Esiste già una task in "workingAt". Completa o modifica quella prima di aggiornare questa.');
      }
    }

    // Se tutte le condizioni sono soddisfatte, aggiorna lo stato
    taskToUpdate.state = newState;
    await taskToUpdate.save();
    console.log(`Stato della task con ID ${taskId} aggiornato a "${newState}"`);

    return taskToUpdate;
  } catch (error) {
    console.error('Errore nell\'aggiornamento dello stato della task:', error);
    throw error;
  }
}


async function moveToNextTomato(currentTomatoId, taskId) {
  const currentTomato = await Tomato.findByPk(currentTomatoId);
  if (!currentTomato) {
    throw new Error('Current tomato not found');
  }

  let nextTomatoId = currentTomatoId + 1;
  if (nextTomatoId > 8) {
    nextTomatoId = 1;
  }

  const nextTomato = await Tomato.findByPk(nextTomatoId);
  if (!nextTomato) {
    throw new Error('Next tomato not found');
  }

  // Update last_used for current and next tomato
  currentTomato.last_used = false;
  await currentTomato.save();

  nextTomato.last_used = true;
  await nextTomato.save();

  const currentTime = new Date();
  await Task.update({ time: currentTime }, { where: { id: taskId } });

  return nextTomato;
}



async function countExplodedTomatoes() {
  try {
      const count = await Tomato.sum('exploded');
      console.log(`Numero di pomodori esplosi: ${count}`);
      return count;
  } catch (error) {
      console.error('Errore durante il conteggio dei pomodori esplosi:', error);
      throw error;
  }
}


module.exports = {
  moveToNextTomato,
  countDone,
  create,
  deleteTask,
  updateTask,
  updateTaskState,
  countExplodedTomatoes
};