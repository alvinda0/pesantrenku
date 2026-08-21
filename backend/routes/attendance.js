const express = require('express');
const { body } = require('express-validator');
const {
  getAllKehadiran,
  getKehadiranById,
  createKehadiran,
  updateKehadiran,
  deleteKehadiran,
  getKehadiranStats,
  getDailyReport
} = require('../controllers/attendanceController');
const { authenticate, isPengajar } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const kehadiranValidation = [
  body('user_id').notEmpty().withMessage('User ID harus diisi').isInt(),
  body('user_type').isIn(['santri', 'pengajar']).withMessage('User type harus santri atau pengajar'),
  body('tanggal').notEmpty().withMessage('Tanggal harus diisi').isDate(),
  body('status').isIn(['hadir', 'izin', 'sakit', 'alpha']).withMessage('Status tidak valid')
];

// Routes
router.get('/', authenticate, getAllKehadiran);
router.get('/report/daily', authenticate, isPengajar, getDailyReport);
router.get('/stats/:user_id', authenticate, getKehadiranStats);
router.get('/:id', authenticate, getKehadiranById);
router.post('/', authenticate, isPengajar, kehadiranValidation, createKehadiran);
router.put('/:id', authenticate, isPengajar, updateKehadiran);
router.delete('/:id', authenticate, isPengajar, deleteKehadiran);

module.exports = router;
