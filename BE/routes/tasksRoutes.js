const express = require('express');
const router = express.Router();
const { tasks } = require('../entities/tasks');
const db = require('../main.js');


router.get('/', async (req,res) => {
    return res.json(await tasks.findAll())
})


router.post('/', async (req, res) => {
    const body = req.body
    if (!body.title || !body.description) {
        return res.status(400).json({ message: 'bad request' })
    }
    const newTask = await task.create({
        title: body.title,
        description: body.description
    })
    db.main(task)
});


module.exports = { router }