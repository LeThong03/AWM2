const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const User = require('./User');
const axios = require('axios');

const app = express();
const port = 5000;

// Connect to MongoDB
const MONGODB_URI = "mongodb+srv://unravengundam:22122003@test1.9oqrrcu.mongodb.net/";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error(err));

// Middleware
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Route to fetch all users
app.get('/getAllUsers', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

// Route to add a new user
app.post('/addUser', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

// Route to update a user
app.put('/updateUser/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

// Route to delete a user
app.delete('/deleteUser/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
