const express = require('express')
const router = express.Router();
const tasks = require('../entities/tasks.js');
const fn = require('../taskController.js')
const Tomato = require('../entities/tomatoes.js');
const { combineTableNames } = require('sequelize/lib/utils');



router.get('/', async (req,res) => {
    const userId = req.query.userId;
    return res.json(await tasks.findAll({where: {id_user: userId}}));
})

router.post('/', async (req, res) => {
    const body = req.body
    if (!body.title) {
        return res.status(400).json({ message: 'bad request' })
    }
    const newTask = {
        title: body.title,
        description: body.description,
        user_id: body.userId
    }
    res.status(200).json((await fn.create(newTask)).toJSON());
    
});

/*--------------------------------------------------------------------*/


  router.delete('/:id', async (req, res) => {
    try {
      const taskId = req.params.id; 
      await fn.deleteTask(taskId); 
      res.status(200).json({ message: 'Task deleted successfully' }); 
    } catch (error) {
      res.status(400).json({ error: error.message }); 
    }
  });


  /*--------------------------------------------------------------------*/


router.get('/timer', async (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
            return res.status(400).json({ message: 'user_id is required' });
    }

    let tomatoCycle = await Tomato.findOne({ where: { last_used: true, user_id: userId } });
    if (!tomatoCycle) {
            await Tomato.create({ user_id: userId, last_used: true, duration: 25, state: 'tomate', exploded: 0 });
            await Tomato.create({ user_id: userId, last_used: false, duration: 5, state: 'short break', exploded: 0 });
            await Tomato.create({ user_id: userId, last_used: false, duration: 25, state: 'tomate', exploded: 0 });
            await Tomato.create({ user_id: userId, last_used: false, duration: 5, state: 'short break', exploded: 0 });
            await Tomato.create({ user_id: userId, last_used: false, duration: 25, state: 'tomate', exploded: 0 });
            await Tomato.create({ user_id: userId, last_used: false, duration: 5, state: 'short break', exploded: 0 });
            await Tomato.create({ user_id: userId, last_used: false, duration: 25, state: 'tomate', exploded: 0 });
            await Tomato.create({ user_id: userId, last_used: false, duration: 15, state: 'long break', exploded: 0 });
            tomatoCycle = await Tomato.findOne({ where: { last_used: true, user_id: userId } });
    }

    const remainingTime = tomatoCycle.duration;
    return res.status(200).json({ message: 'Task aggiornato con l\'orario attuale!', remainingTime: remainingTime });
 });
 

// Avvia il timer del pomodoro se c'è un task "workingAt"
router.get('/start', async (req, res) => {
    try {
        const userId = req.body.id;
        if (!userId) {
            return res.status(400).json({ message: 'user_id is required' });
        }

        // Controlla se esiste un task in "In Progress" per l'utente specifico
        const inProgressTask = await tasks.findOne({ where: { state: 'workingAt', user_id: userId } });

        if (!inProgressTask) {
            return res.status(400).json({ message: 'Nessun task in progress. Avvia un task prima di iniziare il pomodoro.' });
        }

        const currentTime = new Date();

        // Aggiorna il task con l'orario attuale nella colonna time
        await tasks.update({ time: currentTime }, { where: { id: inProgressTask.id } });

        res.json({ message: 'Task aggiornato con l\'orario attuale!', task: inProgressTask, time: currentTime });
    } catch (error) {
        console.error('Errore avvio pomodoro:', error);
        res.status(500).json({ message: 'Errore interno del server' });
    }
});


router.get('/next', async (req, res) => {
    const userId = req.body.id;
    if (!userId) {
        return res.status(400).json({ message: 'user_id is required' });
    }
    const tomatoCycle = await Tomato.findOne({ where: { last_used: true, user_id: userId } });
    if (!tomatoCycle) {
        return res.status(400).json({ message: 'Nessuna configurazione trovata nella tabella tomatoes.' });
    }
    const newTomato = await fn.moveToNextTomato(tomatoCycle.id);
    res.json({ message: 'Passaggio al pomodoro successivo', newTomato: newTomato });
    });



router.put('/:id', async (req, res) => {
  try {
    const taskId = req.params.id; 
    const updatedData = req.body;
    const updatedTask = await fn.updateTask(taskId, updatedData);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});




router.put('/state', async (req, res) => {
  try {
    const taskId = req.body.taskId; 
    const updatedData = req.body.state;
    const updatedTask = await fn.updateTaskState(taskId, updatedData);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post('/stop', async (req, res) => {
try {
        const userId = req.body.id;
        if (!userId) {
                return res.status(400).json({ message: 'user_id is required' });
        }

        const inProgressTask = await tasks.findOne({ where: { state: 'workingAt', user_id: userId } });

        if (!inProgressTask) {
                return res.status(400).json({ message: 'Nessun task in progress da interrompere.' });
        }

        const tomatoCycle = await Tomato.findOne({ where: { last_used: true, user_id: userId } });
        if (tomatoCycle === null) {
                return res.status(400).json({ message: 'Nessuna configurazione trovata nella tabella tomatoes.' });
        }

        if(tomatoCycle.state !== 'tomate') {
            return res.status(400).json({ message: 'Non è possibile interrompere il timer se non è in corso un ciclo di pomodoro.' });
        }
        tomatoCycle.exploded += 1;
        await tomatoCycle.save();

        // Aggiorna lo stato del task
        await tasks.update({ state: 'to do' }, { where: { id: inProgressTask.id, user_id: userId } });

        res.json({ message: 'Timer interrotto e pomodoro segnato come esploso.' });
} catch (error) {
        console.error('Errore nell\'interruzione del timer:', error);
        res.status(500).json({ message: 'Errore interno del server' });
}
});


router.get('/exploded', async (req, res) => {
    try {
        const userId = req.params.user_id;
        if (!userId) {
            return res.status(400).json({ message: 'user_id is required' });
        }

        const tomatoes = await Tomato.findAll({ where: { user_id: userId } });
        const totalExploded = tomatoes.reduce((sum, tomato) => sum + tomato.exploded, 0);

        res.json({ user_id: userId, totalExploded: totalExploded });
    } catch (error) {
        console.error('Errore nel recupero dei task esplosi:', error);
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
