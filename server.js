const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mySqlPool = require('./config/db');

//configure dotenv
dotenv.config();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1', require('./routes/bookRoutes'));
app.use('/api/v1', require('./routes/userRoutes'));

app.get('/test', (req, res) => {
    res.status(200).send('<h1>Library Management System API</h1>')
})

//port
const PORT = process.env.PORT || 8000;

//conditionally listen
mySqlPool.query('SELECT 1').then(() => {
    //My SQL
    console.log('MySQL DB Connected');
    //listen
    app.listen(PORT, () => {
        console.log(`Server Running on port ${process.env.PORT}`)
    })
}).catch((error) => {
    console.log(error)
})