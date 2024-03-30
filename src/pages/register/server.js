// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserModel = require('./User'); // Import the UserModel

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

// Route to handle user registration
app.post('/api/register', async (req, res) => {
  try {
    const { fullName, email, password, dateOfBirth, gender, agreeTerms } = req.body;

    // Check if user with this email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create a new user instance
    const newUser = new UserModel({
      fullName,
      email,
      password,
      dateOfBirth,
      gender,
      agreeTerms,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
