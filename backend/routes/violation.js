const express = require('express');
const { body } = require('express-validator');
const {
  getAllPelanggaran,
  getPelanggaranById,
  createPelanggaran,
  updatePelanggaran,
  deletePelanggaran,
  getPelanggaranStats,
  getAllJenisPelanggaran
} = require('../controllers/violationController');
const { authenticate, isPengajar } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const pelanggaranValidation = [
  body('santri_id').notEmpty().withMessage('Santri ID harus diisi').isInt(),
  body('jenis_pelanggaran_id').notEmpty().withMessage('Jenis pelanggaran harus diisi').isInt(),
  body('tanggal').notEmpty().withMessage('Tanggal harus diisi').isDate(),
  body('waktu').notEmpty().withMessage('Waktu harus diisi'),
  body('kronologi').notEmpty().withMessage('Kronologi pelanggaran harus diisi')
];

// Routes
router.get('/jenis', authenticate, getAllJenisPelanggaran);
router.get('/', authenticate, getAllPelanggaran);
router.get('/stats/:santri_id', authenticate, getPelanggaranStats);
router.get('/:id', authenticate, getPelanggaranById);
router.post('/', authenticate, isPengajar, pelanggaranValidation, createPelanggaran);
router.put('/:id', authenticate, isPengajar, updatePelanggaran);
router.delete('/:id', authenticate, isPengajar, deletePelanggaran);

module.exports = router;
