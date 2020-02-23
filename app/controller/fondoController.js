"use strict";
var AWSUtils = require("../utils/awsConfig.js")("archivorln");

module.exports = (pool) => 
{
    
    var FondoModel = require("../model/fondoModel")(pool);
    var fondoModel = new FondoModel();
    var awsUtils = new AWSUtils();

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
            //console.log(await awsUtils.getUrl("f0a38b6eb7b8caf9383eeb1c58e95017.jpg"));
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

