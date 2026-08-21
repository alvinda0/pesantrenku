const Role = require('../models/Peran');

// Get all roles
const getAllRoles = async (req, res, next) => {
  try {
    const roles = await Role.findAll();
    
    res.status(200).json({
      success: true,
      message: 'Data role berhasil diambil',
      data: roles
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRoles
};
