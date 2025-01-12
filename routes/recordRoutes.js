const express = require('express');
const { getRecords, getRecordByID, createRecord, updateRecord, deleteRecord } = require('../controllers/recordController');

//router object
const router = express.Router();

//routes

//GET ALL RECORDS LIST || GET
router.get('/records', getRecords);

//GET RECORD BY ID
router.get('/records/:id', getRecordByID);

//CREATE RECORD || POST
router.post('/records', createRecord);

//UPDATE RECORD || PUT
router.put('/records/:id', updateRecord);

//DELETE RECORD || DELETE
router.delete('/records/:id', deleteRecord);

module.exports = router;