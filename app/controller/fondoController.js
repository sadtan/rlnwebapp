"use strict";
var AWSUtils = require("../utils/awsConfig.js")("archivorln");

module.exports = (pool) => 
{
    
    var FondoModel = require("../model/fondoModel")(pool);
    var fondoModel = new FondoModel();

    class FondoController
    {
        async getAll()
        {
            return new Promise(async (resolve, reject) => 
            {
                try {
                    var fondos = await fondoModel.getAllFondos();
                    resolve (fondos);

                } catch (error) 
                {
                    reject( error );
                };
            });   
        }

        async getById(id)
        {
            return new Promise(async (resolve, reject) => 
            {
                try {
                    var fondo = await fondoModel.getById(id);
                    resolve (fondo);

                } catch (error) 
                {
                    console.log(error)
                    reject( error );
                };
            });   
        }
    }
    return FondoController;
}

