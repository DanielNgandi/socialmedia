const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Prisma errors
  if (err.code && err.code.startsWith('P')) {
    return res.status(400).json({
      error: 'Database error',
      details: err.meta?.target || err.meta?.cause,
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token' });
  }

  // Default error response
  res.status(500).json({
    error: 'Something went wrong',
    message: err.message,
  });
};

export default errorHandler;
