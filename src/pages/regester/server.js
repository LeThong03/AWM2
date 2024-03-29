const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const UserModel = require('./UserModel'); // Import the UserModel

const app = express();
const port = 5000;

// Connect to MongoDB
const MONGODB_URI = "mongodb+srv://unravengundam:22122003@test1.9oqrrcu.mongodb.net/";
const DATABASE_NAME = "Test1";

let db;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    db = mongoose.connection;
  })
  .catch(err => console.error(err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to handle user registration
app.post('/signup', async (req, res) => {
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

// Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  // Find user in database
  const user = await UserModel.findOne({ email: username });

  if (!user) {
    return res.status(401).send('User not found');
  }

  // Compare passwords
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).send('Invalid password');
  }

  // Successful login
  res.status(200).json({ message: 'Login successful', user });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
