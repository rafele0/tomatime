const express = require('express')
const router = express.Router();
const fn = require('../taskController.js')
const users = require('../entities/users.js')


router.post('/singup', async (req, res) => {
    const body = req.body
    if (!body.email || !body.password || !body.username) {
        return res.status(400).json({ message: 'bad request' })
    }
    if (await users.findOne({ where: { email: body.email } })) {
        return res.status(400).json({ message: 'email already in use' })
    }

    const newUser = {
        username: body.username,
        email: body.email,
        password: body.password
    }
    res.status(200).json((await users.create(newUser)).toJSON());
});

router.post('/login', async (req, res) => {
    const body = req.body;
    if (!body.email || !body.password) {
        return res.status(400).json({ message: 'bad request' });
    }
    const user = await users.findOne({ where: { email: body.email } });
    if (!user) {
        return res.status(400).json({ message: 'user not found' });
    }
    if (user.password !== body.password) {
        return res.status(400).json({ message: 'wrong password' });
    }
    res.status(200).json({ token: 'fake-jwt-token', user: user.toJSON() });
});


module.exports = router;