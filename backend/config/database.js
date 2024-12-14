const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const connectToDatabase = async () => {
  const dbURI = process.env.MONGODB_URI;

  try {
    await mongoose.connect(dbURI); // Removed deprecated options
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Error while connecting to Database:', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectToDatabase;
