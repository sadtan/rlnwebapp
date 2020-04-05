"use strict";

var reqBatchHandler = require("../utils/requestBatchHandler");

module.exports = function (app, pool, m_table) 
{
    const MainController  = require("../controller/customController.js")(pool, m_table);
    const controller      = new MainController();
    const ResHandler      = require("../utils/responseHandler.js").ResHandler();
    const resHandler      = new ResHandler();

    var MiddleWare = (req, res, next) => {
        if (app.locals.admin.isLogged) 
            next();
        else 
            res.redirect("/admin-login");
    }

    // Get All Custom
    app.get("/admin/" + m_table, MiddleWare, async (req, res) => 
    {
        var data = {};
        var resFormat = {};
        try 
        {
            data[m_table] = await controller.getAll();
            data = await reqBatchHandler.AttachDependencies(data, m_table, pool);

            resFormat = resHandler.setResponse(200, null, data);
            resHandler.handleResponse(req, res, resFormat, "admin/" + m_table, "index");

        } catch (error)
        {
            resFormat = resHandler.setResponse(error.errno, error);
            resHandler.handleResponse(req, res, resFormat, "utils", "error");
        }
        
    });

    
    //app.use(router);
    //return router;
}
