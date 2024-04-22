const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const User = require('./User');
const Faculty = require('./Faculty');
const Submission = require('./Submission');
const SubmissionWindow = require('./SubmissionWindow')

const app = express();
const port = 5000;

// Connect to MongoDB
const MONGODB_URI = "mongodb+srv://unravengundam:22122003@test1.9oqrrcu.mongodb.net/";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error(err));

// Middleware
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Route to fetch all users
app.get('/getAllUsers', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

// Route to handle user login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if full name or password is empty
  if (!username || !password) {
    return res.status(400).json({ message: 'Full name and password are required' });
  }

  try {
    // Find the user in the database based on the provided full name
    const user = await User.findOne({ username });

    // If user is not found, return an error
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Compare passwords
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // If user is found and password matches, return success message
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

// Route to fetch all faculties
app.get('/getAllFaculties', async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.status(200).json(faculties);
  } catch (error) {
    console.error('Error fetching faculties:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

// Route to fetch submission based on username
app.get('/fetchSubmission', async (req, res) => {
  try {
    const username = req.query.username;
    const submissions = await Submission.find({ studentName: username });
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

app.get('/selectedSubmissions', async (req, res) => {
  try {
    // Fetch selected submissions with status 'Approved For Publication'
    const submissions = await Submission.find({ submissionStatus: 'Approved For Publication' });
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Error fetching selected submissions:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

// Route to fetch submission based on username Faculty
app.get('/coordinatorFetchSubmission', async (req, res) => {
  try {
    const username = req.query.username;
    // Assuming there's a field in the user document that stores the faculty information
    const coordinator = await User.findOne({ username }); // Fetch the coordinator document based on the username
    if (!coordinator) {
      return res.status(404).json({ message: 'Coordinator not found.' });
    }
    // Fetch submissions based on the coordinator's faculty
    const submissions = await Submission.find({ faculty: coordinator.faculty });
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

// Route to get faculty based on username
app.get('/getFaculty', async (req, res) => {
  const { username } = req.query;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ faculty: user.faculty });
  } catch (error) {
    console.error('Error fetching faculty:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

// Route to add a new user
app.post('/addUser', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

// Route to update a user
app.put('/updateUser/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

// Route to delete a user
app.delete('/deleteUser/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    // Generate a unique filename
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Route to handle magazine submission
app.post('/submitMagazine', upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'document', maxCount: 1 }]), async (req, res) => {
  try {
    const { studentName, faculty, magazineTitle, magazineContent } = req.body;
    const coverImage = req.files['coverImage'][0].filename;
    const document = req.files['document'][0].filename;

    // Create a new submission document
    const newSubmission = new Submission({
      studentName,
      faculty,
      magazineTitle,
      magazineContent,
      coverImage,
      document
    });

    // Save the submission to the database
    await newSubmission.save();

    res.status(201).json({ message: 'Magazine submitted successfully' });
  } catch (error) {
    console.error('Error submitting magazine:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

app.get('/submissionWindow/:faculty', async (req, res) => {
  const faculty = req.params.faculty;

  try {
    // Fetch submission window for the specified faculty
    const submissionWindow = await SubmissionWindow.findOne({ faculty });

    if (submissionWindow) {
      res.status(200).json(submissionWindow);
    } else {
      res.status(404).json({ message: 'Submission window not found for the specified faculty.' });
    }
  } catch (error) {
    console.error('Error fetching submission window:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

// Route to update the submission window
app.put('/updateSubmissionWindow', async (req, res) => {
  const { faculty, startTime, endTime } = req.body;

  try {
    // Find the submission window for the specified faculty
    const submissionWindow = await SubmissionWindow.findOne({ faculty });

    if (!submissionWindow) {
      return res.status(404).json({ message: 'Submission window not found for the specified faculty.' });
    }

    // Update the submission window with the provided start and end times
    submissionWindow.startTime = startTime;
    submissionWindow.endTime = endTime;

    // Save the updated submission window
    await submissionWindow.save();

    // Respond with the updated submission window
    res.status(200).json(submissionWindow);
  } catch (error) {
    console.error('Error updating submission window:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});


// Route to create a new submission window
app.post('/createSubmissionWindow', async (req, res) => {
  const { faculty, startTime, endTime } = req.body;

  try {
    const existingWindow = await SubmissionWindow.findOne({ faculty });

    if (existingWindow) {
      return res.status(400).json({ message: 'Submission window already exists for this faculty.' });
    }

    const newSubmissionWindow = new SubmissionWindow({ faculty, startTime, endTime });
    await newSubmissionWindow.save();

    res.status(201).json({ message: 'Submission window created successfully.' });
  } catch (error) {
    console.error('Error creating submission window:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

// Route to update a submission
app.put('/updateSubmission/:id', async (req, res) => {
  const submissionId = req.params.id;
  const { submissionStatus, comment } = req.body;

  try {
    // Find the submission by its ID
    const submission = await Submission.findById(submissionId);

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    // Update the submission status and comment
    submission.submissionStatus = submissionStatus;
    submission.comment = comment;

    // Save the updated submission
    await submission.save();

    // Respond with the updated submission
    res.status(200).json(submission);
  } catch (error) {
    console.error('Error updating submission:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

app.delete('/deleteSubmission/:Id', async (req, res) => {
  const submissionId = req.params.submissionId;

  try {
    // Make a database call to delete the submission by submissionId
    await Submission.findByIdAndDelete(submissionId);

    // Reset the status back to default (Pending) and delete the comment
    const updatedSubmission = await Submission.findByIdAndUpdate(submissionId, {
      submissionStatus: 'pending',
      comment: ''
    }, { new: true });

    res.status(200).json(updatedSubmission);
  } catch (error) {
    console.error('Error deleting submission:', error);
    res.status(500).json({ error: 'Error deleting submission' });
  }
});

// Define a route to fetch submissions with the status "Approved for Publication"
app.get('/approvedSubmissions', async (req, res) => {
  try {
    // Query the database to find submissions with the status "Approved for Publication"
    const submissions = await Submission.find({ submissionStatus: 'Approved for Publication' }).populate('faculty');
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching approved submissions:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
