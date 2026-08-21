const { validationResult } = require('express-validator');
const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/helpers');

// @desc    Get all users
// @route   GET /api/users
// @access  Private (Ustadz only)
const getAllUsers = async (req, res) => {
  try {
    const { role, status, search } = req.query;

    const filters = {};
    if (role) filters.role = role;
    if (status) filters.status = status;
    if (search) filters.search = search;

    const users = await User.getAll(filters);

    successResponse(res, users, 'Data user berhasil diambil');
  } catch (error) {
    console.error('Get all users error:', error);
    errorResponse(res, 'Terjadi kesalahan saat mengambil data user');
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return errorResponse(res, 'User tidak ditemukan', 404);
    }

    // Santri can only view their own profile
    if (req.user.role === 'santri' && user.id !== req.user.id) {
      return errorResponse(res, 'Anda tidak memiliki akses ke data ini', 403);
    }

    successResponse(res, user, 'Data user berhasil diambil');
  } catch (error) {
    console.error('Get user by ID error:', error);
    errorResponse(res, 'Terjadi kesalahan saat mengambil data user');
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private (Ustadz only)
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return errorResponse(res, 'User tidak ditemukan', 404);
    }

    const { nama, nis, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, no_telp, status } = req.body;

    const updateData = {};
    if (nama) updateData.nama = nama;
    if (nis) updateData.nis = nis;
    if (tempat_lahir) updateData.tempat_lahir = tempat_lahir;
    if (tanggal_lahir) updateData.tanggal_lahir = tanggal_lahir;
    if (jenis_kelamin) updateData.jenis_kelamin = jenis_kelamin;
    if (alamat) updateData.alamat = alamat;
    if (no_telp) updateData.no_telp = no_telp;
    if (status) updateData.status = status;

    await User.update(req.params.id, updateData);

    const updatedUser = await User.findById(req.params.id);

    successResponse(res, updatedUser, 'Data user berhasil diupdate');
  } catch (error) {
    console.error('Update user error:', error);
    errorResponse(res, 'Terjadi kesalahan saat mengupdate data user');
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private (Ustadz only)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return errorResponse(res, 'User tidak ditemukan', 404);
    }

    // Prevent deleting self
    if (user.id === req.user.id) {
      return errorResponse(res, 'Anda tidak dapat menghapus akun sendiri', 400);
    }

    await User.delete(req.params.id);

    successResponse(res, null, 'User berhasil dihapus');
  } catch (error) {
    console.error('Delete user error:', error);
    errorResponse(res, 'Terjadi kesalahan saat menghapus user');
  }
};

// @desc    Get user statistics
// @route   GET /api/users/stats/summary
// @access  Private (Ustadz only)
const getUserStats = async (req, res) => {
  try {
    const stats = await User.getStatistics();

    successResponse(res, stats, 'Statistik user berhasil diambil');
  } catch (error) {
    console.error('Get user stats error:', error);
    errorResponse(res, 'Terjadi kesalahan saat mengambil statistik user');
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats
};
