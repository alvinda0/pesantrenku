const express = require('express');
const router = express.Router();
const { getAllRoles } = require('../controllers/peranController');
const { authenticateToken } = require('../middleware/auth');

// Get all roles
router.get('/', authenticateToken, getAllRoles);

module.exports = router;
