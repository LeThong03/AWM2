const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  studentName: String,
  faculty: String,
  magazineTitle: String,
  magazineContent: String,
  coverImage: String,
  document: String,
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
