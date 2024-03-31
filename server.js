// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('./User');

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

// Route to handle user login
app.post('/login', async (req, res) => {
  const { fullName, password } = req.body;
  try {
    // Find the user in the database based on the provided full name
    const user = await User.findOne({ fullName });
  
    // If user is not found, return an error
    if (!user) {
      return res.status(401).json({ message: 'Invalid full name or password' });
    }
  
    // Compare hashed passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid full name or password' });
    }
  
    // If user is found and password matches, return success message
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }  
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
