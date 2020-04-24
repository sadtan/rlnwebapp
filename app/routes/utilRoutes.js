"use strict";

var reqBatchHandler = require("../utils/requestBatchHandler");
var AWSUtils = require("../utils/awsConfig.js")("archivorln");
var awsUtils = new AWSUtils();

module.exports = function (app, pool) {
    const ResHandler = require("../utils/responseHandler.js").ResHandler();
    const resHandler = new ResHandler();

    app.get("/buscar", async (req, res) =>
    {
        var data = {};
        data['piezas'] = [];
        data['lugares'] = [];
        data['creadores'] = [];
        data['hechos'] = [];
        data = await reqBatchHandler.AttachCustom(data, ['id', 'titulo', 'imagen_path', 'fecha', 'fk_creador', 'fk_hecho', 'tematicas', 'tecnicas'], "", pool, "piezas", "piezas")
        //console.log(data['piezas']);
        data = await reqBatchHandler.AttachCustom(data, ['id', 'nombre'], "", pool, "lugares", "lugares")
        data = await reqBatchHandler.AttachCustom(data, ['id', 'nombre', 'fk_lugar'], "", pool, "creadores", "creadores")
        data = await reqBatchHandler.AttachCustom(data, ['id', 'modalidad'], "", pool, "hechos", "hechos")
        res.render("search.ejs", {data});
    });

    app.post("/buscar", async (req, res) =>
    {
        var data = {};
        data['piezas'] = [];
        console.log(data);
        res.send(data);
    });

    // Get AWS Pesigned url by S3 key
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
