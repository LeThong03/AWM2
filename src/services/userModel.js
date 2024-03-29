const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other']
  },
  agreeTerms: {
    type: Boolean,
    required: true
  }
});

// Create the user model
const User = mongoose.model('User', userSchema);

module.exports = User;
