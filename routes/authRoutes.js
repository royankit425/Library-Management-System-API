const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/users/getToken', authController.getToken);
router.post('/users/refreshToken', authController.refreshToken);

module.exports = router;