const express = require('express');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Admin = require('../models/admin')
const router = express.Router();
const { generateTokenAndSetCookie } = require( "../utils/generateTokenAndSetCookie");



router.post('/user-signup', async (req, res) => {
  try {
    const { name, username, phone, password } = req.body;
    const role = "user";  // Set role to 'user' by default
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ 
      name,
      username,
      phone, 
      password: hashedPassword, 
      role 
    });
    await newUser.save();
    
    generateTokenAndSetCookie(res, newUser._id, newUser.role);
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/admin-signup', async (req, res) => {
  try {
    const { name, username, phone, password } = req.body;
    const role = "admin";  // Set role to 'user' by default
    const existingUser = await Admin.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Admin({ 
      name,
      username,
      phone, 
      password: hashedPassword, 
      role 
    });
    await newUser.save();

    generateTokenAndSetCookie(res, newUser._id, newUser.role);
    res.status(201).json({ message: 'User registered successfully' });
  
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});



// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
      const user = await User.findOne({ username });  
      console.log(user)
      if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Use bcrypt.compare instead of compareSync for async consistency
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate token and set cookie
      generateTokenAndSetCookie(res, user._id, user.role);
      // console.log(user);

      
      // Return success response with user info
      return res.status(200).json({
          message: 'Login successful',
          user: {
              userId: user.userId ,
              name: user.name,
              username: user.username,
              role: user.role,
              authentication: true, // Set authentication to true
          }          
      });

  } catch (error) { 
      console.log(error);
      return res.status(500).json({ message: 'Server error' });
  }
});

  
// Logout route
router.post('/logout', (req, res) => {
    res.cookie('token', '', { maxAge: 0 }); // Clears the cookie
    res.status(200).json({ message: 'Logged out successfully' });
});
  

module.exports = router;
