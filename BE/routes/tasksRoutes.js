const express = require('express')
const router = express.Router();
const tasks = require('../entities/tasks.js');
const fn = require('../taskController.js')


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

// Avvia il timer del pomodoro se c'è un task "In Progress"
router.post('/start', async (req, res) => {
    try {
        // Controlla se esiste un task in "In Progress"
        const inProgressTask = await Task.findOne({ where: { state: 'In Progress' } });

        if (!inProgressTask) {
            return res.status(400).json({ message: 'Nessun task in progress. Avvia un task prima di iniziare il pomodoro.' });
        }

        // Avvia il timer del pomodoro
        res.json({ message: 'Timer pomodoro avviato!', task: inProgressTask });
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

module.exports = router
