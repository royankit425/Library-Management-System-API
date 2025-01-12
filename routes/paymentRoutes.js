const express = require('express');
const { getPayments, getPaymentByID, createPayment, updatePayment, deletePayment } = require('../controllers/paymentController');

//router object
const router = express.Router();

//routes

//GET ALL PAYMENTS LIST || GET
router.get('/payments', getPayments);

//GET PAYMENT BY ID
router.get('/payments/:id', getPaymentByID);

//CREATE PAYMENT || POST
router.post('/payments', createPayment);

//UPDATE PAYMENT || PUT
router.put('/payments/:id', updatePayment);

//DELETE PAYMENT || DELETE
router.delete('/payments/:id', deletePayment);

module.exports = router;