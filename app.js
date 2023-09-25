const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const connectEnsureLogin = require("connect-ensure-login");


const config = require("./config.json")
const worldmap = require("./lib/worldmap")
const calzoneSession = require("./lib/session")
const users = require("./lib/users");



let handlebars = require("express-handlebars").create({
    defaultLayout: "main",
    //helpers: {}
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 3000);


//TODO: initialize midleware
///app.use(session({}))


 
 

//homepage
app.get("/", function(req,res) {
    res.render("home", {
        sitename: config.siteName,
        usercount: users.getUserCount()
    });
});

app.get("/login", function(req,res) {
    res.render("login", {
        siteDomain: config.siteDomain
    });
})

app.get("/worldmap", function(req,res) {
    //res.json(worldmap.getInstanceWorldmap())
    res.send(worldmap.getInstanceWorldmap());
});



app.get("/sessions", function(req,res) {
    res.send(session.getSessions());
});

//404
app.use(function (req, res) {
    res.status(404);
    res.render("404");
});

//500
app.use(function(err,req,res,next) {
    console.error(err.stack);
    res.status(500);
    res.render("500");
});

app.set("port",config.port);
app.listen(app.get("port"), function() {
    console.log("Started running on port " + app.get("port"));
})

