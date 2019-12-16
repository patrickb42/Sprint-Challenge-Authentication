const router = require('express').Router();
const Bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');

const db = require('../database/dbConfig');

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (username === undefined || password === undefined) {
    return (res.status(400).json({ message: 'must provide username and password' }));
  }

  const hashedPassword = Bcrypt.hashSync(password, 12);

  try {
    const result = await db('users')
      .insert({ username, password: hashedPassword })
      .then(([id]) => db('users')
        .where({ id })
        .first()
      );
    return ((!!result)
      ? res.status(201).json({
        token: Jwt.sign(
          {
            subject: result.id,
            username: result.username,
          },
          process.env.JWT_SECRET || 'test',
          {
            expiresIn: '120 days',
          },
        )
      })
      : res.status(500).json({ message: 'error registering user' })
    );
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'error registering user',
    });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (username === undefined || password === undefined) {
    return (res.status(400).json({ message: 'must provide username and password' }));
  }

  try {
    const result = await db('users').where({ username }).first();
    return ((!!result && Bcrypt.compareSync(password, result.password))
      ? res.status(200).json({
        token: Jwt.sign(
          {
            subject: result.id,
            username: result.username,
          },
          process.env.JWT_SECRET || 'test',
          {
            expiresIn: '120 days',
          },
        )
      })
      : res.status(500).json({ message: 'invalid credentials' })
    )
  } catch (err) {
    return res.status(500).json({
      error: 'error logging in',
      message: err.message,
    });
  }
});

module.exports = router;
