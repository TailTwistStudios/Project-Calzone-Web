let express = require("express");
let app = express();


let worldmap = require("./lib/worldmap")



let handlebars = require("express-handlebars").create({
    defaultLayout: "main",
    //helpers: {}
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 3000);





//homepage
app.get("/", function(req,res) {
    res.render("home");
});

app.get("/worldmap", function(req,res) {
    //res.json(worldmap.getInstanceWorldmap())
    res.send(worldmap.getInstanceWorldmap())
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

app.listen(app.get("port"), function() {
    console.log("Started running on port " + app.get("port"));
})

