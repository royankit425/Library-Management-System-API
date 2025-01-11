const express = require('express');
const { getBooks, getBookByID, createBook } = require('../controllers/bookController');

//router object
const router = express.Router();

//routes

//GET ALL BOOKS LIST || GET
router.get('/books', getBooks);

//GET BOOK BY ID
router.get('/books/:id', getBookByID);

//CREATE BOOK || POST
router.post('/books', createBook);

module.exports = router;