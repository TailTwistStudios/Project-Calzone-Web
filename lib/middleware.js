const config = require("../config.json");

const middleware = {
    loginRequired: function(req,res,next) {
        if (req.session.user) {
            next();
        } else {
            res.redirect('/');
        }
    },

    processLogout: (req,res) => {
        if (req.session && req.session.user) {
            delete req.session.user;
        }

        res.redirect("/");
    },

    allowRegistration: (req,res, next) => {
        if (config.allowRegistration) {
            next();
        }
        else 
        {
            res.redirect("/");
        }
    }
}

module.exports = middleware;