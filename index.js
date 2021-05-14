const express = require('express');
const cors = require('cors');

const app = new express();
app.use(express.json());
app.use(cors());

const users = {};

app.post('/signup', (req, res) => {
  const { username } = req.body;

  if (!users[username]) {
    users[username] = req.body;
    res.status(201).send(req.body);
  } else {
    res.status(409).send('User with username exists!');
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!users[username] || users[username].password !== password) {
    res.status(401).send('Username or password incorrect!');
  }
  res.status(200).send();
});

app.get('/users', (req, res) => {
  res.status(200).send(users);
});

app.listen(3001, () => {
  console.log('Listening on port 3001');
});
