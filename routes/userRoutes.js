const express = require('express');
const { getUsers, getUserByID, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/auth');

//router object
const router = express.Router();

//routes

//GET ALL USERS LIST || GET
router.get('/users', authenticate, authorize('Librarian', 'Student', 'Faculty'), getUsers);

//GET USER BY ID
router.get('/users/:id', authenticate, authorize('Librarian', 'Student', 'Faculty'), getUserByID);

//CREATE USER || POST
router.post('/users', authenticate, authorize('Librarian'), createUser);

//UPDATE USER || PUT
router.put('/users/:id', authenticate, authorize('Librarian'), updateUser);

//DELETE USER || DELETE
router.delete('/users/:id', authenticate, authorize('Librarian'), deleteUser);

module.exports = router;