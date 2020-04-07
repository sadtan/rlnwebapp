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

    /////////////////////////
    // Add New
    app.post("/admin/" + m_table + "/new", MiddleWare, async (req, res) => 
    {
        var data = {};
        var resFormat = {};
        
        try 
        {
            var sqlres = await controller.addNew(req.body.obj);
            resFormat = resHandler.setResponse(200, null, sqlres);
            //resHandler.handleResponse(req, res, resFormat, "admin/" + m_table, "index");
            res.redirect("/admin/" + m_table);

        } catch (error)
        {
            console.log(error);
            res.redirect("/admin/" + m_table);
        }
    });

    app.delete("/admin/" + m_table + "/delete/:id", MiddleWare, async (req, res) => 
    {
        try 
        {
            var sqlres = await controller.deleteOne(req.params.id);
            resFormat = resHandler.setResponse(200, null, sqlres);
            //resHandler.handleResponse(req, res, resFormat, "admin/" + m_table, "index");
            res.redirect("/admin/" + m_table);

        } catch (error)
        {
            res.redirect("/admin/" + m_table);
        }
    }) 

    app.get("/admin/" + m_table + "/edit/:id", MiddleWare, async (req, res) => 
    {
        var data = {};
        var resFormat = {};
        try 
        {
            data[m_table] = await controller.getByFk(req.params.id);
            //data = await reqBatchHandler.AttachDependencies(data, m_table, pool);

            resFormat = resHandler.setResponse(200, null, data);

            res.render("admin/" + m_table + "/edit", {data});
            //resHandler.handleResponse(req, res, resFormat, "admin/" + m_table, "index");

        } catch (error)
        {
            resFormat = resHandler.setResponse(error.errno, error);
            resHandler.handleResponse(req, res, resFormat, "utils", "error");
        }

        
    });

    app.put("/admin/" + m_table + "/edit/:id", MiddleWare, async (req, res) => 
    {
        //res.redirect("/admin/"+m_table);
        var resFormat = {};
        try 
        {
            var sqlres = await controller.editOne(req.body.obj, req.params.id);
            //data = await reqBatchHandler.AttachDependencies(data, m_table, pool);

            resFormat = resHandler.setResponse(200, null, sqlres);
            res.redirect("/admin/"+m_table);
            //resHandler.handleResponse(req, res, resFormat, "admin/" + m_table, "index");

        } catch (error)
        {
            resFormat = resHandler.setResponse(error.errno, error);
            resHandler.handleResponse(req, res, resFormat, "utils", "error");
        }

    });
    
    //app.use(router);
    //return router;
}
