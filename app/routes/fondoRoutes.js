"use strict";

var express = require("express"),
    router  = express.Router();

module.exports = (pool) => 
{
    const FondoController = require("../controller/fondoController.js")(pool);
    const controller      = new FondoController();
    const ResHandler      = require("../utils/responseHandler.js").ResHandler();
    const resHandler      = new ResHandler();

    router.get("/", async (req, res) => 
    {
        var resFormat = {};
        try 
        {
            resFormat = resHandler.setResponse(200, null, await controller.getAll());
            resHandler.handleResponse(req, res, resFormat, "fondos/showall");

        } catch (error)
        {
            resFormat = resHandler.setResponse(error.errno, error);
            resHandler.handleResponse(req, res, resFormat);
        }
        
    });

    router.get("/:id", async (req, res) => 
    {
        
        var resFormat = {};
        try 
        {
            resFormat = resHandler.setResponse(200, null, await controller.getById(req.params.id));
            //resFormat = resHandler.setResponse(200, null, "");
            resHandler.handleResponse(req, res, resFormat, "fondos/show");

        } catch (error)
        {
            resFormat = resHandler.setResponse(error.errno, error);
            resHandler.handleResponse(res, resFormat);
        }
        
    });

    return router;
}
