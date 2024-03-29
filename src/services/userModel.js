// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  dateOfBirth: Date,
  gender: String,
  agreeTerms: Boolean,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
