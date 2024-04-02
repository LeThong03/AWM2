const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const bcrypt = require('bcrypt');
const User = require('./User');

const app = express();
const port = 5000;

// Connect to MongoDB
const MONGODB_URI = "mongodb+srv://admin:1234567890@awm.uh2y87l.mongodb.net/";
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

// Route to handle user login
app.post('/login', async (req, res) => {
  const { fullName, password } = req.body;

  // Check if full name or password is empty
  if (!fullName || !password) {
    return res.status(400).json({ message: 'Full name and password are required' });
  }

  try {
    // Find the user in the database based on the provided full name
    const user = await User.findOne({ fullName });

    // If user is not found, return an error
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Compare passwords
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // If user is found and password matches, return success message
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

// Route to handle user registration
app.post('/register', async (req, res) => {
  const { fullName, email, password, dateOfBirth, gender, agreeTerms } = req.body;

  // Validate input
  if (!fullName || !email || !password || !dateOfBirth || !gender || !agreeTerms) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Create a new user
    const newUser = new User({
      fullName,
      email,
      password, // You should hash the password before saving it
      dateOfBirth,
      gender,
      agreeTerms
    });

    // Save the user to the database
    await newUser.save();

    // Return success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
