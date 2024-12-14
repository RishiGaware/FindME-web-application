const express = require('express');
const router = express.Router();
const User = require('../models/user');
const  authenticateToken  = require('../middleware/authenticateToken');

const FoundPerson = require('../models/foundPerson');
const LostPerson = require('../models/lostPerson');
const { uploadFound, uploadLost } = require('../middleware/multerConfig');

router.use(express.json())
// Route to handle found person form submission
router.post('/found-person', uploadFound, async (req, res) => {
  try {
    // Extract user data from the verified token
    const userId = req.body.userId;

    // Extract form data from req.body
    const { name, phone, city, state, age } = req.body; // Add age to the destructuring
    console.log('Form data received:', req.body);

    // Ensure that all required fields are provided
    if (!name || !phone || !city || !state || !age || !req.file) { // Check for age as well
      return res.status(400).json({ message: 'All fields, including the picture, are required.' });
    }

    // Create a new found person entry
    const newPerson = new FoundPerson({
      name,
      phone,
      city,
      state,
      age, // Store the age received from the request
      picture: `/uploads/found/${req.file.filename}`, // Store the file path for the uploaded picture
      uploadedBy: userId, // Store the ID of the user who uploaded the data
      createdAt: Date.now(), // Optional: You can manually set createdAt if needed (optional)
    });

    // Save the entry to the database
    await newPerson.save();

    // Send a success response
    res.status(201).json({ message: 'Person data saved successfully', data: newPerson });
  } catch (error) {
    console.error('Error saving person data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Define the route for creating a lost person entry
router.post('/lost-person', uploadLost, async (req, res) => {
  try {
    const { name, phone, address, aadhar, city, state, age } = req.body; // Include age in the destructured body
    console.log(req.body);

    // Create a new lost person entry
    const newLostPerson = new LostPerson({
      name,
      phone,
      address,
      aadhar,
      city,
      state,
      age, // Add age to the lost person entry
      picture: `/uploads/lost/${req.file.filename}`, // Store the file path
      uploadedBy: req.body.userId, // Assuming req.user is set after authentication
    });

    // Save to the database
    await newLostPerson.save();
    res.status(201).json({ message: 'Lost person data saved successfully!', data: newLostPerson });
  } catch (error) {
    console.error('Error saving lost person data:', error);
    res.status(500).json({ message: 'Error saving lost person data', error: error.message });
  }
});





router.post('/foundlist-openticket', async (req, res) => {
  try {
    const { userId } = req.body; // Assuming userId is sent in the request body

    // Ensure userId is provided
    if (!userId) {
      return res.status(400).json({ msg: 'User ID is required' });
    }

    // Find all records where ticketStatus is 'open' and uploadedBy matches userId
    const openTickets = await FoundPerson.find({ ticketStatus: 'open', uploadedBy: userId });
    // console.log("open ticket<<",openTickets,"");

    if (!openTickets || openTickets.length === 0) {
      return res.status(404).json({ msg: 'No open tickets found for this user' });
    }

    // Return the list of open tickets for the specific user
    res.json(openTickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});


router.post('/foundlist-closedticket', async (req, res) => {
  try {
    const { userId } = req.body; // Assuming userId is sent in the request body

    // Ensure userId is provided
    if (!userId) {
      return res.status(400).json({ msg: 'User ID is required' });
    }

    // Find all records where ticketStatus is 'closed' and uploadedBy matches userId
    const closedTickets = await FoundPerson.find({ ticketStatus: 'closed', uploadedBy: userId });



    if (!closedTickets || closedTickets.length === 0) {
      return res.status(404).json({ msg: 'No closed tickets found for this user' });
    }

    // Return the list of closed tickets for the specific user
    res.json(closedTickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});


// Route for fetching open tickets for lost persons
router.post('/lostlist-openticket', async (req, res) => {
  try {
    const { userId } = req.body; // Assuming userId is sent in the request body

    // Ensure userId is provided
    if (!userId) {
      return res.status(400).json({ msg: 'User ID is required' });
    }

    // Find all records where ticketStatus is 'open' and uploadedBy matches userId
    const openLostTickets = await LostPerson.find({ ticketStatus: 'open', uploadedBy: userId });
    // console.log("open ticket<<",openLostTickets,"");


    if (!openLostTickets || openLostTickets.length === 0) {
      return res.status(404).json({ msg: 'No open tickets found for this user' });
    }

    // Return the list of open tickets for the specific user
    res.json(openLostTickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Route for fetching closed tickets for lost persons
router.post('/lostlist-closedticket', async (req, res) => {
  try {
    const { userId } = req.body; // Assuming userId is sent in the request body

    // Ensure userId is provided
    if (!userId) {
      return res.status(400).json({ msg: 'User ID is required' });
    }

    // Find all records where ticketStatus is 'closed' and uploadedBy matches userId
    const closedLostTickets = await LostPerson.find({ ticketStatus: 'closed', uploadedBy: userId });

    if (!closedLostTickets || closedLostTickets.length === 0) {
      return res.status(404).json({ msg: 'No closed tickets found for this user' });
    }

    // Return the list of closed tickets for the specific user
    res.json(closedLostTickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});






//match Ticket Routes
router.post('/foundlist-usertickets', async (req, res) => {
  try {
    const { userId } = req.body; // Assuming userId is sent in the request body

    // Ensure userId is provided
    if (!userId) {
      return res.status(400).json({ msg: 'User ID is required' });
    }

    // Find all records where uploadedBy matches userId and ticketStatus is not 'closed'
    const allTickets = await FoundPerson.find({
      uploadedBy: userId,
      ticketStatus: { $ne: 'closed' } // Exclude tickets with ticketStatus 'closed'
    });

    // Check if there are no records
    if (!allTickets || allTickets.length === 0) {
      return res.status(404).json({ msg: 'No tickets found for this user' });
    }

    // Return the list of all tickets for the specific user except 'closed' ones
    res.json(allTickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/lostlist-usertickets', async (req, res) => {
  try {
    const { userId } = req.body; // Assuming userId is sent in the request body

    // Ensure userId is provided
    if (!userId) {
      return res.status(400).json({ msg: 'User ID is required' });
    }

    // Find all records where uploadedBy matches userId and ticketStatus is not 'closed'
    const allTickets = await LostPerson.find({
      uploadedBy: userId,
      ticketStatus: { $ne: 'closed' } // Exclude tickets with ticketStatus 'closed'
    });

    // Check if there are no records
    if (!allTickets || allTickets.length === 0) {
      return res.status(404).json({ msg: 'No tickets found for this user' });
    }

    // Return the list of all tickets for the specific user except 'closed' ones
    res.json(allTickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/foundlist-alltickets', async (req, res) => {
  const { userId } = req.query; // Assuming userId is passed as a query parameter

  try {
    // Fetch all records in the FoundPerson collection except those uploaded by the specified userId
    const allTickets = await FoundPerson.find({ uploadedBy: { $ne: userId } });

    // Check if there are no records
    if (!allTickets || allTickets.length === 0) {
      return res.status(404).json({ msg: 'No found person records available.' });
    }

    // Return the list of all found person records
    res.json(allTickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/lostlist-alltickets', async (req, res) => {
  const { userId } = req.query; // Assuming userId is passed as a query parameter

  try {
    // Fetch all records in the LostPerson collection except those uploaded by the specified userId
    const allTickets = await LostPerson.find({ uploadedBy: { $ne: userId } });

    // Check if there are no records
    if (!allTickets || allTickets.length === 0) {
      return res.status(404).json({ msg: 'No lost person records available.' });
    }

    // Return the list of all lost person records
    res.json(allTickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});





//update ticket status routes

// Route to update ticket status in both LostPerson and FoundPerson
router.post('/ticket-status-closed', async (req, res) => {
  const { userId, ticketId } = req.body; // Extract userId and ticketId from the request body

  if (!userId || !ticketId) {
    return res.status(400).json({ message: 'Missing userId or ticketId' });
  }

  try {
    // Find the ticket in LostPerson collection first
    let ticket = await LostPerson.findOne({ _id: ticketId, uploadedBy: userId });

    // If not found in LostPerson, search in FoundPerson
    if (!ticket) {
      ticket = await FoundPerson.findOne({ _id: ticketId, uploadedBy: userId });
    }

    // If ticket is still not found, return a 404 error
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found or user does not have permission' });
    }

    // Update the ticket status to "closed"
    ticket.ticketStatus = 'closed';
    await ticket.save(); // Save the updated ticket

    res.status(200).json({ message: 'Ticket status updated successfully', ticket });
  } catch (error) {
    console.error('Error updating ticket status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});





module.exports = router;
