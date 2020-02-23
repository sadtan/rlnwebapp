"use strict"
var bodyParser = require("body-parser"),
    express    = require("express"),
    app        = express();

const dotenv = require("dotenv");
dotenv.config();

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

// Using Folders
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

// Configure Routes
var Pool = require("./dbpool.js");
var FondoRoutes = require("./app/routes/fondoRoutes.js")(Pool);
var IndexRoutes = require("./app/routes/indexRoutes.js");

app.use("/fondos", FondoRoutes);
app.use("/", IndexRoutes);

var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server up an running on port: " + port)
});