"use strict";
var AWSUtils = require("../utils/awsConfig.js")("archivorln");

module.exports = (pool) => 
{
    
    var FondoModel = require("../model/fondoModel")(pool);
    var fondo = new FondoModel();

    class FondoController
    {
        async getAll()
        {
            return new Promise(async (resolve, reject) => 
            {
                try {
                    var fondos = await fondo.getAllFondos();
                    resolve (fondos);

                 } catch (error) 
                {
                    reject( error );
                };
            });
            
        }

    }
    return FondoController;
}

