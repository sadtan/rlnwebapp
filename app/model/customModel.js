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
                    
                    if (table == "creadores")
                    {
                        var queryStr = "SELECT creadores.*, localidad, pais, departamento FROM " + table  +" INNER JOIN lugares ON (creadores.fk_lugar = lugares.id) WHERE creadores.id = ? ";
                    }
                    var data = await sql.query(queryStr, id);
                    
                    if (!data[0]) throw new Errors.NotFound("Sitio no encontrado");
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
                    resolve(data);
                    

                } catch (error) {
                    reject( new Errors.SQLError("Error de Base de datos: " + error.message));
                } 
            });

        };


        // Create
        async addNew(obj)
        {
            return new Promise(async (resolve, reject) => {
                try {
                    var names = "";
                    var values = "";
                    for (var attr in obj)
                    {
                        names += attr + ",";
                        if (obj[attr] == "" || obj[attr] == " ")
                            obj[attr] = "_"

                        obj[attr]  = obj[attr].replace(/"/g, '\\"')
                        values +=  '"' + obj[attr] + '",'
                    }
                    names = names.substring(0, names.length - 1);
                    values = values.substring(0, values.length - 1);

                    var queryStr = "INSERT INTO " + table + "(" + names + ")" + " VALUES (" + values + " ) ";
                    var data = await sql.querySearch(queryStr);
                    resolve(data);                    

                } catch (error) {
                    reject( new Errors.SQLError("Error de Base de datos: " + error.message));
                } 
            });
        }

        async deleteOne(id)
        {
            return new Promise(async (resolve, reject) => {
                try {
                    var queryStr = "DELETE FROM " + table  +" WHERE id = " + id;
                    var data = await sql.querySearch(queryStr);

                    resolve(data);                    

                } catch (error) {
                    reject( new Errors.SQLError("Error de Base de datos: " + error.message));
                } 
            });

        };

        async editOne(obj, id)
        {
            return new Promise(async (resolve, reject) => {
                try {

                    var edit = "";
                    for (var attr in obj)
                    {
                        edit += attr + "=";

                        if (obj[attr] == "" || obj[attr] == " ")
                            obj[attr] = "_"

                        obj[attr]  = obj[attr].replace(/"/g, '\\"')
                        edit +=  '"' + obj[attr] + '",'
                    }
                    
                    edit = edit.substring(0, edit.length - 1);

                    var queryStr = "UPDATE " + table + " SET " + edit + " WHERE id = " + id;
                    
                    //console.log(queryStr);
                    var data = await sql.querySearch(queryStr);
                    resolve(data);                    

                } catch (error) {
                    console.log(error);
                    reject( new Errors.SQLError("Error de Base de datos: " + error.message));
                } 
            });
        }

        async getCustom(fields, fk_field, fk_n, id = -1)
        {
            return new Promise(async (resolve, reject) => 
            {
                try 
                {
                    var m_fields = "";
                    for (var field in fields)
                    {
                        m_fields += fields[field] + ','
                    }

                    m_fields = m_fields.substring(0, m_fields.length - 1);

                    //var queryStr = "SELECT " + m_fields +" FROM " + table + " WHERE " + fk_field + " = " + fk_n;
                    var queryStr = "SELECT " + m_fields +" FROM " + table;
                    if (fk_n)
                        queryStr += " WHERE " + fk_field + " = " + fk_n;

                    var data = await sql.query(queryStr, fields);

                    resolve(data);
                }
                catch (error)
                {
                    reject( new Errors.SQLError("Error de Base de datos: " + error.message));
                }
            })
        }

        async select()
        {
            return new Promise(async (resolve, reject) => {
                try {
                    var queryStr = "SELECT 1";
                    var data = await sql.querySearch(queryStr);
                    resolve(data);
                    

                } catch (error) {
                    reject( new Errors.SQLError("Error de Base de datos: " + error.message));
                } 
            });

        };
    }

    return Model;
}