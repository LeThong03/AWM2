const fetch = require('node-fetch');
const readline = require('readline');

const loginCheck = async (fullName, password) => {
  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullName, password }),
    });

    const data = await response.json();

    if (response.status === 200) {
      console.log('Login successful:', data.message);
      console.log('User:', data.user); // If you want to see the user details
    } else {
      console.error('Login failed:', data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your full name: ', (fullName) => {
  rl.question('Enter your password: ', (password) => {
    loginCheck(fullName, password);
    rl.close();
  });
});
