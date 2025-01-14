const express = require('express');
const { getStatistics } = require('../controllers/statisticsController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// GET STATISTICS DETAILS || GET
router.get('/statistics', authenticate, authorize('Librarian'), getStatistics);

module.exports = router;
