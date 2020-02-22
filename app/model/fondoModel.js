var DB = require("../model/db.js");

module.exports = (pool) => 
{
    var sql = new DB(pool);
    class FondoModel 
    {
        async getAllFondos(result)
        {
            
            var queryStr = "SELECT * FROM fondos";
            try {
                var data = await sql.query(queryStr);

                //var [a, b, c] = await Promise.all([sql1.query(queryStr), sql2.query(queryStr), sql3.query(queryStr)]);
            
                return data;

            } catch (error) {
                //await sql.close();
                return Promise.reject(error);
            } 

        }
    }

    return FondoModel;
}
