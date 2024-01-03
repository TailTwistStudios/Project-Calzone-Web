const express = require("express");
const app = express();
const config = require("./config.json")

//Client helping libraries


//Web helping libraries
const bodyParser = require("body-parser");
const session = require("express-session");
//const passport = require("passport");
const middleware = require("./lib/middleware");
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

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//app.use(passport.initialize());
//app.use(passport.session());

const users = require("./lib/users");

//passport.use(userModel.createStrategy());
//passport.serializeUser(userModel.serializeUser());
//passport.deserializeUser(userModel.deserializeUser());


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
app.post("/logout", middleware.loginRequired, middleware.processLogout);
app.post("/register", middleware.allowRegistration, (req,res) => {
    res.render("registration");
});

app.get("/settings", middleware.loginRequired, (req,res) => {
    res.render("settings");  
});



// Game Sessions
const gameSessionRouter = require('./routes/gameSessionRouter');
app.use("/",gameSessionRouter.router);


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

