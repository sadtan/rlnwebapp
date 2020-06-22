"use strict";

module.exports = function (app, passport) 
{
    const ResHandler      = require("../utils/responseHandler.js").ResHandler();
    const resHandler      = new ResHandler();

    // Login Get
    app.get("/admin-login", (req, res) =>
    {
        req.logout();
        var resFormat = resHandler.setResponse(404, {});
        resHandler.handleResponse(req, res, resFormat, "admin", "login");
    });

    // Login Post
    app.post("/admin-login", passport.authenticate("local-login", 
    {
        successRedirect: "/admin/creadores",
        failureRedirect: "/admin-login",
    }),
    function (req, res) {
        //console.log(">> Admin Logged Successfuly");
        if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
        } else {
            req.session.cookie.expires = false;
        }
        res.redirect("/admin/creadores");
        //res.send();
    });

    // Admin Logout
    app.get("/admin-logout", (req, res) => 
    {
        req.logout();
        res.redirect("/");
    })

}
