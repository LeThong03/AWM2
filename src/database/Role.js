// Import mongoose
const mongoose = require('mongoose');

// Define the Role schema
const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
});

// Create the Role model
const Role = mongoose.model('Role', roleSchema,);

// Export the Role model
module.exports = Role;