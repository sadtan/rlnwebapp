var sql = require("../model/db.js")(process.env.DB_CREDENTIALS_JSON);

class FondoModel 
{
    async getAllFondos(result)
    {
        
        var queryStr = "SELECT * FROM fondos";
        try {
            var data = await sql.query(queryStr)
            return data;
        } catch (error) {
            //await sql.close();
            return Promise.reject(error);
        } 

    }
}

module.exports = FondoModel;