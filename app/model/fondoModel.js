var DB = require("../model/db.js");
const Errors  = require('../utils/errors.js');


module.exports = (pool) => 
{
    var sql = new DB(pool);
    class FondoModel 
    {
        async getAllFondos()
        {
            return new Promise(async (resolve, reject) => {
                try {
                    var queryStr = "SELECT * FROM fondos";
                    var data = await sql.query(queryStr);

                    //var [a, b, c] = await Promise.all([sql1.query(queryStr), sql2.query(queryStr), sql3.query(queryStr)]);
                    resolve(data);

                } catch (error) {
                    reject( new Errors.SQLError("Error de Base de datos: " + error.message));
                } 
            });
        }

        async getById(id)
        {
            return new Promise(async (resolve, reject) => {
                try {
                    var queryStr = "SELECT * FROM fondos WHERE fondo_id = " + id;
                    var data = await sql.query(queryStr);

                    if (!data[0]) throw new Errors.NotFound("Sitio no encontrado");
                    //var [a, b, c] = await Promise.all([sql1.query(queryStr), sql2.query(queryStr), sql3.query(queryStr)]);
                    resolve(data);
                    

                } catch (error) {
                    reject( new Errors.SQLError("Error de Base de datos: " + error.message));
                } 
            });
        }
    }

    return FondoModel;
}
