const express = require('express');
const { body } = require('express-validator');
const {
  getAllJurnalShalat,
  getJurnalShalatById,
  createOrUpdateJurnalShalat,
  updateJurnalShalat,
  getJurnalShalatStats,
  getDailyReport
} = require('../controllers/prayerController');
const { authenticate, isPengajar } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const shalatValidation = [
  body('santri_id').notEmpty().withMessage('Santri ID harus diisi').isInt(),
  body('tanggal').notEmpty().withMessage('Tanggal harus diisi').isDate(),
  body('subuh').optional().isIn(['hadir', 'tidak_hadir', 'terlambat']),
  body('dzuhur').optional().isIn(['hadir', 'tidak_hadir', 'terlambat']),
  body('ashar').optional().isIn(['hadir', 'tidak_hadir', 'terlambat']),
  body('maghrib').optional().isIn(['hadir', 'tidak_hadir', 'terlambat']),
  body('isya').optional().isIn(['hadir', 'tidak_hadir', 'terlambat'])
];

// Routes
router.get('/', authenticate, getAllJurnalShalat);
router.get('/report/daily', authenticate, isPengajar, getDailyReport);
router.get('/stats/:santri_id', authenticate, getJurnalShalatStats);
router.get('/:id', authenticate, getJurnalShalatById);
router.post('/', authenticate, isPengajar, shalatValidation, createOrUpdateJurnalShalat);
router.put('/:id', authenticate, isPengajar, updateJurnalShalat);

module.exports = router;
