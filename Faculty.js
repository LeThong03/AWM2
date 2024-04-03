// Faculty.js

const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
});

// Define the Faculty model with the 'faculty' collection
const Faculty = mongoose.model('Faculty', facultySchema, 'faculty');

module.exports = Faculty;