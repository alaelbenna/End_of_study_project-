// Error handling middleware
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log error stack for debugging
  
    // Check if the error has a custom message, status, or default to 500 Internal Server Error
    const statusCode = err.status || 500;
    const message = err.message || 'Something went wrong!';
  
    // Send error response to the client
    res.status(statusCode).json({
      success: false,
      message: message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Don't expose stack in production
    });
  };
  