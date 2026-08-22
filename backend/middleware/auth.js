const jwt = require('jsonwebtoken');

// Verify JWT token
const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token tidak ditemukan. Silakan login terlebih dahulu.',
        status: 401,
        timestamp: new Date().toISOString()
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token tidak valid atau telah kadaluarsa.',
      status: 401,
      timestamp: new Date().toISOString()
    });
  }
};

// Check if user is pengajar (admin/teacher role)
const isPengajar = (req, res, next) => {
  if (req.user.role !== 'pengajar') {
    return res.status(403).json({
      success: false,
      message: 'Akses ditolak. Hanya pengajar yang dapat mengakses fitur ini.',
      status: 403,
      timestamp: new Date().toISOString()
    });
  }
  next();
};

// Check if user is santri or pengajar
const isSantriOrPengajar = (req, res, next) => {
  if (req.user.role !== 'santri' && req.user.role !== 'pengajar') {
    return res.status(403).json({
      success: false,
      message: 'Akses ditolak.',
      status: 403,
      timestamp: new Date().toISOString()
    });
  }
  next();
};

module.exports = { authenticate, isPengajar, isSantriOrPengajar };
