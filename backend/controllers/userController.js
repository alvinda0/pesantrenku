const { validationResult } = require('express-validator');
const User = require('../models/User');
const { successResponse, errorResponse, getPaginationParams, buildPaginationMetadata } = require('../utils/helpers');

// @desc    Get all users (with role-based access and pagination)
// @route   GET /api/users
// @access  Private
const getAllUsers = async (req, res) => {
  try {
    const { role, status, search } = req.query;
    const currentUser = req.user;
    
    // Get pagination params
    const { page, limit, offset } = getPaginationParams(req.query);

    const filters = {};
    if (status) filters.status = status;
    if (search) filters.search = search;

    // Santri hanya bisa lihat data diri sendiri
    if (currentUser.role === 'santri') {
      const user = await User.findById(currentUser.id);
      if (!user) {
        return errorResponse(res, 'User tidak ditemukan', 404);
      }
      
      // Return single user without pagination for santri
      return successResponse(res, [user], 'Data user berhasil diambil', 200, {
        page: 1,
        limit: 1,
        total: 1
      });
    }

    // Pengajar bisa lihat semua santri, tapi tidak bisa lihat pengajar lain
    if (currentUser.role === 'pengajar') {
      // Jika request untuk melihat pengajar, hanya return data pengajar yang sedang login
      if (role === 'pengajar') {
        const user = await User.findById(currentUser.id);
        if (!user) {
          return errorResponse(res, 'User tidak ditemukan', 404);
        }
        
        // Build proper pagination metadata even for single user
        const pagination = buildPaginationMetadata(1, 10, 1);
        
        return successResponse(res, [user], 'Data user berhasil diambil', 200, pagination);
      }
      
      // Default hanya tampilkan santri
      filters.role_name = 'santri';
    }

    // Add pagination to filters
    filters.limit = limit;
    filters.offset = offset;

    // Get users and total count
    const users = await User.getAll(filters);
    
    // Get total count for pagination (without limit/offset)
    const countFilters = { ...filters };
    delete countFilters.limit;
    delete countFilters.offset;
    const total = await User.getCount(countFilters);

    // Build pagination metadata
    const pagination = buildPaginationMetadata(page, limit, total);

    return successResponse(res, users, 'Data user berhasil diambil', 200, pagination);
    
  } catch (error) {
    console.error('Get all users error:', error);
    return errorResponse(res, 'Terjadi kesalahan saat mengambil data user', 500);
  }
};

// @desc    Get user by ID (with role-based access)
// @route   GET /api/users/:id
// @access  Private
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return errorResponse(res, 'User tidak ditemukan', 404);
    }

    const currentUser = req.user;

    // Santri hanya bisa lihat data diri sendiri
    if (currentUser.role === 'santri' && user.id !== currentUser.id) {
      return errorResponse(res, 'Anda tidak memiliki akses ke data ini', 403);
    }

    // Pengajar hanya bisa lihat data santri dan diri sendiri, tidak bisa lihat pengajar lain
    if (currentUser.role === 'pengajar') {
      if (user.role_nama === 'pengajar' && user.id !== currentUser.id) {
        return errorResponse(res, 'Anda tidak memiliki akses ke data pengajar lain', 403);
      }
    }

    return successResponse(res, user, 'Data user berhasil diambil');
  } catch (error) {
    console.error('Get user by ID error:', error);
    return errorResponse(res, 'Terjadi kesalahan saat mengambil data user', 500);
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private (Pengajar only)
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

    return successResponse(res, updatedUser, 'Data user berhasil diupdate');
  } catch (error) {
    console.error('Update user error:', error);
    return errorResponse(res, 'Terjadi kesalahan saat mengupdate data user', 500);
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private (Pengajar only)
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

    return successResponse(res, null, 'User berhasil dihapus');
  } catch (error) {
    console.error('Delete user error:', error);
    return errorResponse(res, 'Terjadi kesalahan saat menghapus user', 500);
  }
};

// @desc    Get user statistics
// @route   GET /api/users/stats/summary
// @access  Private (Pengajar only)
const getUserStats = async (req, res) => {
  try {
    const stats = await User.getStatistics();

    return successResponse(res, stats, 'Statistik user berhasil diambil');
  } catch (error) {
    console.error('Get user stats error:', error);
    return errorResponse(res, 'Terjadi kesalahan saat mengambil statistik user', 500);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats
};
