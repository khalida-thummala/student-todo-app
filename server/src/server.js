const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db'); // ✅ MongoDB connection

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get('/', (req, res) => {
  res.send('✅ Student To-Do App backend is running!');
});

// TEMPORARY TEST ROUTE — to verify MongoDB Models
const User = require('./models/User');
const Task = require('./models/Task');

app.get('/test-models', async (req, res) => {
  try {
    const testUser = await User.create({
      name: 'Test User',
      email: 'testuser2@gmail.com',
      password: '123456'
    });

    const testTask = await Task.create({
      user: testUser._id,
      title: 'My first test task',
      description: 'Checking if database works correctly',
    });

    res.json({
      message: 'Models working fine!',
      user: testUser,
      task: testTask
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
