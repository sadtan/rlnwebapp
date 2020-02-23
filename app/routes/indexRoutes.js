"use strict";

const ResHandler      = require("../utils/responseHandler.js").ResHandler();
const resHandler      = new ResHandler();
const Errors          = require('../utils/errors.js');

var express = require("express"),
    router = express.Router();

router.get("/", (req, res) => {
    res.render("index");
    //console.log(req.subdomains);
});

router.get("/aws-health", (req, res) => {
    res.status(200).send('OK')
});

router.get("*", (req, res) => {
    var status = 404;
    var resFormat = resHandler.setResponse(status, new Errors.NotFound('Sitio No Encontrado'));
    resHandler.handleJsonResponse(res, resFormat);
});

module.exports = router;

// res.sendStatus(200)
// // === res.status(200).send('OK')

// res.sendStatus(403)
// // === res.status(403).send('Forbidden')

// res.sendStatus(404)
// // === res.status(404).send('Not Found')

// res.sendStatus(500)
// // === res.status(500).send('Internal Server Error')