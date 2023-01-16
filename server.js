const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();

app.get('/users', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json(err));
});


//my routes
app.post('/users', (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  newUser
    .save()
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
});

app.put('/users/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
});

app.delete('/users/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => res.json({ success: true }))
    .catch(err => res.status(400).json(err));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});