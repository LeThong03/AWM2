// routes.js
const express = require('express');
const router = express.Router();
const Submission = require('./Submission');

// Route to handle magazine submission
router.post('/submitMagazine', async (req, res) => {
  try {
    const { studentName, magazineTitle, magazineContent, coverImage, document, faculty } = req.body;

    // Create a new submission document
    const newSubmission = new Submission({
      studentName,
      magazineTitle,
      magazineContent,
      coverImage,
      document,
      faculty,
    });

    // Save the submission to the database
    await newSubmission.save();

    res.status(201).json({ message: 'Magazine submitted successfully' });
  } catch (error) {
    console.error('Error submitting magazine:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

module.exports = router;
