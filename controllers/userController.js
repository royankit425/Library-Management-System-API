const db = require("../config/db");

// GET ALL USERS LIST
const getUsers = async (req,res) => {
    try{
        const data = await db.query('SELECT * FROM Users')
        if(!data){
            return res.status(404).send({
                success:false,
                message: "No records found"
            })
        }
        res.status(200).send({
            success:true,
            message:"All Users Records",
            totalUsers: data[0].length,
            data: data[0]
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Get All Users API",
            error
        })
    }
};

//GET USER BY ID
const getUserByID = async (req,res) => {
    try {
        const userId = req.params.id
        if(!userId){
            return res.status(404).send({
                success:false,
                message:'Invalid or Provide User ID'
            })
        }
        const data = await db.query(` SELECT * FROM Users WHERE id=?`,[userId])
        if(!data){
            return res.status(404).send({
                success:false,
                message:"No records found"
            })
        }
        res.status(200).send({
            success: true,
            userDetails:data[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Get User by ID API",
            error
        })
    }
};

//CREATE USER || POST
const createUser = async (req,res) => {
    try {
        const {id,name,email,password,role} = req.body
        if(!id || !name || !email || !password || !role){
            return res.status(500).send({
                success:false,
                message:"Please provide id, name, email, password and role"
            })
        }
        const data = await db.query(` INSERT INTO Users (id,name,email,password,role,registration_date) VALUES (?,?,?,?,?,NOW())`,[id,name,email,password,role])
        if(!data){
            return res.status(404).send({
                success:false,
                message:"Error in INSERT QUERY"
            })
        }
        res.status(201).send({
            success:true,
            message:"New User Record Created"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Create User API",
            error
        })
    }
};

//UPDATE USER || PUT
const updateUser = async (req,res) => {
    try {
        const userId = req.params.id
        if(!userId){
            return res.status(404).send({
                success:false,
                message:"Invalid ID or provide ID"
            })
        }
        const {id,name,email,password,role} = req.body
        const data = await db.query(`UPDATE Users SET name=?, email=?, password=?, role=? WHERE id=?`,[name,email,password,role,id])
        if(!data){
            return res.status(500).send({
                success: false,
                message:"Error in Update Data"
            })
        }
        res.status(200).send({
            success:true,
            message:"User details updated"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Update User API",
            error
        })
    }
}

//DELETE USER || DELETE
const deleteUser = async (req,res) => {
    try {
        const userId = req.params.id
        if(!userId){
            return res.status(404).send({
                success:false,
                message:"Please provide User ID or valid User ID"
            })
        }
        await db.query(`DELETE FROM Users WHERE id=?`,[userId])
        res.status(200).send({
            success: true,
            message:"User Deleted Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Delete User API',
            error
        })
    }
};

module.exports = { getUsers, getUserByID, createUser, updateUser, deleteUser };