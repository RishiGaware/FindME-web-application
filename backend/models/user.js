const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Import uuid for unique ID generation

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: uuidv4, // Generate unique ID using uuid
    unique: true // Ensure userId is unique
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
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user'
  }
});

// Create and export the User model
const User = mongoose.model('User', UserSchema);
module.exports = User;
