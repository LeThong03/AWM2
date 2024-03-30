//server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./User');

const app = express();
const port = 5000;

// Connect to MongoDB
const MONGODB_URI = "mongodb+srv://unravengundam:22122003@test1.9oqrrcu.mongodb.net/";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Create a collection and insert sample data
    createCollectionAndInsertSampleData();
  })
  .catch(err => console.error(err));

// Middleware
app.use(bodyParser.json());

// Route to handle user registration (Create operation)
app.post('/signup', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to handle user login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find the user in the database based on the provided username
    const user = await User.findOne({ username });

    // If user is not found or password does not match, return an error
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // If user is found and password matches, return success message
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Function to create a collection and insert sample data
async function createCollectionAndInsertSampleData() {
  try {
    // Create a collection named 'users' if it doesn't exist
    await mongoose.connection.createCollection('users');

    // Insert sample data into the 'users' collection
    await User.insertMany([
      {
        fullName: "GCS1",
        email: "gcs1@example.com",
        password: "1234567",
        dateOfBirth: new Date("2009-01-01"),
        gender: "male",
        agreeTerms: true
      },
      // Add more sample data if needed
    ]);

    console.log('Sample data inserted successfully');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
