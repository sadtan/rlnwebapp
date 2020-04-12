"use strict";

var reqBatchHandler = require("../utils/requestBatchHandler");
var AWSUtils = require("../utils/awsConfig.js")("archivorln");
var awsUtils = new AWSUtils();

module.exports = function (app) 
{
    const ResHandler      = require("../utils/responseHandler.js").ResHandler();
    const resHandler      = new ResHandler();

    // Login Get
    app.post("/gets3presignedurl", async (req, res) =>
    {
        try 
        {
            if (process.env.STAGE == "development")
            {
                var resFormat = resHandler.setResponse(200, null, await(awsUtils.getUrl(req.body.data)));
                resHandler.handleJsonResponse(res, resFormat);
            } else if (process.env.STAGE == "testing" && req.get('origin') == "http://devremendarlonuevo.com")
            {
                var resFormat = resHandler.setResponse(200, null, await(awsUtils.getUrl(req.body.data)));
                resHandler.handleJsonResponse(res, resFormat);
            } else 
            {
                var resFormat = resHandler.setResponse(400, "Define stage", {});
                resHandler.handleJsonResponse(res, resFormat);
            }

        } catch (error)
        {
            console.log(error);
            resFormat = resHandler.setResponse(error.errno, error);
            resHandler.handleResponse(req, res, resFormat, "utils", "error");
        }
    });

}
