const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats
} = require('../controllers/userController');
const { authenticate, isPengajar } = require('../middleware/auth');

const router = express.Router();

// Routes
// Santri dan Pengajar bisa akses list users (dengan batasan masing-masing)
router.get('/', authenticate, getAllUsers);

// Stats hanya untuk pengajar
router.get('/stats/summary', authenticate, isPengajar, getUserStats);

// Semua user bisa lihat detail user (dengan batasan role)
router.get('/:id', authenticate, getUserById);

// Update dan delete hanya untuk pengajar
router.put('/:id', authenticate, isPengajar, updateUser);
router.delete('/:id', authenticate, isPengajar, deleteUser);

module.exports = router;
