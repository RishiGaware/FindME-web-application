const mongoose = require('mongoose');

// Define the schema for a found person
const FoundPersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    index: true,
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
  age: {  // Add age field
    type: Number,
    required: true,
    min: 0, // You can set a minimum value for age if needed
  },
  picture: {
    type: String, // You will likely store the image as a URL or file path
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  uploadedBy: {
    type: String, 
    required: true,
  },
  ticketStatus: {
    type: String,
    enum: ['open', 'closed'], // Define the allowed values
    default: 'open', // Default value is 'open'
  },
});

// Create the model from the schema and export it
const FoundPerson = mongoose.model('FoundPerson', FoundPersonSchema);

module.exports = FoundPerson;
