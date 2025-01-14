const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//GENERATE JWT TOKEN || POST
router.post('/users/getToken', authController.getToken);

//REFRESH JWT TOKEN || POST
router.post('/users/refreshToken', authController.refreshToken);

module.exports = router;