const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/User');
const Address = require('./models/Address');
const connectDB = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

// Route to register user and store addresses
app.post('/register', async (req, res) => {
  try {
    const { name, street, city, state, zip } = req.body;
    const user = new User({ name });
    const address = new Address({
      street,
      city,
      state,
      zip,
      user: user._id, // associate the address with the user
    });

    // Save the user and address to the database
    await user.save();
    await address.save();

    user.addresses.push(address._id);
    await user.save();

    res.status(201).json({
      message: 'User and address created successfully',
      user,
      address,
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during registration' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
