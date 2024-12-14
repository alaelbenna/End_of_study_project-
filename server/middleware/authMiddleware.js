import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Middleware to protect routes by verifying JWT token
export const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key
    req.user = decoded; // Attach the decoded user info to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
  }
};

// Middleware to check if the user has an admin role (for example)
export const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // If the user is an admin, proceed to the next middleware
  } else {
    return res.status(403).json({ message: 'Forbidden. You do not have permission to access this resource.' });
  }
};
