const express = require('express');
const router = express.Router();
const { getAllRoles } = require('../controllers/peranController');
const { authenticate } = require('../middleware/auth');

// Get all roles
router.get('/', authenticate, getAllRoles);

module.exports = router;
