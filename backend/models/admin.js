const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Import uuid for unique ID generation

// Define the Admin schema
const AdminSchema = new mongoose.Schema({
    adminId: {
        type: String,
        default: uuidv4, // Generate unique ID using uuid
        unique: true // Ensure adminId is unique
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true // Ensure usernames are unique
    },
    phone: {
        type: String,
        required: true,
        unique: true // Ensure phone numbers are unique
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'admin', // Set role to 'admin' by default
        required: true
    }
});

// Create and export the Admin model
const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
