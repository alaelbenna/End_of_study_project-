import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import stadiumRoutes from './routes/stadiumRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import { authenticateUser, authorizeAdmin } from './middleware/authMiddleware.js';
import { errorHandler } from './middleware/errorHandler.js';
import admin from './config/firebaseAdmin.js'; // Import Firebase admin
import testFirebaseRoute from './routes/testFirebaseRoute.js'; // Import test route

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Mini Football Stadium Reservation API');
});

// Test Firebase route (this uses the Firebase Admin SDK)
app.use('/api', testFirebaseRoute); // This will handle /api/test-firebase

// Firebase Example: Get user by email
app.get('/api/get-user-by-email', async (req, res) => {
  try {
    const user = await admin.auth().getUserByEmail('test@example.com'); // Example email
    res.status(200).json({
      message: 'Firebase User Retrieved!',
      user: user.toJSON(), // Return user data if found
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving user from Firebase',
      error: error.message,
    });
  }
});

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/stadiums', stadiumRoutes); // Stadium routes
app.use('/api/reservations', reservationRoutes); // Reservation routes

// Example of protected route for admins only
app.get('/admin', authenticateUser, authorizeAdmin, (req, res) => {
  res.status(200).json({ message: 'Welcome Admin' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
  });

// Error handling middleware (add this at the end)
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
