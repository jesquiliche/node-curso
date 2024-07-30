const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const app = express();
const port = 4000;

mongoose.connect('mongodb://127.0.0.1:27017/mydatabase');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware para parsear JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Ruta para crear un nuevo usuario
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Ruta para obtener todos los usuarios
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});