"use strict";


var reqBatchHandler = require("../utils/requestBatchHandler");

module.exports = function (app, pool, m_table, m_alias) 
{
    const MainController  = require("../controller/customController.js")(pool, m_table, m_alias);
    const controller      = new MainController();
    const ResHandler      = require("../utils/responseHandler.js").ResHandler();
    const resHandler      = new ResHandler();

    // Get All
    app.get("/" + m_table, async (req, res) => 
    {
        var data = {};
        var resFormat = {};
        try 
        {
            data[m_table] = await controller.getAll();
            data = await reqBatchHandler.AttachDependencies(data, m_table, pool);


            resFormat = resHandler.setResponse(200, null, data);
            resHandler.handleResponse(req, res, resFormat, "general/showAllCards");

        } catch (error)
        {
            resFormat = resHandler.setResponse(error.errno, error);
            resHandler.handleResponse(req, res, resFormat, "error");
        }
        
    });

    //Get By Id
    app.get("/" + m_table + "/:id(\\d+)/", async (req, res) => 
    {
        var data = {};
        var resFormat = {};
        
        try 
        {
            data[m_table] = await controller.getById(req.params.id);
            data = await reqBatchHandler.AttachDependencies(data, m_table, pool);

            resFormat = resHandler.setResponse(200, null, data);
            resHandler.handleResponse(req, res, resFormat, "general/show");

        } catch (error)
        {
            resFormat = resHandler.setResponse(error.errno, error);
            resHandler.handleResponse(req, res, resFormat, "error");
        }
        
    });

    // Search
    app.post("/" + m_table + "/search", async (req, res) => 
    {
        var data = {};
        var resFormat = {};

        var params = req.body;
        console.log(params);
        
        try 
        {
            data[m_table] = await controller.getSearch(params);
            //data = await reqBatchHandler.AttachDependencies(data, m_table, pool);

            resFormat = resHandler.setResponse(200, null, data);
            resHandler.handleResponse(req, res, resFormat, "general/show");

        } catch (error)
        {
            resFormat = resHandler.setResponse(error.errno, error);
            resHandler.handleResponse(req, res, resFormat, "error");
        }
        
    });

    //app.use(router);
    //return router;
}
