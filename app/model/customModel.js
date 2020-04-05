var DB = require("../model/db.js");
const Errors  = require('../utils/errors.js');

module.exports = (pool, table) => 
{
    var sql = new DB(pool);
    class Model 
    {
        async getAll()
        {
            return new Promise(async (resolve, reject) => {
                try {
                    var queryStr = "SELECT * FROM " + table;
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
                    var queryStr = "SELECT * FROM " + table  +" WHERE id = ?";
                    var data = await sql.query(queryStr, id);

                    if (!data[0]) throw new Errors.NotFound("Sitio no encontrado");
                    //var [a, b, c] = await Promise.all([sql1.query(queryStr), sql2.query(queryStr), sql3.query(queryStr)]);
                    resolve(data);
                    

                } catch (error) {
                    reject( new Errors.SQLError("Error de Base de datos: " + error.message));
                } 
            });
        };

        async getByFk(fk)
        {
            return new Promise(async (resolve, reject) => {
                try {
                    var queryStr = "SELECT * FROM " + table  +" WHERE " + " id = " + fk;
                    var data = await sql.query(queryStr);

                    if (!data[0]) throw new Errors.NotFound("Sitio no encontrado");
                    //var [a, b, c] = await Promise.all([sql1.query(queryStr), sql2.query(queryStr), sql3.query(queryStr)]);
                    resolve(data);
                    

                } catch (error) {
                    reject( new Errors.SQLError("Error de Base de datos: " + error.message));
                } 
            });
        };

        async search(fk)
        {
            return new Promise(async (resolve, reject) => {
                try {
                    var queryStr = "SELECT * FROM " + table  +" WHERE id = " + fk;
                    var data = await sql.querySearch(queryStr);

                    if (!data[0]) throw new Errors.NotFound("Sitio no encontrado");
                    //var [a, b, c] = await Promise.all([sql1.query(queryStr), sql2.query(queryStr), sql3.query(queryStr)]);
                    resolve(data);
                    

                } catch (error) {
                    reject( new Errors.SQLError("Error de Base de datos: " + error.message));
                } 
            });
        };
    }

    return Model;
}
