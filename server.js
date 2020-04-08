"use strict"
const express = require("express"),
      bodyParser = require("body-parser"),
      dotenv = require("dotenv"),
      methodOverride = require('method-override');

class App 
{
    constructor()
    {
        this.app = express();

         /**
          * App configuration literals
          */
        this.configs = 
        {
            get port() {
                return process.env.port || 8081
            }
        }
    }

    applyMiddleware()
    {
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        this.app.use(bodyParser.json());
        this.app.set("view engine", "ejs");
        /**
         * Public Dir
         */
        this.app.use(express.static(__dirname + "/public"));
        this.app.use(express.static(__dirname + "/views"));

        this.app.set('isAdminLogged', false);

        this.app.locals = 
        {
            admin: 
            {
                isLogged: true,
            }
        };

        this.app.use(methodOverride('_method'))

        /**
         *  Properties to be used by the class App
         */ 
        dotenv.config();
        const Pool = require("./dbpool");
        const AdminPool = require("./admindb.js");

        /**
         * Routes configuration
         * @param {express-app}    - Current express Application
         * @param {custom-db-pool} - Current Pool to be uset for all services
         * @param {string}         - Table to be created
         * @param {string}         - Alias (Singular) of the table
         */

        require("./app/routes/customRoutes.js")(this.app, Pool, "creadores");
        require("./app/routes/customRoutes.js")(this.app, Pool, "colecciones");
        require("./app/routes/customRoutes.js")(this.app, Pool, "lugares");
        require("./app/routes/customRoutes.js")(this.app, Pool, "hechos");
        require("./app/routes/customRoutes.js")(this.app, Pool, "piezas");

        //require("./app/routes/adminRoutes.js")(this.app, AdminPool, "creadores");
        require("./app/routes/adminRoutes.js")(this.app, AdminPool, "lugares");
        require("./app/routes/adminRoutes.js")(this.app, AdminPool, "hechos");
        require("./app/routes/adminRoutes.js")(this.app, AdminPool, "creadores");
        

        require("./app/routes/indexRoutes.js" )(this.app);
    }

    run()
    {
        this.app.listen(this.configs.port, () => {
            console.log(">> Express app Up and running on port: " + this.configs.port);
            console.log(`>> Environment: ${process.env.STAGE || "development"}`)
        });
    }
}

// Run the Thing
const app = new App();
app.applyMiddleware();
app.run();

// "use strict"
// var bodyParser = require("body-parser"),
//     express    = require("express"),
//     app        = express();

// const dotenv = require("dotenv");
// dotenv.config();

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
// app.use(bodyParser.json());
// app.set("view engine", "ejs");

// // Using Folders
// app.use(express.static(__dirname + "/public"));
// app.use(express.static(__dirname + "/views"));

// // Configure Routes
// var Pool = require("./dbpool.js");
// require("./app/routes/customRoutes.js")(app, Pool, "fondos", "fondo");
// require("./app/routes/customRoutes.js")(app, Pool, "colecciones", "coleccion");
// require("./app/routes/customRoutes.js")(app, Pool, "lugares", "lugar");
// require("./app/routes/customRoutes.js")(app, Pool, "hechos", "hecho");

// const IndexRoutes = require("./app/routes/indexRoutes.js");
// app.use("/", IndexRoutes);

// var port = process.env.PORT || 3000;

// app.listen(port, () => {
//     console.log("Server up an running on port: " + port)
// });
