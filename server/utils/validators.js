import { body } from 'express-validator';

// Validate email format
export const validateEmail = body('email').isEmail().withMessage('Invalid email format');

// Validate password length
export const validatePassword = body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long');

// Validate age (optional, if required)
export const validateAge = body('age').isInt({ min: 18 }).withMessage('Age must be at least 18');

// Validate active status (optional)
export const validateActive = body('isActive').isBoolean().withMessage('Active status must be a boolean');

// Handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
