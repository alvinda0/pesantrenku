const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/helpers');

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role_nama, // role name from database
      nama: user.nama 
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

const register = async (req, res) => {
  try {
    // Validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 'Validasi gagal', 400, errors.array());
    }

    const { nama, email, password, role, nis, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, no_telp } = req.body;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return errorResponse(res, 'Email sudah terdaftar', 400);
    }

    // Get role_id from role name
    const role_id = await User.getRoleIdByName(role || 'santri');
    if (!role_id) {
      return errorResponse(res, 'Role tidak valid', 400);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const userId = await User.create({
      nama,
      email,
      password: hashedPassword,
      role_id,
      nis,
      tempat_lahir,
      tanggal_lahir,
      jenis_kelamin,
      alamat,
      no_telp
    });

    // Get created user
    const user = await User.findById(userId);

    // Generate token
    const token = generateToken(user);

    return successResponse(
      res,
      token,
      'Registrasi berhasil',
      201
    );

  } catch (error) {
    console.error('Register error:', error);
    return errorResponse(res, 'Terjadi kesalahan saat registrasi', 500);
  }
};


const login = async (req, res) => {
  try {
    // Validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 'Validasi gagal', 400, errors.array());
    }

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findByEmail(email);
    if (!user) {
      return errorResponse(res, 'Email atau password salah', 401);
    }

    // Check if user is active
    if (user.status !== 'aktif') {
      return errorResponse(res, 'Akun Anda tidak aktif. Silakan hubungi administrator.', 403);
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return errorResponse(res, 'Email atau password salah', 401);
    }

    // Generate token
    const token = generateToken(user);

    return successResponse(
      res,
      token,
      'Login berhasil',
      200
    );

  } catch (error) {
    console.error('Login error:', error);
    return errorResponse(res, 'Terjadi kesalahan saat login', 500);
  }
};


const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return errorResponse(res, 'User tidak ditemukan', 404);
    }

    return successResponse(res, user, 'Profile berhasil diambil');

  } catch (error) {
    console.error('Get profile error:', error);
    return errorResponse(res, 'Terjadi kesalahan saat mengambil profile', 500);
  }
};


const updateProfile = async (req, res) => {
  try {
    const { nama, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, no_telp } = req.body;

    const updateData = {};
    if (nama) updateData.nama = nama;
    if (tempat_lahir) updateData.tempat_lahir = tempat_lahir;
    if (tanggal_lahir) updateData.tanggal_lahir = tanggal_lahir;
    if (jenis_kelamin) updateData.jenis_kelamin = jenis_kelamin;
    if (alamat) updateData.alamat = alamat;
    if (no_telp) updateData.no_telp = no_telp;

    const updated = await User.update(req.user.id, updateData);

    if (!updated) {
      return errorResponse(res, 'Gagal update profile', 400);
    }

    const user = await User.findById(req.user.id);

    return successResponse(res, user, 'Profile berhasil diupdate');

  } catch (error) {
    console.error('Update profile error:', error);
    return errorResponse(res, 'Terjadi kesalahan saat update profile', 500);
  }
};

const changePassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 'Validasi gagal', 400, errors.array());
    }

    const { old_password, new_password } = req.body;

    // Get user with password
    const user = await User.findByEmail(req.user.email);

    // Check old password
    const isPasswordValid = await bcrypt.compare(old_password, user.password);
    if (!isPasswordValid) {
      return errorResponse(res, 'Password lama salah', 401);
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(new_password, salt);

    // Update password
    await User.updatePassword(req.user.id, hashedPassword);

    return successResponse(res, null, 'Password berhasil diubah');

  } catch (error) {
    console.error('Change password error:', error);
    return errorResponse(res, 'Terjadi kesalahan saat mengubah password', 500);
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword
};
