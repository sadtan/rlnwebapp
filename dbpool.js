var mysql = require("mysql");

var parsedCredentials = {
    host: "database-1.ccd10d51wnps.us-east-2.rds.amazonaws.com",
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: "undbtest",
}

var pool = mysql.createPool(parsedCredentials);
console.log("DB Pool Connected");

module.exports = pool;