"use strict";

var reqBatchHandler = require("../utils/requestBatchHandler");
var AWSUtils = require("../utils/awsConfig.js")("archivorln");
var awsUtils = new AWSUtils();

module.exports = function (app, pool, m_table) 
{
    const MainController  = require("../controller/customController.js")(pool, m_table);
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
            resHandler.handleResponse(req, res, resFormat, m_table, "showAll");

        } catch (error)
        {
            resFormat = resHandler.setResponse(error.errno, error);
            resHandler.handleResponse(req, res, resFormat, "utils", "error");
        }
        
    });

    //Get By Id
    app.get("/" + m_table + "/:id(\\d+)/", async (req, res) => 
    {
        var data = {};
        var resFormat = {};
        awsUtils.listFiles();
        try 
        {
            data[m_table] = await controller.getById(req.params.id);
            data = await reqBatchHandler.AttachDependencies(data, m_table, pool);
            if (m_table == "creadores")
            {
                data = await reqBatchHandler.AttachCustom(data, ['id', 'titulo', 'imagen_path', 'fecha'], "fk_creador", pool, "piezas", "creadores")
            }
            if (m_table == "piezas")
            {
                data = await awsUtils.AttachGallery(data, "piezas");
                
            }
                
                //awsUtils.listFiles();

            resFormat = resHandler.setResponse(200, null, data);
            resHandler.handleResponse(req, res, resFormat, m_table, "show");

        } catch (error)
        {
            console.log(error);
            resFormat = resHandler.setResponse(error.errno, error);
            resHandler.handleResponse(req, res, resFormat, "utils", "error");
        }
        
    });

    // Search
    app.post("/" + m_table + "/search", async (req, res) => 
    {
        var data = {};
        var resFormat = {};

        var params = req.body;
        try 
        {
            data[m_table] = await controller.getSearch(params);

            // Uncomment to replace s3 keys for presignurl's
            //data[m_table] = await(awsUtils.ReplaceS3PathArr(data[m_table]));

            resFormat = resHandler.setResponse(200, null, data);
            resHandler.handleResponse(req, res, resFormat, "general/show");

        } catch (error)
        {
            resFormat = resHandler.setResponse(error.errno, error);
            resHandler.handleResponse(req, res, resFormat, "utils", "error");
        }
        
    });

    //app.use(router);
    //return router;
}
