const express = require('express');
const { body } = require('express-validator');
const {
  getAllTahfidz,
  getTahfidzById,
  createTahfidz,
  updateTahfidz,
  deleteTahfidz,
  getTahfidzStats
} = require('../controllers/tahfidzController');
const { authenticate, isPengajar } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const tahfidzValidation = [
  body('santri_id').notEmpty().withMessage('Santri ID harus diisi').isInt(),
  body('jenis').isIn(['setoran_baru', 'muraja_ah']).withMessage('Jenis harus setoran_baru atau muraja_ah'),
  body('surah').notEmpty().withMessage('Nama surah harus diisi'),
  body('tanggal').notEmpty().withMessage('Tanggal harus diisi').isDate(),
  body('waktu').notEmpty().withMessage('Waktu harus diisi'),
  body('nilai').optional().isIn(['A', 'B', 'C', 'D']).withMessage('Nilai tidak valid')
];

// Routes
router.get('/', authenticate, getAllTahfidz);
router.get('/stats/:santri_id', authenticate, getTahfidzStats);
router.get('/:id', authenticate, getTahfidzById);
router.post('/', authenticate, isPengajar, tahfidzValidation, createTahfidz);
router.put('/:id', authenticate, isPengajar, updateTahfidz);
router.delete('/:id', authenticate, isPengajar, deleteTahfidz);

module.exports = router;
