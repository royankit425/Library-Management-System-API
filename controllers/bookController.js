const db = require("../config/db");

// GET ALL BOOKS LIST
const getBooks = async (req,res) => {
    try{
        const { search = {}, filter = {}, sort = {} } = req.body;

        // WHERE clause for search and filter
        const whereClauses = [];

        // Search conditions
        if (search.name) {
            whereClauses.push(`title LIKE '%${search.name}%'`);
        }

        // Filter conditions
        if (filter.subject) {
            whereClauses.push(`subject = '${filter.subject}'`);
        }

        const whereQuery = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

        // ORDER BY clause for sorting
        const orderClauses = [];
        if (sort.name) {
            orderClauses.push(`title ${sort.name.toUpperCase()}`);
        }
        if (sort.copies_available) {
            orderClauses.push(`copies_available ${sort.copies_available.toUpperCase()}`);
        }

        const orderQuery = orderClauses.length > 0 ? `ORDER BY ${orderClauses.join(', ')}` : '';

        // Final query
        const query = `SELECT * FROM Books ${whereQuery} ${orderQuery}`;
        const data = await db.query(query)
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

//UPDATE BOOK || PUT
const updateBook = async (req,res) => {
    try {
        const bookId = req.params.id
        if(!bookId){
            return res.status(404).send({
                success:false,
                message:"Invalid ID or provide ID"
            })
        }
        const {id,isbn,title,author,subject,publication_year,copies_available} = req.body
        const data = await db.query(`UPDATE Books SET isbn=?, title=?, author=?, subject=?, publication_year=?, copies_available=? WHERE id=?`,[isbn,title,author,subject,publication_year,copies_available,id])
        if(!data){
            return res.status(500).send({
                success: false,
                message:"Error in Update Data"
            })
        }
        res.status(200).send({
            success:true,
            message:"Book details updated"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Update Book API",
            error
        })
    }
}

//DELETE BOOK || DELETE
const deleteBook = async (req,res) => {
    try {
        const bookId = req.params.id
        if(!bookId){
            return res.status(404).send({
                success:false,
                message:"Please provide Book ID or valid Book ID"
            })
        }
        await db.query(`DELETE FROM Books WHERE id=?`,[bookId])
        res.status(200).send({
            success: true,
            message:"Book Deleted Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Delete Book API',
            error
        })
    }
};

module.exports = { getBooks, getBookByID, createBook, updateBook, deleteBook };