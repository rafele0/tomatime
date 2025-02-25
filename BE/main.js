const sequelize = require('./db.js');
const Task = require('./entities/tasks.js');

async function main() {
  try {
    // Sincronizza il database (force: true ricrea le tabelle, eliminando dati esistenti)
    await sequelize.sync({ force: true });
    console.log('Il database è stato sincronizzato');

    // Crea un nuovo task, fornendo i dati obbligatori
    const newTask = await Task.create({
      title: 'Task 1',
      description: 'Descrizione del Task 1',
      time: new Date(),
      id_user: 1
    });
    console.log('Nuovo task creato!', newTask.toJSON());
  } catch (error) {
    console.error("Errore nell'esecuzione:", error);
  } finally {
    await sequelize.close(); // Chiude la connessione al DB in ogni caso
  }
}

main();
