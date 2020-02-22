"use strict"

var mysql = require("mysql")

class Database  
{
    constructor () 
    {
        var parsedCredentials = {
            host: "database-1.ccd10d51wnps.us-east-2.rds.amazonaws.com",
            user: process.env.SQL_USER,
            password: process.env.SQL_PASS,
            database: "undbtest"
        }
        this.con = mysql.createPool(parsedCredentials);
        // this.con.connect((err) => 
        // {
        //     if (err) throw err;
        //     console.log("db Connected");
        // });
    }

    query (sql, args) 
    {
        return new Promise((resolve, reject) => 
        {
            this.con.getConnection((error, connection) => 
            {
                if (error) throw error;

                this.con.query(sql, this.con.escape(args), (err, rows) =>
                {
                    
                    connection.destroy();
                    //console.log("Connection Released");
                    if (err) return reject(err);

                    resolve(rows)
                })
            })
            
        })
    }

    close ()
    {
        return new Promise((resolve, reject) => 
        {
            this.con.end(err => 
            {
                if (err) return reject(err);
                resolve();
            })
        })
    }
}

module.exports =  Database

// var mysql = require("mysql");
// console.log(process.env.SQL_PASS);
// //
// var con = mysql.createConnection(
//     {
//         host: "database-1.ccd10d51wnps.us-eastnp-2.rds.amazonaws.com",
//         user: process.env.SQL_USER,
//         password: process.env.SQL_PASS,
//         database: "undbtest"
//     });
  
// con.connect((err) => 
// {
//     if (err) throw err;
//     console.log("DB Connected");
// });

// module.exports = con;

