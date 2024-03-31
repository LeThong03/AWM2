const fetch = require('node-fetch');

const loginCheck = async (email) => {
  try {
    // Fetch all users' data
    const url = 'http://localhost:5000/getAllUsers';
    const response = await fetch(url);
    const users = await response.json();

    // Log the users array
    console.log('All users:', users);

    // Find the user with the provided email
    const user = users.find(user => user.email === email);

    // If user is found, return "User found"
    if (user) {
      return "User found";
    } else {
      return "User not found";
    }
  } catch (error) {
    console.error('Error:', error);
    return "An unexpected error occurred.";
  }
};

// Example usage:
const email = "gcs2@example.com"; // Use the user's email

loginCheck(email)
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error('Error:', error);
  });
