const mysql = require('mysql2/promise');

const mySqlPool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "my-secret-pw",
    database: "LibraryManagementSystem"
});

module.exports = mySqlPool;