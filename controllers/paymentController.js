const db = require("../config/db");

// GET ALL PAYMENTS LIST
const getPayments = async (req,res) => {
    try{
        const data = await db.query('SELECT * FROM Payments')
        if(!data){
            return res.status(404).send({
                success:false,
                message: "No records found"
            })
        }
        res.status(200).send({
            success:true,
            message:"All Payents",
            data: data[0]
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Get All Payments API",
            error
        })
    }
};

//GET PAYMENT BY ID
const getPaymentByID = async (req,res) => {
    try {
        const paymentId = req.params.id
        if(!paymentId){
            return res.status(404).send({
                success:false,
                message:'Invalid or Provide Payment ID'
            })
        }
        const data = await db.query(` SELECT * FROM Payments WHERE id=?`,[paymentId])
        if(!data){
            return res.status(404).send({
                success:false,
                message:"No records found"
            })
        }
        res.status(200).send({
            success: true,
            paymentDetails:data[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Get Payment by ID API",
            error
        })
    }
};

//CREATE PAYMENT || POST
const createPayment = async (req,res) => {
    try {
        const {id,user_id,amount,purpose} = req.body
        if(!id || !user_id || !amount){
            return res.status(500).send({
                success:false,
                message:"Please provide id, user_id and amount"
            })
        }
        const data = await db.query(` INSERT INTO Payments (id,user_id,amount,payment_date,purpose) VALUES (?,?,?,NOW(),?)`,[id,user_id,amount,purpose])
        if(!data){
            return res.status(404).send({
                success:false,
                message:"Error in INSERT QUERY"
            })
        }
        res.status(201).send({
            success:true,
            message:"New Payment Record Created"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Create Payment API",
            error
        })
    }
};

//UPDATE PAYMENT || PUT
const updatePayment = async (req,res) => {
    try {
        const paymentId = req.params.id
        if(!paymentId){
            return res.status(404).send({
                success:false,
                message:"Invalid ID or provide ID"
            })
        }
        const {id,user_id,amount,purpose} = req.body
        const data = await db.query(`UPDATE Payments SET user_id=?, amount=?, purpose=? WHERE id=?`,[user_id,amount,purpose,id])
        if(!data){
            return res.status(500).send({
                success: false,
                message:"Error in Update Data"
            })
        }
        res.status(200).send({
            success:true,
            message:"Payment details updated"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Update Payment API",
            error
        })
    }
}

//DELETE PAYMENT || DELETE
const deletePayment = async (req,res) => {
    try {
        const paymentId = req.params.id
        if(!paymentId){
            return res.status(404).send({
                success:false,
                message:"Please provide Payment ID or valid Payment ID"
            })
        }
        await db.query(`DELETE FROM Payments WHERE id=?`,[paymentId])
        res.status(200).send({
            success: true,
            message:"Payment Deleted Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Delete Payment API',
            error
        })
    }
};

module.exports = { getPayments, getPaymentByID, createPayment, updatePayment, deletePayment };