const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  dateOfBirth: Date,
  gender: String,
  agreeTerms: Boolean
});

// Define the User model with the 'users' collection
const User = mongoose.model('User', userSchema, 'users');

module.exports = User;