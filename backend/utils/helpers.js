// Format date to YYYY-MM-DD
const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Format time to HH:MM:SS
const formatTime = (time) => {
  if (!time) return null;
  const t = new Date(time);
  const hours = String(t.getHours()).padStart(2, '0');
  const minutes = String(t.getMinutes()).padStart(2, '0');
  const seconds = String(t.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  return formatDate(new Date());
};

// Get current time in HH:MM:SS format
const getCurrentTime = () => {
  return formatTime(new Date());
};

// Calculate age from birth date
const calculateAge = (birthDate) => {
  if (!birthDate) return null;
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

// Pagination helper - calculate offset and process query params
const getPaginationParams = (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const offset = (page - 1) * limit;

  return { page, limit, offset };
};

// Build pagination response metadata
const buildPaginationMetadata = (page, limit, total) => {
  return {
    page,
    limit,
    total,
    total_pages: Math.ceil(total / limit)
  };
};

// Legacy pagination helper (for backward compatibility)
const paginate = (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  return { limit: parseInt(limit), offset };
};

/**
 * Standard API Response Helpers
 * Consistent response format across all endpoints
 */

// Success response with optional pagination
const successResponse = (res, data, message = 'Success', statusCode = 200, pagination = null) => {
  const response = {
    success: true,
    message,
    status: statusCode,
    timestamp: new Date().toISOString(),
    data
  };

  // Add pagination metadata if provided
  if (pagination) {
    response.metadata = {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      total_pages: Math.ceil(pagination.total / pagination.limit)
    };
  }

  return res.status(statusCode).json(response);
};

// Error response format
const errorResponse = (res, message = 'Error', statusCode = 500, errors = null) => {
  const response = {
    success: false,
    message,
    status: statusCode,
    timestamp: new Date().toISOString()
  };
  
  if (errors) {
    response.errors = errors;
  }
  
  return res.status(statusCode).json(response);
};

module.exports = {
  formatDate,
  formatTime,
  getCurrentDate,
  getCurrentTime,
  calculateAge,
  getPaginationParams,
  buildPaginationMetadata,
  paginate,
  successResponse,
  errorResponse
};
