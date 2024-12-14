const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const userRoute = require('./routes/user_routes');
const connectToDatabase = require('./config/database'); 

require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://127.0.0.1:5174', 'http://localhost:3001'], // Allow requests from these origins
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve EJS templates if needed
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

// Use routes
app.use('/auth', authRoutes);
app.use('/user', userRoute);

// Connect to database and start server
const port = process.env.PORT || 3000;
connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
