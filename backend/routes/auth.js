const express = require('express');
const { body } = require('express-validator');
const { 
  register, 
  login, 
  getProfile, 
  updateProfile, 
  changePassword 
} = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('nama').notEmpty().withMessage('Nama harus diisi'),
  body('email').isEmail().withMessage('Email tidak valid'),
  body('password').isLength({ min: 6 }).withMessage('Password minimal 6 karakter'),
  body('role').isIn(['santri', 'pengajar']).withMessage('Role harus santri atau pengajar'),
  body('nis').optional(),
  body('jenis_kelamin').optional().isIn(['laki-laki', 'perempuan']).withMessage('Jenis kelamin tidak valid')
];

const loginValidation = [
  body('email').isEmail().withMessage('Email tidak valid'),
  body('password').notEmpty().withMessage('Password harus diisi')
];

const changePasswordValidation = [
  body('old_password').notEmpty().withMessage('Password lama harus diisi'),
  body('new_password').isLength({ min: 6 }).withMessage('Password baru minimal 6 karakter')
];

// Routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.put('/change-password', authenticate, changePasswordValidation, changePassword);

module.exports = router;
