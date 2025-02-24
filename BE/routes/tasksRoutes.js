const express = require('express')
const router = express.Router();
const { tasks } = require('../entities/tasks');


router.get('/', async (req,res) => {
    return res.json(await tasks.findAll())
})



module.exports = { router }