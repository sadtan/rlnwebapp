var DB = require("../model/db.js");
var sql = new DB();

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