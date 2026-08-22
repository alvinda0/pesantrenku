// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Terjadi kesalahan pada server';

  res.status(statusCode).json({
    success: false,
    message: message,
    status: statusCode,
    timestamp: new Date().toISOString(),
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

// Not found handler
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan',
    status: 404,
    timestamp: new Date().toISOString()
  });
};

module.exports = { errorHandler, notFound };
