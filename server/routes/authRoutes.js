// /routes/authRoutes.js
import express from 'express';
import { validateEmail, validatePassword, handleValidationErrors, validateAge, validateActive } from '../utils/validators.js';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Register route
router.post('/register', 
  validateEmail,
  validatePassword,
  validateAge,
  validateActive,
  handleValidationErrors,
  registerUser
);

// Login route
router.post('/login', 
  validateEmail,
  validatePassword,
  handleValidationErrors,
  loginUser
);

export default router;
