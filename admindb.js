//var mysql = require("mysql");
const MysqlCache = require('mysql-cache')

var parsedCredentials = {
    host: "database-1.ccd10d51wnps.us-east-2.rds.amazonaws.com",
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: "undbtest",
    TTL: 0,
    prettyError: true,
 
    stdoutErrors: true,

    connectionLimit: 3,

    hashing: 'farmhash64',
 
    verbose: false,
 
    caching: false,
}

const mysql = new MysqlCache(parsedCredentials);


mysql.connect(err => {
    if (err) {
        throw err // Catch any nasty errors!
    }
    console.log('W00t! i\'m connected!!')
 
    // Lets run some queries now!
})

//var pool = mysql.createPool(parsedCredentials);
console.log("DB Pool Connected");

module.exports = mysql;