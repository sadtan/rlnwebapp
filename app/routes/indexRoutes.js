"use strict"

const ResHandler = require("../utils/responseHandler.js").ResHandler();
const resHandler = new ResHandler();
const Errors     = require('../utils/errors.js');

module.exports = (app) =>
{
    
    
    // app.post("/admin-login", (req, res) => 
    // {
    //     if (req.body.pass == process.env.ADMIN_PASS)
    //     {
    //         app.locals.admin.isLogged = true;
    //         res.redirect("/admin/creadores");
    //     }
    //     else
    //     {
    //         res.redirect("/admin-login");
    //     }
        
    //     console.log(req.body);
    // });

    // app.get("/admin-logut", (req, res) => 
    // {
    //     app.locals.admin.isLogged = false;
    //     res.redirect("/admin-login");
    // })

    app.get("/mapa", (req, res) => 
    {
        res.render("mapa");
    });
    
    app.get("/acerca-de", (req, res) => 
    {
        res.render("about");
    });

    app.get("/", (req, res) => 
    {
        res.redirect("/creadores");
    });
    
    
    app.get("/aws-health", (_, res) => 
    {
        res.status(200).send('OK')
    });
    
    app.get("*", (req, res) => 
    {
        var resFormat = resHandler.setResponse(404, new Errors.NotFound('Sitio No Encontrado'));
        resHandler.handleResponse(req, res, resFormat, "utils", "error");
    });
}

// "use strict";

// const ResHandler = require("../utils/responseHandler.js").ResHandler();
// const resHandler = new ResHandler();
// const Errors     = require('../utils/errors.js');

// var express = require("express"),
//     router = express.Router();

// router.get("/", (req, res) => {
//     //var resFormat = resHandler.setResponse()
//     res.redirect("/fondos");
// });

// router.get("/aws-health", (req, res) => {
//     res.status(200).send('OK')
// });

// router.get("*", (req, res) => {
//     var resFormat = resHandler.setResponse(404, new Errors.NotFound('Sitio No Encontrado'));
//     resHandler.handleResponse(req, res, resFormat, "utils", "error");
// });

// module.exports = router;
