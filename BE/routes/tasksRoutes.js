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