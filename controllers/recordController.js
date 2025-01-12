const db = require("../config/db");

// GET ALL RECORDS LIST
const getRecords = async (req,res) => {
    try{
        const data = await db.query('SELECT * FROM Records')
        if(!data){
            return res.status(404).send({
                success:false,
                message: "No records found"
            })
        }
        res.status(200).send({
            success:true,
            message:"All Records",
            data: data[0]
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Get All Records API",
            error
        })
    }
};

//GET RECORD BY ID
const getRecordByID = async (req,res) => {
    try {
        const recordId = req.params.id
        if(!recordId){
            return res.status(404).send({
                success:false,
                message:'Invalid or Provide Record ID'
            })
        }
        const data = await db.query(` SELECT * FROM Records WHERE id=?`,[recordId])
        if(!data){
            return res.status(404).send({
                success:false,
                message:"No records found"
            })
        }
        res.status(200).send({
            success: true,
            recordDetails:data[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Get Record by ID API",
            error
        })
    }
};

//CREATE RECORD || POST
const createRecord = async (req,res) => {
    try {
        const {id,user_id,book_id,issue_date,return_date,status} = req.body
        if(!id || !user_id || !book_id || !status){
            return res.status(500).send({
                success:false,
                message:"Please provide id, user_id, book_id and status"
            })
        }
        const data = await db.query(` INSERT INTO Records (id,user_id,book_id,issue_date,return_date,status) VALUES (?,?,?,?,?,?)`,[id,user_id,book_id,issue_date,return_date,status])
        if(!data){
            return res.status(404).send({
                success:false,
                message:"Error in INSERT QUERY"
            })
        }
        res.status(201).send({
            success:true,
            message:"New Record Created"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Create Record API",
            error
        })
    }
};

//UPDATE RECORD || PUT
const updateRecord = async (req,res) => {
    try {
        const recordId = req.params.id
        if(!recordId){
            return res.status(404).send({
                success:false,
                message:"Invalid ID or provide ID"
            })
        }
        const {id,user_id,book_id,issue_date,return_date,status} = req.body
        const data = await db.query(`UPDATE Records SET user_id=?, book_id=?, issue_date=?, return_date=?, status=? WHERE id=?`,[user_id,book_id,issue_date,return_date,status,id])
        if(!data){
            return res.status(500).send({
                success: false,
                message:"Error in Update Data"
            })
        }
        res.status(200).send({
            success:true,
            message:"Record details updated"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Update Record API",
            error
        })
    }
}

//DELETE RECORD || DELETE
const deleteRecord = async (req,res) => {
    try {
        const recordId = req.params.id
        if(!recordId){
            return res.status(404).send({
                success:false,
                message:"Please provide Record ID or valid Record ID"
            })
        }
        await db.query(`DELETE FROM Records WHERE id=?`,[recordId])
        res.status(200).send({
            success: true,
            message:"Record Deleted Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Delete Record API',
            error
        })
    }
};

module.exports = { getRecords, getRecordByID, createRecord, updateRecord, deleteRecord };