const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../entities/users.js'); // Assicurati di importare correttamente il modello User

router.post('/signup', async (req, res) => {
  const body = req.body;
  if (!body.email || !body.password || !body.username) {
    return res.status(400).json({ message: 'bad request' });
  }
  if (await User.findOne({ where: { email: body.email } })) {
    return res.status(400).json({ message: 'email already in use' });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);
  const newUser = {
    username: body.username,
    email: body.email,
    password: hashedPassword
  };
  res.status(200).json((await User.create(newUser)).toJSON());
});

router.post('/login', async (req, res) => {
  const body = req.body;
  if (!body.email || !body.password) {
    return res.status(400).json({ message: 'bad request' });
  }
  const user = await User.findOne({ where: { email: body.email } });
  if (!user) {
    return res.status(400).json({ message: 'user not found' });
  }
  const isPasswordValid = await bcrypt.compare(body.password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'wrong password' });
  }
  res.status(200).json({ token: 'fake-jwt-token', user: user.toJSON() });
});

module.exports = router;