// Submission.js
const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  studentName: String,
  magazineTitle: String,
  magazineContent: String,
  coverImage: String, // Store the URL of the cover image
  document: String, // Store the URL of the document (PDF)
  faculty: String, // Assuming you want to associate submissions with a faculty
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
