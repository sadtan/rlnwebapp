"use strict";

const ResHandler      = require("../utils/responseHandler.js").ResHandler();
const resHandler      = new ResHandler();
const Errors          = require('../utils/errors.js');

var express = require("express"),
    router = express.Router();

router.get("/", (req, res) => {
    //var resFormat = resHandler.setResponse()
    res.render("index");
});

router.get("/aws-health", (req, res) => {
    res.status(200).send('OK')
});

router.get("*", (req, res) => {
    var resFormat = resHandler.setResponse(404, new Errors.NotFound('Sitio No Encontrado'));
    resHandler.handleJsonResponse(res, resFormat);
});

module.exports = router;
