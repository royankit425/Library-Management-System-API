const express = require('express');
const { getUsers, getUserByID, createUser, updateUser, deleteUser } = require('../controllers/userController');

//router object
const router = express.Router();

//routes

//GET ALL USERS LIST || GET
router.get('/users', getUsers);

//GET USER BY ID
router.get('/users/:id', getUserByID);

//CREATE USER || POST
router.post('/users', createUser);

//UPDATE USER || PUT
router.put('/users/:id', updateUser);

//DELETE USER || DELETE
router.delete('/users/:id', deleteUser);

module.exports = router;