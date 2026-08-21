// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Terjadi kesalahan pada server';

  res.status(statusCode).json({
    success: false,
    message: message,
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

// Not found handler
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan'
  });
};

module.exports = { errorHandler, notFound };
