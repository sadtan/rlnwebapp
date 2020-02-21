"use strict";

var express = require("express"),
    router  = express.Router();

const FondoController = require("../controller/fondoController.js");
const controller = new FondoController();

router.get("/", (req, res) => controller.getAllFondos(req, res));

module.exports = router;