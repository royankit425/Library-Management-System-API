const db = require("../config/db");
const bcrypt = require('bcryptjs');

//GET ALL USERS LIST (search, filter, sort) 
const getUsers = async (req, res) => {
    try {
        const { search = {}, filter = {}, sort = {} } = req.body;

        // WHERE clause for search and filter
        const whereClauses = [];

        // Search conditions
        if (search.name) {
            whereClauses.push(`name LIKE '%${search.name}%'`);
        }

        // Filter conditions
        if (filter.category) {
            whereClauses.push(`role = '${filter.category}'`);
        }

        const whereQuery = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

        // ORDER BY clause for sorting
        const orderClauses = [];
        if (sort.name) {
            orderClauses.push(`name ${sort.name.toUpperCase()}`);
        }
        if (sort.registration_date) {
            orderClauses.push(`registration_date ${sort.registration_date.toUpperCase()}`);
        }
        
        const orderQuery = orderClauses.length > 0 ? `ORDER BY ${orderClauses.join(', ')}` : '';

        // Final query
        const query = `SELECT * FROM Users ${whereQuery} ${orderQuery}`;

        const data = await db.query(query)
        if (!data) {
            return res.status(404).send({
                success: false,
                message: "No records found"
            })
        }
        res.status(200).send({
            success: true,
            message: "All Users Records",
            data: data[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Get All Users API",
            error
        })
    }
};

//GET USER BY ID
const getUserByID = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(404).send({
                success: false,
                message: 'Invalid or Provide User ID'
            })
        }
        const data = await db.query(` SELECT * FROM Users WHERE id=?`, [userId])
        if (!data) {
            return res.status(404).send({
                success: false,
                message: "No records found"
            })
        }
        res.status(200).send({
            success: true,
            userDetails: data[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Get User by ID API",
            error
        })
    }
};

//CREATE USER || POST
const createUser = async (req, res) => {
    try {
        const { id, name, email, password, role } = req.body;

        // Validate required fields
        if (!id || !name || !email || !password || !role) {
            return res.status(400).send({
                success: false,
                message: "Please provide id, name, email, password, and role",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database
        const data = await db.query(
            `INSERT INTO Users (id, name, email, password, role, registration_date) VALUES (?, ?, ?, ?, ?, NOW())`,
            [id, name, email, hashedPassword, role]
        );

        if (!data) {
            return res.status(500).send({
                success: false,
                message: "Error in INSERT QUERY",
            });
        }

        res.status(201).send({
            success: true,
            message: "New User Record Created",
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in Create User API",
            error: error.message,
        });
    }
};

//UPDATE USER || PUT
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(404).send({
                success: false,
                message: "Invalid ID or provide ID"
            })
        }
        const { id, name, email, password, role } = req.body
        const data = await db.query(`UPDATE Users SET name=?, email=?, password=?, role=? WHERE id=?`, [name, email, password, role, id])
        if (!data) {
            return res.status(500).send({
                success: false,
                message: "Error in Update Data"
            })
        }
        res.status(200).send({
            success: true,
            message: "User details updated"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Update User API",
            error
        })
    }
}

//DELETE USER || DELETE
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(404).send({
                success: false,
                message: "Please provide User ID or valid User ID"
            })
        }
        await db.query(`DELETE FROM Users WHERE id=?`, [userId])
        res.status(200).send({
            success: true,
            message: "User Deleted Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error In Delete User API',
            error
        })
    }
};

module.exports = { getUsers, getUserByID, createUser, updateUser, deleteUser };