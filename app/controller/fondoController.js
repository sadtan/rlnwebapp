"use strict";

var AWSUtils = import("../utils/awsConfig.js");
//var awsUils = new AWSUtils(); 

module.exports = (pool) => {
    var FondoModel = require("../model/fondoModel")(pool);
    var fondo = new FondoModel();
    class FondoController
    {
        async getAllFondos(req, res)
        {
            try {
                var fondos = await fondo.getAllFondos();
                res.render("fondos/show.ejs", {fondos});
                AWSUtils.listBuckets();
            } catch (error) {
                console.log(error)
                res.send(error);
            };
        }
    }
    return FondoController;
}

