const multer = require('multer');
const path = require('path');

// Set storage for found persons
const foundStorage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads/found/'), // Correct path for found persons
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original file name without modification
  }
});

// Set storage for lost persons
const lostStorage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads/lost/'), // Correct path for lost persons
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original file name without modification
  }
});

// Init uploads
const uploadFound = multer({
  storage: foundStorage,
  limits: { fileSize: 5000000 }, // 1MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
}).single('picture');

const uploadLost = multer({
  storage: lostStorage,
  limits: { fileSize: 5000000 }, // 1MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
}).single('picture');

// Export the uploads
module.exports = {
  uploadFound,
  uploadLost,
};
