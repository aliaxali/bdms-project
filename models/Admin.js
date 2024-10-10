// models/Admin.js
const mongoose = require('mongoose'); // Import mongoose

// Define the Admin Schema
const AdminSchema = new mongoose.Schema({
    username: {
        type: String, // The username should be a string
        required: true, // The username is required
        unique: true // The username must be unique
    },
    password: {
        type: String, // The password should be a string
        required: true // The password is required
    }
});

// Export the Admin model
module.exports = mongoose.model('Admin', AdminSchema);
