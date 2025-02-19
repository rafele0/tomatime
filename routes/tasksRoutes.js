const express = require('express')
const router = express.Router();
const { Author } = require('../entities');


router.get('/', async (req,res) => {
    return res.json(await Author.findAll())
})