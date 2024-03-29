const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./userModel');

const app = express();
const port = process.env.PORT || 5000;

const MONGODB_URI = "mongodb+srv://unravengundam:<matkhau3>@awm.sgqxzf6.mongodb.net/AWM";
const DATABASE_NAME = "AWM";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

app.use(cors());
app.use(bodyParser.json());

// Create a new user
app.post('/api/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
