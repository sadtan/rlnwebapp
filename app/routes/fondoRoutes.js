"use strict";

var express = require("express"),
    router  = express.Router();

module.exports = (pool) => {
    const FondoController = require("../controller/fondoController.js")(pool);
    const controller = new FondoController();

    router.get("/", (req, res) => controller.getAllFondos(req, res));

    return router;
}
