const express = require('express')
const router = express.Router();
const tasks = require('../entities/tasks.js');
const fn = require('../taskController.js')
const Tomato = require('../entities/tomatoes.js');


router.get('/', async (req,res) => {
    return res.json(await tasks.findAll())
})

router.post('/', async (req, res) => {
    const body = req.body
    if (!body.title || !body.description) {
        return res.status(400).json({ message: 'bad request' })
    }
    const newTask = {
        title: body.title,
        description: body.description
    }
    fn.create(newTask);
    
});

// Avvia il timer del pomodoro se c'è un task "workingAt"
router.post('/start', async (req, res) => {
    try {
        // Controlla se esiste un task in "In Progress"
        const inProgressTask = await tasks.findOne({ where: { state: 'workingAt' } });

        if (!inProgressTask) {
            return res.status(400).json({ message: 'Nessun task in progress. Avvia un task prima di iniziare il pomodoro.' });
        }

        const currentTime = new Date();

        // Aggiorna il task con l'orario attuale nella colonna time
        await tasks.update({ time: currentTime }, { where: { id: inProgressTask.id } });

        const tomatoCycle = await Tomato.findOne({ where: { last_used : true } });
        if (!tomatoCycle) { return res.status(400).json({ message: 'Nessuna configurazione trovata nella tabella tomatoes.' }); }
            setTimeout(async () => {
              try {
                await moveToNextTomato(tomatoCycle.id, taskId);
                console.log('Moved to the next tomato');
              } catch (error) {
                console.error('Errore nel passaggio al pomodoro successivo:', error);
              }
            }, nextTomato.duration * 60000);
          
          return res.status(400).json({ 
            message: 'Nessuna configurazione trovata nella tabella tomatoes.' 
          });
        

        res.json({ message: 'Task aggiornato con l\'orario attuale!', task: inProgressTask, time: currentTime });
    } catch (error) {
        console.error('Errore avvio pomodoro:', error);
        res.status(500).json({ message: 'Errore interno del server' });
    }
});



router.delete('/', async (req, res) => {
    const body = req.body;
    if (!body.id) {
      return res.status(400).json({ message: 'bad request' })
  }
    fn.deleteTask(body.id)
});

router.put('/', async (req, res) => {
  try {
    const taskId = req.body.id; 
    const updatedData = req.body;
    const updatedTask = await fn.updateTask(taskId, updatedData);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post('/stop', async (req, res) => {
  try {
      const inProgressTask = await tasks.findOne({ where: { state: 'workingAt' } });

      if (!inProgressTask) {
          return res.status(400).json({ message: 'Nessun task in progress da interrompere.' });
      }

      const tomatoCycle = await Tomato.findOne({ where: { last_used: true } });
      if (!tomatoCycle) {
          return res.status(400).json({ message: 'Nessuna configurazione trovata nella tabella tomatoes.' });
      }

      // Incrementa il contatore exploded
      tomatoCycle.exploded += 1;
      await tomatoCycle.save();

      // Aggiorna lo stato del task
      await tasks.update({ state: 'to do' }, { where: { id: inProgressTask.id } });

      res.json({ message: 'Timer interrotto e pomodoro segnato come esploso.' });
  } catch (error) {
      console.error('Errore nell\'interruzione del timer:', error);
      res.status(500).json({ message: 'Errore interno del server' });
  }
});


router.get('/resume', async (req, res) => {
  try {
      const inProgressTask = await tasks.findOne({ where: { state: 'workingAt' } });

      if (!inProgressTask) {
          return res.status(400).json({ message: 'Nessun task in progress. Avvia un task prima di iniziare il pomodoro.' });
      }

      const tomatoCycle = await Tomato.findOne({ where: { last_used: true } });
      if (!tomatoCycle) {
          return res.status(400).json({ message: 'Nessuna configurazione trovata nella tabella tomatoes.' });
      }

      const currentTime = new Date();
      const startTime = new Date(inProgressTask.time);
      const elapsedTime = (currentTime - startTime) / 60000; // tempo trascorso in minuti
      const remainingTime = tomatoCycle.duration - elapsedTime;

      if (remainingTime <= 0) {
          await fn.moveToNextTomato(tomatoCycle.id, inProgressTask.id);
          return res.json({ message: 'Il ciclo di pomodoro è già terminato e si è passati al successivo.' });
      }

      // Imposta un nuovo timer con il tempo rimanente
      setTimeout(async () => {
          try {
              await fn.moveToNextTomato(tomatoCycle.id, inProgressTask.id);
              console.log('Moved to the next tomato');
          } catch (error) {
              console.error('Errore nel passaggio al pomodoro successivo:', error);
          }
      }, remainingTime * 60000);

      res.json({ message: 'Timer ripreso con successo!', remainingTime: remainingTime });
  } catch (error) {
      console.error('Errore nel riprendere il timer:', error);
      res.status(500).json({ message: 'Errore interno del server' });
  }
});
module.exports = router
