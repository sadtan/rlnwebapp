"use strict";
//AIzaSyBDmj2_soI98pY3h4F5KpkVai7GjoDe0uQ
var lookupAlias = {
    'lugar': 'lugares',
    'coleccion': 'colecciones',
    'fondo': 'fondos',
    'pieza': 'piezas',
}

module.exports.AttachDependencies = async (data, m_table, pool) => 
{
    return new Promise( async (response, reject) => 
    {   
        try 
        {
        for (let i = 0; i < data[m_table].length; i++) 
        for (let field in data[m_table][i])
            if (field.substring(0, 2) == "fk")
            {
                var fk = data[m_table][i][field];
                if (fk)
                {
                    var alias = field.substring(3, field.length);
                    var table = lookupAlias[alias];
                    if (data[m_table][i]['dep'] == undefined)
                        data[m_table][i]['dep'] = {}
                    var CustomController = CreateCustomController(
                        pool, 
                        table, 
                        alias
                    );
                    var customController = new CustomController();
    
                    data[m_table][i]['dep'][alias] = await customController.getById(fk);
                }
            }

        data['main'] = m_table;

        response(data);

        } catch (error) {
            reject(error);
        }
    })
}



module.exports.AttachCustom = async (data, fields, fk_field, pool, fk_table, table) =>
{
    var CustomModel = CreateCustomModel(pool, fk_table);
    var customModel = new CustomModel();

    return new Promise(async (resolve, reject) => 
    {
        try
        {
            data[table][0][fk_table]= await customModel.getCustom(fields, fk_field, 1)
            resolve(data);
        }
        catch (error)
        {
            console.log(error)
            reject(error);
        }
    })
    
}

function CreateCustomController(pool, table, alias)
{
    return require("../controller/customController.js")(pool, table, alias);
}

function CreateCustomModel(pool, table)
{
    return require("../model/customModel")(pool, table);
}