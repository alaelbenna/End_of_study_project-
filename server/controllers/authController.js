import bcrypt from 'bcryptjs';
import User from '../models/User.js';  // Assuming you have a User model for MongoDB

// Register user
export const registerUser = async (req, res) => {
  const { email, password, age, isActive } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      age,
      isActive,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: 'User registered successfully!' });

  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Respond with success message (you can add JWT token generation here)
    res.status(200).json({ message: 'User logged in successfully!' });

  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
