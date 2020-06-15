//var mysql = require("mysql");
const MysqlCache = require('mysql-cache')

var parsedCredentials = {
    host: "database-1.ccd10d51wnps.us-east-2.rds.amazonaws.com",
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: "undbtest",

    prettyError: true,
 
    stdoutErrors: true,

    connectionLimit: 40,

    hashing: 'farmhash64',
 
    //verbose: true,

    TTL: 60,
 
    caching: true,
    cacheProvider: 'file',
    multipleStatements: true,
    typeCast: function castField( field, useDefaultTypeCasting ) {

        // We only want to cast bit fields that have a single-bit in them. If the field
        // has more than one bit, then we cannot assume it is supposed to be a Boolean.
        if ( ( field.type === "BIT" ) && ( field.length === 1 ) ) {

            var bytes = field.buffer();

            // A Buffer in Node represents a collection of 8-bit unsigned integers.
            // Therefore, our single "bit field" comes back as the bits '0000 0001',
            // which is equivalent to the number 1.
            if (bytes[ 0 ] === 1)
                return 1;
            else 
                return 0    
        }
 
        return( useDefaultTypeCasting() );
        }
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