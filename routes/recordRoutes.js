const express = require('express');
const { getRecords, getRecordByID, createRecord, updateRecord, deleteRecord } = require('../controllers/recordController');
const { authenticate, authorize } = require('../middleware/auth');

//router object
const router = express.Router();

//routes

//GET ALL RECORDS LIST || GET
router.get('/records', authenticate, authorize('Librarian', 'Student', 'Faculty'), getRecords);

//GET RECORD BY ID
router.get('/records/:id', authenticate, authorize('Librarian', 'Student', 'Faculty'), getRecordByID);

//CREATE RECORD || POST
router.post('/records', authenticate, authorize('Librarian'), createRecord);

//UPDATE RECORD || PUT
router.put('/records/:id', authenticate, authorize('Librarian'), updateRecord);

//DELETE RECORD || DELETE
router.delete('/records/:id', authenticate, authorize('Librarian'), deleteRecord);

module.exports = router;