// Import mongoose
const mongoose = require('mongoose');

// Define the Faculty schema
const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  coordinator: {
    type: String,
    required: true
  }
});

// Create the Faculty model
const Faculty = mongoose.model('Faculty', facultySchema);

// Export the Faculty model
module.exports = Faculty;
