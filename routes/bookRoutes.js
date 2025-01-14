const express = require('express');
const { getBooks, getBookByID, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const { authenticate, authorize } = require('../middleware/auth');

//router object
const router = express.Router();

//routes

//GET ALL BOOKS LIST || GET
router.get('/books', authenticate, authorize('Librarian', 'Student', 'Faculty'), getBooks);

//GET BOOK BY ID
router.get('/books/:id', authenticate, authorize('Librarian', 'Student', 'Faculty'), getBookByID);

//CREATE BOOK || POST
router.post('/books', authenticate, authorize('Librarian'), createBook);

//UPDATE BOOK || PUT
router.put('/books/:id', authenticate, authorize('Librarian'), updateBook);

//DELETE BOOK || DELETE
router.delete('/books/:id', authenticate, authorize('Librarian'), deleteBook);

module.exports = router;