"use strict";

var reqBatchHandler = require("../utils/requestBatchHandler");
var AWSUtils = require("../utils/awsConfig.js")("archivorln");
var awsUtils = new AWSUtils();

module.exports = function (app, pool) {
    const ResHandler = require("../utils/responseHandler.js").ResHandler();
    const resHandler = new ResHandler();
    const MainController  = require("../controller/customController.js")(pool, 'creadores');
    const controller      = new MainController();
    const PController  = require("../controller/customController.js")(pool, 'piezas');
    const pController      = new PController();

    app.get("/mapa", async (req, res) => 
    {
        var data = {};
        var resFormat = {};
        try 
        {
            data['creadores'] = await controller.getAll();
            data['piezas'] = await pController.getAll();
            data = await reqBatchHandler.AttachDependencies(data, 'creadores', pool);

            resFormat = resHandler.setResponse(200, null, data);
            resHandler.handleResponse(req, res, resFormat, 'creadores', "mapa");

        } catch (error)
        {
            resFormat = resHandler.setResponse(error.errno, error);
            resHandler.handleResponse(req, res, resFormat, "utils", "error");
        }
    })

    app.get("/buscar", async (req, res) =>
    {
        var data = {};
        data['piezas'] = [];
        data['lugares'] = [];
        data['creadores'] = [];
        data['hechos'] = [];
        data = await reqBatchHandler.AttachCustom(data, ['id', 'titulo', 'imagen_path', 'fecha', 'fk_creador', 'fk_hecho', 'tematicas', 'tecnicas', 'descriptores'], "", pool, "piezas", "piezas")
        //console.log(data['piezas']);
        data = await reqBatchHandler.AttachCustom(data, ['id', 'nombre', 'localidad', 'departamento'], "", pool, "lugares", "lugares")
        data = await reqBatchHandler.AttachCustom(data, ['id', 'nombre', 'fk_lugar', 'imagen_path'], "", pool, "creadores", "creadores")
        data = await reqBatchHandler.AttachCustom(data, ['id', 'modalidad'], "", pool, "hechos", "hechos")
        //res.render("search.ejs", {data});
        res.render("buscar", {data, descriptor: ""})
    })

    app.post("/buscar", async (req, res) =>
    {
        ////////////////////
        var data = {};
        data['piezas'] = [];
        data['lugares'] = [];
        data['creadores'] = [];
        data['hechos'] = [];
        data = await reqBatchHandler.AttachCustom(data, ['id', 'titulo', 'imagen_path', 'fecha', 'fk_creador', 'fk_hecho', 'tematicas', 'tecnicas', 'descriptores'], "", pool, "piezas", "piezas")
        //console.log(data['piezas']);
        data = await reqBatchHandler.AttachCustom(data, ['id', 'nombre', 'localidad', 'departamento'], "", pool, "lugares", "lugares")
        data = await reqBatchHandler.AttachCustom(data, ['id', 'nombre', 'fk_lugar', 'imagen_path'], "", pool, "creadores", "creadores")
        data = await reqBatchHandler.AttachCustom(data, ['id', 'modalidad'], "", pool, "hechos", "hechos")
        //res.render("search.ejs", {data});

        res.render("buscar", {data, descriptor: req.body.descriptor});
        //res.send("");
    })

    app.post("/gets3presignedurl", async (req, res) => {
        
        try {
            if (process.env.STAGE == "development") {
                var resFormat = resHandler.setResponse(200, null, await (awsUtils.getUrl(req.body.data)));
                resHandler.handleJsonResponse(res, resFormat);
            } else if (process.env.STAGE == "testing"
                && (req.get('origin') == "http://devremendarlonuevo.com"
                    || req.get('origin') == "devremendarlonuevo.com"
                    || req.get('origin') == "https://devremendarlonuevo.com")
            ) {
                var resFormat = resHandler.setResponse(200, null, await (awsUtils.getUrl(req.body.data)));
                console.log(resFormat)
                resHandler.handleJsonResponse(res, resFormat);
            } else {
                var resFormat = resHandler.setResponse(400, "Define stage", {});
                resHandler.handleJsonResponse(res, resFormat);
            }

        } catch (error) {
            console.log(error);
            resFormat = resHandler.setResponse(error.errno, error);
            resHandler.handleResponse(req, res, resFormat, "utils", "error");
        }
    });

    app.get("/gets3presignedurl", async (req, res) => {
        
        try {
            if (process.env.STAGE == "development") {
                var resFormat = resHandler.setResponse(200, null, await (awsUtils.getUrl(req.body.data)));
                resHandler.handleJsonResponse(res, resFormat);
            } else if (process.env.STAGE == "testing"
                && (req.get('origin') == "http://devremendarlonuevo.com"
                    || req.get('origin') == "devremendarlonuevo.com"
                    || req.get('origin') == "https://devremendarlonuevo.com")
            ) {
                var resFormat = resHandler.setResponse(200, null, await (awsUtils.getUrl(req.body.data)));
                console.log(resFormat)
                resHandler.handleJsonResponse(res, resFormat);
            } else {
                var resFormat = resHandler.setResponse(400, "Define stage", {});
                resHandler.handleJsonResponse(res, resFormat);
            }

        } catch (error) {
            console.log(error);
            resFormat = resHandler.setResponse(error.errno, error);
            resHandler.handleResponse(req, res, resFormat, "utils", "error");
        }
    });

}
