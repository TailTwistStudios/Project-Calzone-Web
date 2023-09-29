const express = require("express");
const app = express();
const config = require("./config.json")

//Client helping libraries
const worldmap = require("./lib/worldmap")
const calzoneSession = require("./lib/gameSession")
const users = require("./lib/users");


//Web helping libraries
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const userModel = require("./lib/mongooseModels/userModel");
const middleware = require("./lib/middleware");

//Server setup
let handlebars = require("express-handlebars").create({
    defaultLayout: "main",
    //helpers: {}
});
const handlebarsHelpers = require("./lib/handlebarsHelpers") // general library for helpers we need
handlebarsHelpers.init(handlebars);

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 3000);


//midleware setup
app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}));

app.use(bodyParser.urlencoded({extended : false}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(userModel.createStrategy());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());
 

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
});
app.post("/login", passport.authenticate('local', { failureRedirect: "/"}), function(req,res) {
    res.render("settings", {
        user: req.session.passport.user
    });
})
app.get("/logout", middleware.loginRequired, middleware.processLogout);
app.get("/register", middleware.allowRegistration, (req,res) => {
    res.render("registration");
});

app.get("/settings", middleware.loginRequired, (req,res) => {
    res.render("settings");  
});

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

