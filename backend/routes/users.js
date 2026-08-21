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
router.get('/', authenticate, isPengajar, getAllUsers);
router.get('/stats/summary', authenticate, isPengajar, getUserStats);
router.get('/:id', authenticate, getUserById);
router.put('/:id', authenticate, isPengajar, updateUser);
router.delete('/:id', authenticate, isPengajar, deleteUser);

module.exports = router;
