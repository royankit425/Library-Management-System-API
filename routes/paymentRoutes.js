const express = require('express');
const { getPayments, getPaymentByID, createPayment, updatePayment, deletePayment } = require('../controllers/paymentController');
const { authenticate, authorize } = require('../middleware/auth');

//router object
const router = express.Router();

//routes

//GET ALL PAYMENTS LIST || GET
router.get('/payments', authenticate, authorize('Librarian', 'Student', 'Faculty'), getPayments);

//GET PAYMENT BY ID
router.get('/payments/:id', authenticate, authorize('Librarian', 'Student', 'Faculty'), getPaymentByID);

//CREATE PAYMENT || POST
router.post('/payments', authenticate, authorize('Librarian'), createPayment);

//UPDATE PAYMENT || PUT
router.put('/payments/:id', authenticate, authorize('Librarian'), updatePayment);

//DELETE PAYMENT || DELETE
router.delete('/payments/:id', authenticate, authorize('Librarian'), deletePayment);

module.exports = router;