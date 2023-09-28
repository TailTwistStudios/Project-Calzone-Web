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
    }
}

module.exports = middleware;