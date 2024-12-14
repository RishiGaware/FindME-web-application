const mongoose = require('mongoose');

// Define the schema for a lost person
const LostPersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    index: true, // Optional: to enable indexing for quick search
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  aadhar: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  age: { // Add the age field
    type: Number, // Assuming age will be a number
    required: true, // Set this to true if age is a required field
  },
  picture: {
    type: String, // This will likely store the image URL or file path after upload
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  uploadedBy: {
    type: String, // Assuming you want to link to a user
    required: true,
  },
  ticketStatus: {
    type: String,
    enum: ['open', 'closed'], // Define the allowed values
    default: 'open', // Default value is 'open'
  },
});

// Create the model from the schema and export it
const LostPerson = mongoose.model('LostPerson', LostPersonSchema);

module.exports = LostPerson;
