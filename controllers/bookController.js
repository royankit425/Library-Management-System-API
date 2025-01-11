const db = require("../config/db");

// GET ALL BOOKS LIST
const getBooks = async (req,res) => {
    try{
        const data = await db.query('SELECT * FROM Books')
        if(!data){
            return res.status(404).send({
                success:false,
                message: "No records found"
            })
        }
        res.status(200).send({
            success:true,
            message:"All Books Records",
            totalBooks: data[0].length,
            data: data[0]
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Get All Books API",
            error
        })
    }
};

//GET BOOK BY ID
const getBookByID = async (req,res) => {
    try {
        const bookId = req.params.id
        if(!bookId){
            return res.status(404).send({
                success:false,
                message:'Invalid or Provide Book ID'
            })
        }
        const data = await db.query(` SELECT * FROM Books WHERE id=?`,[bookId])
        if(!data){
            return res.status(404).send({
                success:false,
                message:"No records found"
            })
        }
        res.status(200).send({
            success: true,
            bookDetails:data[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Get Book by ID API",
            error
        })
    }
};

//CREATE BOOK || POST
const createBook = async (req,res) => {
    try {
        const {id,isbn,title,author,subject,publication_year,copies_available} = req.body
        if(!id || !isbn || !title || !author){
            return res.status(500).send({
                success:false,
                message:"Please provide id, isbn, title and author fields"
            })
        }
        const data = await db.query(` INSERT INTO Books (id,isbn,title,author,subject,publication_year,copies_available) VALUES (?,?,?,?,?,?,?)`,[id,isbn,title,author,subject,publication_year,copies_available])
        if(!data){
            return res.status(404).send({
                success:false,
                message:"Error in INSERT QUERY"
            })
        }
        res.status(201).send({
            success:true,
            message:"New Book Record Created"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Create Book API",
            error
        })
    }
};

module.exports = { getBooks, getBookByID, createBook };