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
            resHandler.handleRenderResponse(res, resFormat, "fondos/index");

        } catch (error)
        {
            resFormat = resHandler.setResponse(error.errno, error);
            resHandler.handleJsonResponse(res, resFormat);
        }
        
    });

    return router;
}
